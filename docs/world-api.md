<a name="module_World"></a>

## World

* [World](#module_World)
    * [.BatWorld](#module_World.BatWorld)
        * [.baseUrl](#module_World.BatWorld+baseUrl)
        * [.baseGraphQLUrl](#module_World.BatWorld+baseGraphQLUrl)
        * [.req](#module_World.BatWorld+req)
        * [.req](#module_World.BatWorld+req)
        * [.apiSpec](#module_World.BatWorld+apiSpec)
        * [.currentAgent](#module_World.BatWorld+currentAgent)
        * [.currentAgent](#module_World.BatWorld+currentAgent)
        * [.newAgent()](#module_World.BatWorld+newAgent)
        * [.getAgentByRole(role)](#module_World.BatWorld+getAgentByRole)
        * [.setAgentByRole(role, agent)](#module_World.BatWorld+setAgentByRole)
        * [.getEndpointSpec()](#module_World.BatWorld+getEndpointSpec)
        * [.getOAuthAccessToken(url, credentials)](#module_World.BatWorld+getOAuthAccessToken)
        * [.replaceVars(val)](#module_World.BatWorld+replaceVars)
        * [.replaceVariablesInitiator()](#module_World.BatWorld+replaceVariablesInitiator)
        * [.getResponse(res)](#module_World.BatWorld+getResponse)
        * [.saveCurrentResponse()](#module_World.BatWorld+saveCurrentResponse)
        * [.saveResponse()](#module_World.BatWorld+saveResponse)
        * [.retrieveResponse(resource, method, status)](#module_World.BatWorld+retrieveResponse)

<a name="module_World.BatWorld"></a>

### World.BatWorld
State and stateful utilities can be shared between steps using an instance of "World"

**Kind**: static class of [<code>World</code>](#module_World)  

* [.BatWorld](#module_World.BatWorld)
    * [.baseUrl](#module_World.BatWorld+baseUrl)
    * [.baseGraphQLUrl](#module_World.BatWorld+baseGraphQLUrl)
    * [.req](#module_World.BatWorld+req)
    * [.req](#module_World.BatWorld+req)
    * [.apiSpec](#module_World.BatWorld+apiSpec)
    * [.currentAgent](#module_World.BatWorld+currentAgent)
    * [.currentAgent](#module_World.BatWorld+currentAgent)
    * [.newAgent()](#module_World.BatWorld+newAgent)
    * [.getAgentByRole(role)](#module_World.BatWorld+getAgentByRole)
    * [.setAgentByRole(role, agent)](#module_World.BatWorld+setAgentByRole)
    * [.getEndpointSpec()](#module_World.BatWorld+getEndpointSpec)
    * [.getOAuthAccessToken(url, credentials)](#module_World.BatWorld+getOAuthAccessToken)
    * [.replaceVars(val)](#module_World.BatWorld+replaceVars)
    * [.replaceVariablesInitiator()](#module_World.BatWorld+replaceVariablesInitiator)
    * [.getResponse(res)](#module_World.BatWorld+getResponse)
    * [.saveCurrentResponse()](#module_World.BatWorld+saveCurrentResponse)
    * [.saveResponse()](#module_World.BatWorld+saveResponse)
    * [.retrieveResponse(resource, method, status)](#module_World.BatWorld+retrieveResponse)

<a name="module_World.BatWorld+baseUrl"></a>

#### batWorld.baseUrl
Getter for the `baseUrl` used for all requests

**Kind**: instance property of [<code>BatWorld</code>](#module_World.BatWorld)  
<a name="module_World.BatWorld+baseGraphQLUrl"></a>

#### batWorld.baseGraphQLUrl
Getter for the `baseGraphQLUrl` used for all requests

**Kind**: instance property of [<code>BatWorld</code>](#module_World.BatWorld)  
<a name="module_World.BatWorld+req"></a>

#### batWorld.req
Getter for the currently active Superagent request object

**Kind**: instance property of [<code>BatWorld</code>](#module_World.BatWorld)  
<a name="module_World.BatWorld+req"></a>

#### batWorld.req
Setter for the active request

**Kind**: instance property of [<code>BatWorld</code>](#module_World.BatWorld)  
<a name="module_World.BatWorld+apiSpec"></a>

#### batWorld.apiSpec
Getter for the full Open API spec

**Kind**: instance property of [<code>BatWorld</code>](#module_World.BatWorld)  
<a name="module_World.BatWorld+currentAgent"></a>

#### batWorld.currentAgent
Getter for the current Superagent agent.
Reuse this agent in step definitions to preserve client sessions

**Kind**: instance property of [<code>BatWorld</code>](#module_World.BatWorld)  
<a name="module_World.BatWorld+currentAgent"></a>

#### batWorld.currentAgent
Setter for the current Superagent agent.
Reuse this agent in step definitions to preserve client sessions

**Kind**: instance property of [<code>BatWorld</code>](#module_World.BatWorld)  
<a name="module_World.BatWorld+newAgent"></a>

#### batWorld.newAgent()
Creates and returns a new SuperAgent agent

**Kind**: instance method of [<code>BatWorld</code>](#module_World.BatWorld)  
<a name="module_World.BatWorld+getAgentByRole"></a>

#### batWorld.getAgentByRole(role)
Get a Superagent agent for a specific authorization role

**Kind**: instance method of [<code>BatWorld</code>](#module_World.BatWorld)  

| Param | Type | Description |
| --- | --- | --- |
| role | <code>string</code> | The role, such as 'admin' |

<a name="module_World.BatWorld+setAgentByRole"></a>

#### batWorld.setAgentByRole(role, agent)
Save a Superagent agent for a given authorization role

**Kind**: instance method of [<code>BatWorld</code>](#module_World.BatWorld)  

| Param | Type |
| --- | --- |
| role | <code>string</code> | 
| agent | <code>\*</code> | 

<a name="module_World.BatWorld+getEndpointSpec"></a>

#### batWorld.getEndpointSpec()
Get part of the Open API spec for just a single endpoint (resource + method)

**Kind**: instance method of [<code>BatWorld</code>](#module_World.BatWorld)  
<a name="module_World.BatWorld+getOAuthAccessToken"></a>

#### batWorld.getOAuthAccessToken(url, credentials)
Get an Oauth2 access token, by sending the credentials to the endpoint url

**Kind**: instance method of [<code>BatWorld</code>](#module_World.BatWorld)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>\*</code> | The full token url () |
| credentials | <code>\*</code> |  |

<a name="module_World.BatWorld+replaceVars"></a>

#### batWorld.replaceVars(val)
Replace placeholders in a value with variables currently stored from
environemtn config and previous responses.

**Kind**: instance method of [<code>BatWorld</code>](#module_World.BatWorld)  

| Param | Type |
| --- | --- |
| val | <code>\*</code> | 

<a name="module_World.BatWorld+replaceVariablesInitiator"></a>

#### batWorld.replaceVariablesInitiator()
Returns Super Agent middleware that replaces placeholders with
variables

**Kind**: instance method of [<code>BatWorld</code>](#module_World.BatWorld)  
<a name="module_World.BatWorld+getResponse"></a>

#### batWorld.getResponse(res)
Gets the body from a response. Includes logic to parse
JSON from JSON responses that have an incorrect 'text/html' content type.

**Kind**: instance method of [<code>BatWorld</code>](#module_World.BatWorld)  

| Param | Description |
| --- | --- |
| res | A Superagent response object |

<a name="module_World.BatWorld+saveCurrentResponse"></a>

#### batWorld.saveCurrentResponse()
Save the current response so its values can be used for future requests

**Kind**: instance method of [<code>BatWorld</code>](#module_World.BatWorld)  
<a name="module_World.BatWorld+saveResponse"></a>

#### batWorld.saveResponse()
Save a response so its values can be used for future requests

**Kind**: instance method of [<code>BatWorld</code>](#module_World.BatWorld)  
<a name="module_World.BatWorld+retrieveResponse"></a>

#### batWorld.retrieveResponse(resource, method, status)
Retrieve a response cached by `saveCurrentResponse`

**Kind**: instance method of [<code>BatWorld</code>](#module_World.BatWorld)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| resource |  |  | An HTTP resource |
| method | <code>\*</code> |  | An HTTP method |
| status | <code>\*</code> | <code>200</code> | The response status, defaults to 200 |

