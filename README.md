# @semrel-extra/npm
Drop-in-repl for standard npm plugin to handle `npm-whoami` throttling issue for monorepos: [semantic-release/npm/issues/414](https://github.com/semantic-release/npm/issues/414)

[![CI](https://github.com/semrel-extra/npm/workflows/CI/badge.svg)](https://github.com/semrel-extra/npm/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/06ca7c8e9e5f8a2c5976/maintainability)](https://codeclimate.com/github/semrel-extra/npm/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/06ca7c8e9e5f8a2c5976/test_coverage)](https://codeclimate.com/github/semrel-extra/npm/test_coverage)

### Install
```shell
npm i -D @semrel-extra/npm
```

### Usage
`@semrel-extra/npm` is just a wrapper, so it inherits the API contract of [@semantic-release/npm](https://github.com/semantic-release/npm).
Follow [its docs](https://github.com/semantic-release/npm/blob/master/README.md):

| Step               | Description |
|--------------------|-------------|
| `verifyConditions` | Verify the presence of the `NPM_TOKEN` environment variable, or an `.npmrc` file, and verify the authentication method is valid. |
| `prepare`          | Update the `package.json` version and [create](https://docs.npmjs.com/cli/pack) the npm package tarball. |
| `addChannel`       | [Add a release to a dist-tag](https://docs.npmjs.com/cli/dist-tag). |
| `publish`          | [Publish the npm package](https://docs.npmjs.com/cli/publish) to the registry. |

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    ["@semrel-extra/npm", {
      ...
    }],
    ["@semantic-release/git", {
      "assets": ["package.json", "npm-shrinkwrap.json"]
    }]
  ]
}
```

### License
[MIT](./LICENSE)
