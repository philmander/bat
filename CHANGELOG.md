# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.1.0](https://github.com/philmander/bat/compare/v2.0.2...v2.1.0) (2024-02-28)


### Features

* Save Oauth responses from Given steps so they can be used for setting placeholder variables ([704c915](https://github.com/philmander/bat/commit/704c9158a6a03b015a96c7a80440bffeb09a9fc7))


### Bug Fixes

* Replace variable placeholders when setting cookie values ([9c0c83e](https://github.com/philmander/bat/commit/9c0c83eb173e689f38a7e7ce4c2928fc3e2f9c1d))

### [2.0.2](https://github.com/philmander/bat/compare/v2.0.1...v2.0.2) (2024-02-21)


### Bug Fixes

* Add and ensure new lines in the jsdoc titles ([cb30bb9](https://github.com/philmander/bat/commit/cb30bb9b87f7ab93c8c0dc1efe8dc1f6d7cec7f9))

### [2.0.1](https://github.com/philmander/bat/compare/v2.0.0...v2.0.1) (2024-02-21)

## 2.0.0 (2024-02-21)


### ⚠ BREAKING CHANGES

* The step "When I add the query string parameters" must now be
suffixed with a colon. E.g.

`When I add the query string parameters:`
* The step "When I add the query string parameters" must now be
suffixed with a colon. E.g.

`When I add the query string parameters:`
* The step "When I add the query string parameters" must now be
suffixed with a colon. E.g.

`When I add the query string parameters:`

### Features

* Add "the response body json path at {string} should be empty" step ([cda853b](https://github.com/philmander/bat/commit/cda853b427e3875c896bab1676a8eb8ba74319a0))
* Add "Then I should receive the text:" step ([2a7ce9e](https://github.com/philmander/bat/commit/2a7ce9e0374e23e8b086792ae3a5fc39feb66e62))
* Add a "latency buffer" to pad request time assertions on slow connections ([9190bf2](https://github.com/philmander/bat/commit/9190bf25ec68fc8264e0cc227454647859af96ac))
* Add support for login with OAuth 2 ([2baf1eb](https://github.com/philmander/bat/commit/2baf1eb6b9849880cde6a567187614a7b8204f0e))
* Added graphQL queries and mutations support ([73a5b6c](https://github.com/philmander/bat/commit/73a5b6c5d977f1007074f950580d4b851e51881c))
* Added step to assert json path values using a regex ([2718a5f](https://github.com/philmander/bat/commit/2718a5f3f100123516c15b75e47d4e1dc43101ef))
* Generalized support for better authentication ([87ea1de](https://github.com/philmander/bat/commit/87ea1de11e8e8cc90d2bc339f484914aac82864d))
* Provide short forms of steps ([870c986](https://github.com/philmander/bat/commit/870c9862ccf1d4da9cc519a7edda3919a6d099a7))
* Remove long form steps and refind short forms ([064724a](https://github.com/philmander/bat/commit/064724a2e23f832d651a44bd61909b946fbc380b))
* Support asserting redirect responses ([f1183c5](https://github.com/philmander/bat/commit/f1183c5f540d60e26fc4120bcf5d004e0f80c4e1))
* Support Postman envs and 'application/x-www-form-urlencoded' content types ([284cc86](https://github.com/philmander/bat/commit/284cc861788cc921fb2c8c46d9b77e6dc6d06d72))
* Support Postman envs and 'application/x-www-form-urlencoded' content types ([9807ee0](https://github.com/philmander/bat/commit/9807ee00c75a73733d6ea1f32457072a97f57963))
* Support Postman envs and 'application/x-www-form-urlencoded' content types ([4968916](https://github.com/philmander/bat/commit/4968916d29037c078ff63a6ae9f73f6b0be8267a))
* Update to run on Node 20.10 ([2247a77](https://github.com/philmander/bat/commit/2247a774def6e5e4a4275d1780fa0b0cf2873fa2))
* Updates/maturity to support Harver public API ([a3c09c1](https://github.com/philmander/bat/commit/a3c09c1ec6940a569fdd96947d8a7eec1f0691aa))
* Use Bat's own user agent string so it can be identified in access logs ([f7e4996](https://github.com/philmander/bat/commit/f7e49967044b42f999bb4e94496d7b703c582ae4))


### Bug Fixes

* `chai-match` incorrectly a devDependency ([177fbae](https://github.com/philmander/bat/commit/177fbaee9fc6e6bf9f9c582cdac5605b961c3818))
* Add `newAgent()` helper ([1ee2a9a](https://github.com/philmander/bat/commit/1ee2a9a626af3b23c314ba44f692bc1ead80e7df))
* added eslint and updated dev dependencies ([a5869a0](https://github.com/philmander/bat/commit/a5869a00a48506e51ac474629ba37d4dcf68099d))
* allow for repeated query parameters. ([507901f](https://github.com/philmander/bat/commit/507901f19e0c5110c766f947f3783e815f29a142))
* Cookies not persisted when using {base} variable in url ([6f38f38](https://github.com/philmander/bat/commit/6f38f3896dc5f90d3bb0f297f5cd025a6c4bd203))
* fixed bad indentation breaking linter ([df7b9ed](https://github.com/philmander/bat/commit/df7b9edc7891b57219d057963e1d0fdb8d031d21))
* Fixed bug where request headers were not set ([4908d35](https://github.com/philmander/bat/commit/4908d35383d4776f194584c3d73e6cefef7f3ec2))
* Fixed schema lookup not using `req.originalUrl` ([558504e](https://github.com/philmander/bat/commit/558504e2444537df1d0d9b079ea83f2304f34e80))
* Missing setter for world.currentAgent ([63f186b](https://github.com/philmander/bat/commit/63f186b3da3279879d6a09193cfa8cc47bf471c4))
* Print response body if response status is 4.xx or 5.xx ([56f283e](https://github.com/philmander/bat/commit/56f283e24203c3511b43b36afb43d6877be2e3fa))
* Retrieve placeholder values without replacing vars in url when getting prev responses ([91d156e](https://github.com/philmander/bat/commit/91d156edcba86f3ebdc92c5301719f4191b24cd2))
* Simplify `world.getResponse()` so that 4xx and 5xx codes are ok without error handling ([2e4ba73](https://github.com/philmander/bat/commit/2e4ba73be6b9464d6c931c1001cc7915fb38b43e))
* Small fixes and improvemnets for inline documentation. ([ae7396f](https://github.com/philmander/bat/commit/ae7396fe431c13bbb8db1c2e1eb73e3764f418b7))
* Update dependencies ([ac39918](https://github.com/philmander/bat/commit/ac399181bcdbe995b8d09e192c4259f0757aa899))
* Update dependencies and bump version to 1.0.0 ([803a5db](https://github.com/philmander/bat/commit/803a5db4c1eee06df74e9c06d4ec2a48124005f0))
* Use == over === to determine equality for json path values ([9aca1be](https://github.com/philmander/bat/commit/9aca1beab6634f272000d3471a4ea9e5479e1fba))
* Use rowHash instead of hashes for headers data tables ([61b10d6](https://github.com/philmander/bat/commit/61b10d67ff77d78a740b887a8daaecce6cda8e1e))
* When adding req body, provided content type not overriding default content type ([d747cb3](https://github.com/philmander/bat/commit/d747cb3ad83ba0f251bc1fc6d09d33ad7d3afd79))

### [1.1.1](https://github.com/harver-bv/bat/compare/v1.1.0...v1.1.1) (2019-10-15)


### Bug Fixes

* added eslint and updated dev dependencies ([a5869a0](https://github.com/harver-bv/bat/commit/a5869a0))
* allow for repeated query parameters. ([507901f](https://github.com/harver-bv/bat/commit/507901f))
* fixed bad indentation breaking linter ([df7b9ed](https://github.com/harver-bv/bat/commit/df7b9ed))

## 1.1.0 (2019-08-28)


### ⚠ BREAKING CHANGES

* The step "When I add the query string parameters" must now be
suffixed with a colon. E.g.

`When I add the query string parameters:`
* The step "When I add the query string parameters" must now be
suffixed with a colon. E.g.

`When I add the query string parameters:`
* The step "When I add the query string parameters" must now be
suffixed with a colon. E.g.

`When I add the query string parameters:`

### Bug Fixes

* `chai-match` incorrectly a devDependency ([177fbae](https://github.com/harver-bv/bat/commit/177fbae))
* Add `newAgent()` helper ([1ee2a9a](https://github.com/harver-bv/bat/commit/1ee2a9a))
* Cookies not persisted when using {base} variable in url ([6f38f38](https://github.com/harver-bv/bat/commit/6f38f38))
* Fixed bug where request headers were not set ([4908d35](https://github.com/harver-bv/bat/commit/4908d35))
* Fixed schema lookup not using `req.originalUrl` ([558504e](https://github.com/harver-bv/bat/commit/558504e))
* Missing setter for world.currentAgent ([63f186b](https://github.com/harver-bv/bat/commit/63f186b))
* Print response body if response status is 4.xx or 5.xx ([56f283e](https://github.com/harver-bv/bat/commit/56f283e))
* Retrieve placeholder values without replacing vars in url when getting prev responses ([91d156e](https://github.com/harver-bv/bat/commit/91d156e))
* Simplify `world.getResponse()` so that 4xx and 5xx codes are ok without error handling ([2e4ba73](https://github.com/harver-bv/bat/commit/2e4ba73))
* Update dependencies ([ac39918](https://github.com/harver-bv/bat/commit/ac39918))
* Update dependencies and bump version to 1.0.0 ([803a5db](https://github.com/harver-bv/bat/commit/803a5db))
* Use == over === to determine equality for json path values ([9aca1be](https://github.com/harver-bv/bat/commit/9aca1be))
* Use rowHash instead of hashes for headers data tables ([61b10d6](https://github.com/harver-bv/bat/commit/61b10d6))
* When adding req body, provided content type not overriding default content type ([d747cb3](https://github.com/harver-bv/bat/commit/d747cb3))


### Features

* Add "the response body json path at {string} should be empty" step ([cda853b](https://github.com/harver-bv/bat/commit/cda853b))
* Add "Then I should receive the text:" step ([2a7ce9e](https://github.com/harver-bv/bat/commit/2a7ce9e))
* Add a "latency buffer" to pad request time assertions on slow connections ([9190bf2](https://github.com/harver-bv/bat/commit/9190bf2))
* Add support for login with OAuth 2 ([2baf1eb](https://github.com/harver-bv/bat/commit/2baf1eb))
* Added graphQL queries and mutations support ([73a5b6c](https://github.com/harver-bv/bat/commit/73a5b6c))
* Added step to assert json path values using a regex ([2718a5f](https://github.com/harver-bv/bat/commit/2718a5f))
* Generalized support for better authentication ([87ea1de](https://github.com/harver-bv/bat/commit/87ea1de))
* Provide short forms of steps ([870c986](https://github.com/harver-bv/bat/commit/870c986))
* Support asserting redirect responses ([f1183c5](https://github.com/harver-bv/bat/commit/f1183c5))
* Support Postman envs and 'application/x-www-form-urlencoded' content types ([284cc86](https://github.com/harver-bv/bat/commit/284cc86))
* Support Postman envs and 'application/x-www-form-urlencoded' content types ([9807ee0](https://github.com/harver-bv/bat/commit/9807ee0))
* Support Postman envs and 'application/x-www-form-urlencoded' content types ([4968916](https://github.com/harver-bv/bat/commit/4968916))
* Updates/maturity to support Harver public API ([a3c09c1](https://github.com/harver-bv/bat/commit/a3c09c1))
* Use Bat's own user agent string so it can be identified in access logs ([f7e4996](https://github.com/harver-bv/bat/commit/f7e4996))

# 0.7.0 (2019-02-22)


### Bug Fixes

* Add `newAgent()` helper ([1ee2a9a](https://github.com/harver-bv/bat/commit/1ee2a9a))
* Cookies not persisted when using {base} variable in url ([6f38f38](https://github.com/harver-bv/bat/commit/6f38f38))
* Fixed schema lookup not using `req.originalUrl` ([558504e](https://github.com/harver-bv/bat/commit/558504e))
* Missing setter for world.currentAgent ([63f186b](https://github.com/harver-bv/bat/commit/63f186b))
* Print response body if response status is 4.xx or 5.xx ([56f283e](https://github.com/harver-bv/bat/commit/56f283e))
* Update dependencies ([ac39918](https://github.com/harver-bv/bat/commit/ac39918))
* Use rowHash instead of hashes for headers data tables ([61b10d6](https://github.com/harver-bv/bat/commit/61b10d6))
* When adding req body, provided content type not overriding default content type ([d747cb3](https://github.com/harver-bv/bat/commit/d747cb3))


### Features

* Add "Then I should receive the text:" step ([2a7ce9e](https://github.com/harver-bv/bat/commit/2a7ce9e))
* Add a "latency buffer" to pad request time assertions on slow connections ([9190bf2](https://github.com/harver-bv/bat/commit/9190bf2))
* Add support for login with OAuth 2 ([2baf1eb](https://github.com/harver-bv/bat/commit/2baf1eb))
* Provide short forms of steps ([870c986](https://github.com/harver-bv/bat/commit/870c986))
* Support Postman envs and 'application/x-www-form-urlencoded' content types ([284cc86](https://github.com/harver-bv/bat/commit/284cc86))
* Support Postman envs and 'application/x-www-form-urlencoded' content types ([9807ee0](https://github.com/harver-bv/bat/commit/9807ee0))
* Support Postman envs and 'application/x-www-form-urlencoded' content types ([4968916](https://github.com/harver-bv/bat/commit/4968916))
* Updates/maturity to support Harver public API ([a3c09c1](https://github.com/harver-bv/bat/commit/a3c09c1))


### BREAKING CHANGES

* The step "When I add the query string parameters" must now be
suffixed with a colon. E.g.

`When I add the query string parameters:`
* The step "When I add the query string parameters" must now be
suffixed with a colon. E.g.

`When I add the query string parameters:`
* The step "When I add the query string parameters" must now be
suffixed with a colon. E.g.

`When I add the query string parameters:`
