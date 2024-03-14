# Copyright 2019 Harver B.V.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

Feature: API Testing Steps
  As an author of this library
  I want to test that all the steps work against a mock server
  So I can sleep at night

  Background: Anonymous usage
    Given I am anonymous
    Given set the variables:
      | color | red |
      | lang  | nl  |

  @short
  Scenario: Testing Gets
    When GET "{base}/pets"
    And query string:
      | sort     | desc        |
      | filter   | {color}     |
      | time     | {timestamp} |
      | select[] | name        |
      | select[] | age         |
    And set cookie:
      | Name | Value | Flags  |
      | foo  | bar   | path=/ |
    And set:
      | Accept-Language | {lang}           |
      | Content-Type    | application/json |
    Then receive status 200
    And within 1000ms
    And receive text:
      """
      [{"id":"1000","type":"cat","name":"Felix","age":10},{"id":"2000","type":"dog","name":"Rover","age":3}]
      """
    # deliberately do this twice.
    And validate with OpenAPI schema: "./test/pet-store.yaml#/components/schemas/Pets"
    And validate with OpenAPI schema: "./test/pet-store.yaml#/components/schemas/Pets"
    And json path at "$.[1].name" should equal "Rover"
    And json path at "$.[0].age" should equal "10"
    And json path at "$.[0].age" should match "\d{2}"
    And response header "Content-Language" should equal "en"

  @short
  Scenario: Testing Alternative Table Syntax for multiples
    When GET "{base}/pets"
    And query string:
      | sort     | desc        |
      | filter   | red         |
      | time     | {timestamp} |
      | select[] | name        |
      | select[] | age         |
    And set cookies:
      | Name | Value | Flags  |
      | foo  | bar   | path=/ |
    And set:
      | Accept-Language | nl               |
      | Content-Type    | application/json |
    And receive status 200

  @short
  Scenario: Testing Posts
    When POST "{base}/pets"
    And send:
      """
      { "name" : "Ka", "type" : "Snake" }
      """
    Then receive status 201

  @short
  Scenario: Testing urlencoded bodies
    When POST "{base}/pets/form"
    And send "form":
      | name | Otis       |
      | type | Chimpanzee |
    Then receive status 201
    And json path at "$" should be empty

  @short
  Scenario: Testing Posts using json file
    When POST "{base}/pets"
    And send from file: "./test/files/json/sample-json.json"
    Then receive status 201

  @short
  Scenario: Testing openapi spec intergration
    When POST "{base}/pets"
    And query string:
      | useSpec | true |
    #And send example body

  @short
  Scenario: Reuse previous values
    When PUT "{base}/pets/{id}"
    And send:
      """
      { "id" : "{id}" }
      """
    And query string:
      | id | {id} |
    And set the variable "id" using the json path "$.[0].id" from the previous "GET" to "{base}/pets"
    Then receive status 200
    And json path at "$.name" should equal "Felix"

  @short
  Scenario: Can Test status code 4**
    When PUT "{base}/pets/5000"
    Then receive status 418
    And json path at "$.message" should equal "'5000' == '1000'"

  @short
  @oauth
  Scenario: Testing OAuth support for Jayani
    Given get token from "{base}/auth/token" using:
      | client_id | 123    |
      | username  | jayani |
    When GET "{base}/secret/jayani"
    Then receive status 201

  @short
  @oauth
  Scenario: Testing OAuth support for Gerald 1
    Given I am a "Gerald"
    Given set the variables:
      | user | gerald    |
    Given get token from "{base}/auth/token" using:
      | client_id | 123    |
      | username  | {user} |
    When GET "{base}/secret/gerald"
    Then receive status 201
    Then print the response body

  @oauth  
  Scenario: Test accessing variables from oauth 
    Given set the variable "foo" using the json path "$.foo" from the previous "POST" to "{base}/auth/token"
    # this must resolve to GET "{base}/auth/bar123"
    When GET "{base}/auth/{foo}"
    Then receive status 204

  @oauth
  Scenario: Testing OAuth support for Gerald 1
    Given I am a "Gerald"
    # the previous scenario already got a bearer token for gerald
    # so this test ensures it is re-used and not requested again
    Given get token from "{base}/auth/token" using:
      | client_id | 123    |
      | username  | gerald |
    When GET "{base}/secret/gerald"
    Then receive status 201
    Then print the response body

  @auth
  Scenario: Testing basic authentication
    Given basic auth using:
      | username | priamo |
      | password | glutes |
    When GET "{base}/basic/auth/test"
    Then receive status 200


  @basicauth
  Scenario: Testing basic authentication
    Given basic auth using credentials from: "./test/env/dev.json"
    When GET "{base}/basic/auth/test"
    Then receive status 200

  Scenario: Testing get all pets graphql query
    When GraphQL:
      """
      {
      pets {
      id
      name
      type
      }
      }
      """
    Then receive status 200

  @short
  Scenario: Testing get single pet graphql query
    When GraphQL:
      """
      {
      pet (id:"1000") {
      name
      id
      }
      }
      """
    Then receive status 200
    And json path at "$.data.pet.id" should equal "1000"

  @short
  Scenario: Testing add a new pet graphql mutation query
    When GraphQL:
      """
      mutation {
      addPet (id:"3000", name:"bird", type:"Canary") {
      name
      id
      }
      }
      """
    Then receive status 200
    And json path at "$.data.addPet.id" should equal "3000"

  @short
    Scenario Outline: Scenario Outline name: Testing redirects
      When GET "{base}/redirect/<status>"
      Then receive status <status>

        Examples:
        | status |
        | 301 |
        | 302 |
        | 303 |
        | 307 |
        | 308 |