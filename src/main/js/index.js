const plugin = require('@semantic-release/npm')
const getPkg = require('@semantic-release/npm/lib/get-pkg');
const { castArray } = require('lodash')

let memo

async function verifyConditionsHooked(pluginConfig, context) {
  // _.once
  if (memo) {
    return memo
  }

  // Options remapping
  if (context.options.publish) {
    const pluginConfig = castArray(context.options.publish).find((config) => config.path === '@semrel-extra/npm') || {}
    pluginConfig.path = '@semantic-release/npm'
  }

  const _result = plugin.verifyConditions(pluginConfig, context)
  const pkg = await getPkg(pluginConfig, context)

  if (pluginConfig.npmPublish !== false && pkg.private !== true) {
    memo = _result
  }

  return _result
}

// reset `onced` for testing purpose
verifyConditionsHooked._reset = () => {
  memo = undefined
}

module.exports = { ...plugin, verifyConditions: verifyConditionsHooked }
