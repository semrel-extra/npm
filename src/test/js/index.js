const sinon = require('sinon')
const { test } = require('uvu')
const assert = require('uvu/assert')
const plugin = require('../../main/js')
const realNpmPlugin = require('@semantic-release/npm')

test('prepare, publish, addChannel are re-exported as is', () => {
  assert.is(realNpmPlugin.addChannel, plugin.addChannel)
  assert.is(realNpmPlugin.publish, plugin.publish)
  assert.is(realNpmPlugin.prepare, plugin.prepare)
})

test('verifyConditions passes args down to `semrel/npm`', async () => {
  const mock = sinon.mock(realNpmPlugin)
  mock.expects('verifyConditions').once().withArgs('test').returns(Promise.resolve())

  await plugin.verifyConditions('test')

  mock.verify()
  mock.restore()
  plugin.verifyConditions._reset()
})

test('prevents multiple `verifyConditions` invocations', async () => {
  const mock = sinon.mock(realNpmPlugin)
  mock.expects('verifyConditions').once().withArgs('test').returns(Promise.resolve())

  await plugin.verifyConditions('test')
  await plugin.verifyConditions('test')

  mock.verify()
  mock.restore()
  plugin.verifyConditions._reset()
})

test.run()
