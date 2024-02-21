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

import * as fn from './steps-fn.js';

/** @module steps */

function registerSteps({ Given, When, Then }) {

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Given
    // Background steps to sending a request
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Given I am anonymous
     * Explicitly state that the client is not authenticated (doesn't actually do anything).
     *
     * @example
     * Given I am anonymous
     *
     * @function anonymous
     */
    Given('I am anonymous', fn.noop);

    /**
     * **Given** I am a {string}
     * Setting a user role allows you to reuse sessions, bearer tokens etc across
     * scenarios without needing re-authenticate each time. Under the hood this is storing
     * a collection of SuperAgent agents.
     */
    Given(/^I am an? "([^"]*)"$/, fn.setCurrentAgentByRole);

    /**
     * **Given** I am using **basic auth**entication **using** the credentials**:**
     * Sets a base 64 encoded basic authentication header that is used on subsequent requests.
     *
     * @example
     * Given basic auth using:
     *   | username | <username> |
     *   | password | <password> |
     *
     * @function basicAuth
     */
    Given('basic auth using:', fn.basicAuth);

    /**
     * **Given** I am using **basic auth**entication **using credentials from: {string}*
     * Sets a base 64 encoded basic authentication header that is used on subsequent requests using
     * credentials obtained from a Postman-like environment file.
     * 
     * @example
     * Given basic auth using credentials from: "/path/to/user.json"
     *
     * @function basicAuthUsingFileCredentials
     */
    Given('basic auth using credentials from: {string}', fn.basicAuthUsingFileCredentials);

    /**
     * **Given** I obtain an access token from {string} using the credentials:
     * Supports logging into using OAuth2 credentials, typically with the password scheme.
     * Sessions (access tokens) will be stored and supported for subsequent requests.
     *
     * @example
     * Given I **get** an access **token from "{base}/auth/token" using** the credentials:
     *  | client_id     | harver    |
     *  | client_secret | harver123 |
     *  | username      | gerald    |
     *  | password      | foobar    |
     *  | grant_type    | password  |
     *
     * @function obtainAccessToken
     */
    Given('get token from {string} using:', fn.obtainAccessToken);

    /**
     * **Given** I **get** an access **token from {string} using the credentials from: {string}**
     * Supports logging into using OAuth2 credentials, typically with the password scheme
     * Sessions (access tokens) will be stored and supported for subsequent requests

     * @example 
     * Given get token from "{base}/auth/token" using credentials from: "/path/to/user.json"
     *
     * @function obtainAccessTokenUsingFileCredentials
     */
    Given('get token from {string} using credentials from: {string}',
        fn.obtainAccessTokenUsingFileCredentials);

    /**
     * **Given** I am using the **default content type: {string}**
     * Set a default Content-Type header for future requests. This is useful
     * as a step in a feature's "Background"
     *
     * @example 
     * Given default content type: "application/json"
     *
     * @function defaultContentType
     */
    Given('default content type: {string}', fn.defaultContentType);

    /**
     * **Given** I set the variables:
     * Set variable key/value pairs which will be automatically be substitued before
     * sending requests.
     *
     * @example
     * Given I set the variables:
     * | base | https://petstore.com |
     * | name | Fido                 |
     *
     * @function setVariables
     */
    Given(/^I set the variables?:$/, fn.setVariables);

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // When
    // Setup the request
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * **When** I send a **{string}** request to **{string}**
     * Construct a request to a resource using an HTTP method
     * Note: this should be the first "When"
     *
     * @example
     * When GET "/pets"
     * When POST "/pets"
     * When PUT "/pets/1234"
     * When DELETE "/pets/1234"
     *
     * @function makeRequest
     */

    When(/^(POST|GET|PUT|PATCH|DELETE|HEAD) "([^"]+)"$/i, fn.makeRequest);

    /**
     * **When** I send the **GraphQL** query:
     * Construct a GraphQL query
     * 
     * @example 
     * When GraphQL:
     * """
     * {
     *   pets {
     *      id
     *      name
     *      type
     *   }
     * }
     * """
     *
     * @function makeGraphQLRequest
     */
    When('GraphQL:', fn.makeGraphQLRequest);

    /**
     * **When** I add the **query string** parameters**:**
     * Add query string paramaters defined in a Gherkin data table
     *
     * @example <caption>Short form</caption>
     * When query string:
     *  | sort   | desc |
     *  | filter | red  |
     *
     * @function addQueryString
     */
    When('query string:', fn.addQueryString);

    /**
     * **When** I **send** the request body**:**
     * Add a JSON request body included in the Gherkin doc strings
     *
     * @example
     * When send:
     * """
     * { "name" : "Ka", "type" : "Snake" }
     * """
     *
     * @function addRequestBody
     */
    When('send:', fn.addRequestBody);

    /**
     * **When** I **send** a body with content type **{string}:**
     * Add a request body included in the Gherkin doc strings or data table
     * with a given content type
     *
     * The type "application/x-www-form-urlencoded" can be abbreviated to just "form".
     *
     * @example 
     * When send "form":
     *  | name | Ka    |
     *  | type | Snake |
     *
     * @function addRequestBodyWithContentType
     */
    When('send {string}:', fn.addRequestBodyWithContentType);

    /**
     * **When** I **send** the **example body**
     * Adds a request body extracted from the open api spec for this request's resource and method.
     * See the [test openapi.yaml](../test/openapi.yaml) for an example.
     *
     * @example 
     * When send example body
     *
     * @function addRequestBodyFromExample
     */
    //When('send example body', fn.addRequestBodyFromExample);

    /**
     * **When** I **send** the request body **from** the **file: {string}**
     * Add a request body loaded from a file.
     *
     * @example 
     * When send from file "/test/files/json/sample-json"
     *
     * @function addRequestBodyFromFile
     */
    When('send from file: {string}', fn.addRequestBodyFromFile);

    /**
     * **When** I **set** the request headers:
     * Set one or more request headers in a single step.

     * @example
     * When set:
     *   | Content-Type     | application/json |
     *   | Accept-Language  | en               |
     *
     * @function setRequestHeaders
     */
    When('set:', fn.setRequestHeaders);

    /**
     * **When** I **set** the **cookies:**
     * Sets one or more cookies on the request using a data table.
     *
     * @example
     * When set cookies:
     *  | Name | Value | Flags  |
     *  | foo  | bar   | path=/ |
     *
     * @function setRequestCookies
     */
    When(/^set cookies?:$/, fn.setRequestCookies);

    /**
     * **When** I set the placeholder {string} using the json path {string} from the previous {string} to {string}
     *
     * Say, in a previous scenario, a 'GET' request was sent '/pets'. We can extract data from
     * this response and use it to populate placeholders in subsequent requests.
     *
     * The example below will extract an id from a previously retrieved set of pets and use it
     * to populate the placeholder to get a specific pet resource:
     *
     * @example
     * **When** I send a 'GET' request to '/pets/{id}'
     * And I set the placeholder 'id' using the json path '$.[0].id' from the last 'GET' to '/pets'
     *
     * @function populatePlaceholder
     */
    When('I set the placeholder {string} using the json path {string} from the previous {string} to {string}',
        fn.populatePlaceholder);

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Then
    // Send the request and run assertions on the response
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * **Then** I should **receive** the **status {int}**
     * Ensure the response was received with a given status.
     * This should always be the first "Then" assertion.
     *
     * #Redirects
     * Normally, HTTP redirects will be handled opaquely; the redirect is followed and the resulting response is
     * asserted. However, if the status code to be asserted is a
     * [redirect status code](https://en.wikipedia.org/wiki/URL_redirection#HTTP_status_codes_3xx) the redirect
     * will not be followed.
     *
     * To assert the associated Location header use the appropriate separate step
     *
     * @example
     * Then receive status 200
     *
     * @function receiveRequestWithStatus
     */
    Then('receive status {int}', fn.receiveResponseWithStatus);

    /**
     * **Then** I should receive a response **within {int}ms**
     * Ensure the response was received within a time limit. For slow netork connections
     * use the LATENCY_BUFFER environment variable to increas this uniformly for all scenarios.
     *
     * @example
     * Then within 500ms
     *
     * @function receiveWithinTime
     */
    Then('within {int}ms', fn.receiveWithinTime);

    /**
     * **Then** I should **receive** the **text:**
     *
     * @example
     * Then receive text:
     * """
     * The quick brown fox
     * """
     *
     * @function receiveText
     */
    Then('receive text:', fn.receiveText);

    /**
     * **Then** the response header {string} should equal {string}
     * Ensure a response header equals the expect value
     *
     * @example
     * Then the response header "Content-Type" should equal "application/json"
     *
     * @function responseHeaderEquals
     */
    Then('response header {string} should equal {string}', fn.responseHeaderEquals);

    /**
     * **Then** the response body **json path at {string} should equal {string}**
     * Ensure a JSON response body equals a given value at the JSON path. Equality is determined
     * using `==` so giving value "10" will equal the number 10 in JSON.
     * See [http://goessner.net/articles/JsonPath/](http://goessner.net/articles/JsonPath/)
     *
     * @example 
     * Then json path at "$.[1].name" should equal "Rover"
     *
     * @function responseBodyJsonPathEquals
     */
    Then('json path at {string} should equal {string}', fn.responseBodyJsonPathEquals);

    /**
     * **Then** the response body **json path at {string} should match {string}**
     * Ensure a JSON response body at the given JSON path, matches a regular expression.
     * n.b. For simpliciy, Bat variables in regular expressions are not subsituted.
     * See [http://goessner.net/articles/JsonPath/](http://goessner.net/articles/JsonPath/)
     *
     * @example 
     * Then json path at "$.[1].age" should match "\d+"
     *
     * @function responseBodyJsonPathMatches
     */
    Then('json path at {string} should match {string}', fn.responseBodyJsonPathMatches);

    /**
     * **Then** the response body **json path at {string} should be empty**
     * Ensure the JSON path is empty.
     * See [http://goessner.net/articles/JsonPath/](http://goessner.net/articles/JsonPath/)
     * See [https://www.chaijs.com/api/bdd/#method_empty](https://www.chaijs.com/api/bdd/#method_empty)
     *
     * @example 
     * Then json path at "$.[1].name" should be empty
     *
     * @function responseBodyJsonPathIsEmpty
     */
    Then('json path at {string} should be empty', fn.responseBodyJsonPathIsEmpty);

    /**
     * **Then** I should receive a **response** that **sets** the **cookie:**
     *
     * Asserts that a response sent a cookie to the client
     *
     * @example
     * Then response sets cookie:
     *   | Name  | Value |
     *   | foo   | bar   |
     *
     * @function responseCookieEquals
     */
    Then('response sets cookie:', fn.responseCookieEquals);

    /**
     * **Then** the response body should validate against its response schema
     *
     * This will extract the response body json schemea from the Open API spec and
     * validate the current response body against it
     *
     * @example
     * Then the response body should validate against its response schema
     *
     * @example <caption>Short form</caption>
     * Then validate against schema
     *
     * @function validateAgainstSpecSchema
     */
    //Then('the response body should validate against its schema', fn.validateAgainstSpecSchema);

    // short form
    //Then('validate against schema', fn.validateAgainstSpecSchema);

    /**
     * **Then** the response body should validate against the response schema:
     *
     * This allows you to provide an inline response schema to validate the current
     * response body against. Generally not recommend because this can make the
     * feature file very verbose.
     *
     * @example
     * Then the response body should validate against the response schema:
     * """
     * { ... }
     * """
     *
     * @example <caption>Short form</caption>
     * Then validate against the schema:
     * """
     * { ... }
     * """
     *
     * @function validateAgainstInlineSchema
     */
    //Then('the response body should validate against the schema:', fn.validateAgainstInlineSchema);

    // short form
    //Then('validate against the schema:', fn.validateAgainstInlineSchema);

    /**
     * **Then** the response body should validate against the schema from {string}
     *
     * This will load a response body json schemea from a file
     *
     * @example
     * Then the response body should validate against the schema from "./path/to/schema.json"
     *
     * @example <caption>Short form</caption>
     * Then validate against the schema from "./path/to/schema.json"
     *
     * @function validateAgainstFileSchema
     */
    //Then('the response body should validate against the schema from {string}', fn.validateAgainstFileSchema);

    //Then('validate against the schema from {string}', fn.validateAgainstFileSchema);

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Some debug helpers
    ///////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * Then print the request
     *
     * Debug step which prints the request that SuperAgent will send
     *
     * @example
     * Then print the request
     *
     * @function printRequest
     */
    Then('print the request', async function () {
        const req = this.replaceVariablesInitiator()(this.req);
        this.debug.push(`[debug] ${this.scenarioName}:`)
        this.debug.push(`[debug] Request for "${req.method}" to "${req.url}":\n`);
        const { method, url, headers, qs, _data: data } = req;
        this.debug.push(JSON.stringify({ method, url, headers, qs, data }, null, '  '));
    });

    /**
     * Then print the response body
     *
     * Debug step that will print the received response body.
     *
     * This must run after the `Then I should receive a response with the status <status>` step
     * but will not run if that step fails to assert. So you might need to temporarily change
     * this expectation in order to debug the response body received.
     *
     * @example
     * Then print the response body
     *
     * @function printResponseBody
     */
    Then('print the response body', async function () {
        let res;
        try {
            res = await this.req;
        } catch (err) {
            if (!err.status) {
                throw err;
            }
            res = err.response;
        }

        this.debug.push(`[debug] ${this.scenarioName}:`)
        this.debug.push(`[debug] Response body for "${this.req.method}" to "${this.req.url}":\n`);
        this.debug.push(JSON.stringify(res.body, null, '  '));
    });
}

export {
    registerSteps,
};
