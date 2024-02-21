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
import http from 'node:http';
import url from 'node:url'

import { setWorldConstructor, After, AfterAll, Before, BeforeAll, Given, When, Then } from '@cucumber/cucumber'

import { registerHooks, registerSteps, BatWorld } from '../../../src/index.js';

setWorldConstructor(BatWorld);
registerHooks({ After, AfterAll, Before, BeforeAll });
registerSteps({ Given, Then, When });

process.env.GRAPHQL_BASE_URL = 'http://localhost:3000/graphql';

// a custom login step
Given('I am logged in as a {string}', async function (role) {
    // does an agent for this role already exist?
    const roleAgent = this.getAgentByRole(role);
    if (roleAgent) {
        this.setAgentByRole(role, roleAgent);
        return;
    }

    // construct and send a login request
    const agent = this.newAgent();
    const req = agent.post(this.replaceVars('{base}/my-login'));

    await req.send({
        // this gets predefined credentials for this role from the `env/dev.json` file
        username: this.replaceVars(`{${role}_user}`),
    });
    this.setAgentByRole(role, agent);
});

AfterAll(function (done) {
    const fileUrl = new URL('../../env/dev.json', import.meta.url);
    const optionsJson = JSON.parse(readFileSync(fileUrl, 'utf8'));

    const options = url.parse(optionsJson.values.find(val => val.key === 'base').value);
    const req = http.request({ ...options, path: '/reset' }, () => done());
    req.end();
});

process.on('unhandledRejection', reason => {
    console.error('\nThere was an unhandled rejection: "%s"', reason);
    console.log(reason);
});
