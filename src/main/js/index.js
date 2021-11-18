const plugin = require('@semantic-release/npm')

let verified
let result

async function verifyConditionsHooked(...args) {
  if (verified) {
    return result
  }

  return plugin.verifyConditions(...args).then(r => {
    result = r
    verified = true
  })
}

verifyConditionsHooked._reset = () => {
  result = undefined
  verified = undefined
}

module.exports = { ...plugin, verifyConditions: verifyConditionsHooked }
