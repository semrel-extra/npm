const plugin = require('@semantic-release/npm')
const { castArray } = require('lodash')

let result

async function verifyConditionsHooked(pluginConfig, context) {
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

verifyConditionsHooked._reset = () => {
  result = undefined
  verified = undefined
}

module.exports = { ...plugin, verifyConditions: verifyConditionsHooked }
