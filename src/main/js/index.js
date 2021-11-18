const plugin = require('@semantic-release/npm')
const { castArray } = require('lodash')

let verified
let result

async function verifyConditionsHooked(pluginConfig, context) {
  if (verified) {
    return result
  }

  // Options remapping
  if (context.options.publish) {
    const pluginConfig = castArray(context.options.publish).find((config) => config.path === '@semrel-extra/npm') || {}
    pluginConfig.path = '@semantic-release/npm'
  }

  return plugin.verifyConditions(pluginConfig, context).then(r => {
    result = r
    verified = true
  })
}

verifyConditionsHooked._reset = () => {
  result = undefined
  verified = undefined
}

module.exports = { ...plugin, verifyConditions: verifyConditionsHooked }
