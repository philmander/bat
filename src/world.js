// Copyright 2019 Harver B.V.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { World } from '@cucumber/cucumber'
import chalk from 'chalk'
import request from 'superagent'

const fileUrl = new URL('../package.json', import.meta.url)
const packageJson = JSON.parse(readFileSync(fileUrl, 'utf8'))
const { version } = packageJson

const agents = new Map();
const responseCache = new Map();
const fileCache = new Map()
const getResponseCacheKey = (path, method) => `${path};${method}`;

/** @module World */

/**
 * State and stateful utilities can be shared between steps using an instance of "World"
 */
export class BatWorld extends World {
    constructor(opts) {
        super(opts)
        this._req = null
        this._currentAgent = this.newAgent()
        this.defaultContentType = 'application/json'

        // Provide a base url for all relative paths.
        // Using a variable: `{base}/foo` is preferred though
        this._baseUrl = process.env.BASE_URL || ''
        this._baseGraphQLUrl = process.env.GRAPHQL_BASE_URL || ''
        this._latencyBuffer = process.env.LATENCY_BUFFER ? parseInt(process.env.LATENCY_BUFFER, 10) : 0
        if (isNaN(this._latencyBuffer)) {
            throw new Error(`process.env.LATENCY_BUFFER is not an integer (${process.env.LATENCY_BUFFER})`)
        }

        const envFile = process.env.ENV_FILE || null
        this.envVars = envFile ? JSON.parse(readFileSync(resolve(envFile))).values : []
        this.env = process.env.TEST_ENV || null
        this.responseVars = []
        this.userVars = []
    }

    /**
     * Getter for the `baseUrl` used for all requests
     */
    get baseUrl() {
        return this._baseUrl
    }

    /**
     * Getter for the `baseGraphQLUrl` used for all requests
     */
    get baseGraphQLUrl() {
        return this._baseGraphQLUrl
    }

    /**
     * Getter for the currently active Superagent request object
     */
    get req() {
        return this._req
    }

    /**
     * Setter for the active request
     */
    set req(val) {
        // TODO: make this configurable
        val.timeout({ response: 60000, deadline: 90000 })
        this._req = val
    }

    get latencyBuffer() {
        return this._latencyBuffer
    }

    /**
     * Getter for the current Superagent agent.
     * Reuse this agent in step definitions to preserve client sessions
     */
    get currentAgent() {
        return this._currentAgent
    }

    /**
     * Setter for the current Superagent agent.
     * Reuse this agent in step definitions to preserve client sessions
     */
    set currentAgent(agent) {
        this._currentAgent = agent
    }

    /**
     * Creates and returns a new SuperAgent agent
     */
    newAgent() {
        const agent = request.agent()
        agent._bat = {}
        agent.set('User-Agent', `behavioral-api-tester/${version}`)
        return agent
    }

    /**
     * Get a Superagent agent for a specific authorization role
     * @param {string} role The role, such as 'admin'
     */
    getAgentByRole(role) {
        return agents.get(role)
    }

    /**
     * Save a Superagent agent for a given authorization role
     * @param {string} role
     * @param {*} agent
     */
    setAgentByRole(role, agent) {
        this._currentAgent = agent
        agents.set(role, agent)
    }

    async setBasicAuth(credentials) {
        const { username, password } = credentials
        const agent = this.currentAgent
        const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64')
        agent.set('Authorization', `Basic ${encodedCredentials}`)
    }

    /**
     * Get an Oauth2 access token, by sending the credentials to the endpoint url
     * @param {*} url The full token url ()
     * @param {*} credentials
     */
    async getOAuthAccessToken(url, credentials) {
        const agent = this.currentAgent

        // do an oauth2 login
        // only set the bearer token once on the agent
        if (!agent._bat.bearer) {
            const res = await agent
                .post(this.baseUrl + this.replaceVars(url))
                .type('application/x-www-form-urlencoded')
                .send(this.replaceVars(credentials))

                this.saveResponse({ method: 'POST', url }, res)

            // get the access token from the response body
            const getAccessToken = body => body.accessToken || body.access_token
            if (!getAccessToken(res.body)) {
                // no access token received.
                throw new Error(`Could not authenticate with OAuth2:\n\t${res.body}`)
            }

            agent._bat.bearer = getAccessToken(res.body)
        }
        agent.set('Authorization', `Bearer ${agent._bat.bearer}`)
    }

    setUserVar(key, value) {
        this.userVars.push({
            key,
            value
        })
    }

    /**
     * Replace placeholders in a value with variables currently stored from
     * environemtn config and previous responses.
     *
     * @param {*} val
     */
    replaceVars(val) {
        const vars = [].concat(this.responseVars).concat(this.userVars).concat(this.envVars)
        if (!val) {
            return val
        }

        // cheeky way to easily replace on whole objects:
        const placeHolders = vars.map(pair => pair.key).join('|')
        const regex = new RegExp(`{(${placeHolders})}`, 'g')
        return JSON.parse(JSON.stringify(val).replace(regex, (match, p1) => {
            const matchPair = vars.find(pair => pair.key === p1)
            return matchPair ? matchPair.value : match
        }))
    }

    /**
     * Returns Super Agent middleware that replaces placeholders with
     * variables
     */
    replaceVariablesInitiator() {
        return req => {
            req.originalUrl = this.originalUrl || req.url
            req.url = this.replaceVars(req.url)
            req.qs = this.replaceVars(req.qs)
            req.header = this.replaceVars(req.header)
            req.cookies = this.replaceVars(req.cookies)
            req._data = this.replaceVars(req._data)
            return req
        }
    }

    /**
     * Gets the body from a response. Includes logic to parse
     * JSON from JSON responses that have an incorrect 'text/html' content type.
     * @param {} res A Superagent response object
     */
    async getResponse() {
        return await this.req.ok(() => true)
    }

    /**
     * Save the current response so its values can be used for future requests
     */
    async saveCurrentResponse() {
        this.saveResponse(this.req, await this.getResponse())
    }

    /**
     * Save a response so its values can be used for future requests
     */
    async saveResponse(req, res) {
        const { url, method } = req
        const cacheKey = getResponseCacheKey((this.originalUrl || url).split('?')[0], method)
        responseCache.set(cacheKey, res.body)
    }

    /**
     * Retrieve a response cached by `saveCurrentResponse`
     * @param {} resource An HTTP resource
     * @param {*} method An HTTP method
     * @param {*} status The response status, defaults to 200
     */
    retrieveResponse(resource, method) {
        return responseCache.get(getResponseCacheKey(resource, method))
    }

    /**
     * Load a file from the local filesystem or HTTP. 
     * Also caches the response for subsequent calls in the same test run
     * @param {} path The file path or URL
     */
    async loadFile(path) {
        if(fileCache.has(path)) {
            return fileCache.get(path)
        }

        // get the file over http or filesystem
        let content
        if (/^https?:\/\//i.test(path)) {
            const res = await fetch(path)
            if (!res.ok) {
                throw new Error(`Could not fetch "${path}: ${res.status}`)
            }
            content = await res.text();
        } else {
            content = readFileSync(path, 'utf8')
        }

        fileCache.set(path, content)

        return content
    }
}

function reset(scenario) {
    this.debug = []
    this.responseVars = []
    this.userVars = [
        {
            key: 'timestamp',
            value: Date.now(),
        },
        {
            key: 'randomInt',
            value: Math.round(Math.random() * 1000),
        },
    ]
    this.scenarioName = scenario.pickle.name;
}

async function printDebug(info) {
    const sep = chalk.magenta.bold(new Array(80).fill('*').join(''))
    if (this.debug.length) {
        console.log('\n' + sep + '\n')
        for (const line of this.debug) {
            console.log(line)
        }
        console.log('\n' + sep + '\n')
    }
    if (info.result.status === 'failed') {
        let res
        try {
            res = await this.req
        } catch (err) {
            res = err.response
        } finally {
            console.log('\n' + sep + '\n')
            console.log('Url:\n')
            console.log(this.req.url)
            console.log('\nResponse body:\n')
            console.log(res.body)
            console.log('\n' + sep + '\n')
        }

    }
} 

export function registerHooks({ Before, After }) {
    Before(reset)
    After(printDebug)
}