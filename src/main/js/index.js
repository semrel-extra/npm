const plugin = require('@semantic-release/npm')
const { castArray } = require('lodash')

let result

async function verifyConditionsHooked(pluginConfig, context) {
  // _.once
  if (result) {
    return result
  }

  // Options remapping
  if (context.options.publish) {
    const pluginConfig = castArray(context.options.publish).find((config) => config.path === '@semrel-extra/npm') || {}
    pluginConfig.path = '@semantic-release/npm'
  }

  result = plugin.verifyConditions(pluginConfig, context)

  return result
}

// reset `onced` for testing purpose
verifyConditionsHooked._reset = () => {
  result = undefined
}

module.exports = { ...plugin, verifyConditions: verifyConditionsHooked }
