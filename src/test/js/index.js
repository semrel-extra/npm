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
  const context = {options: {}}
  mock.expects('verifyConditions').once().withArgs('test', context).returns(Promise.resolve())

  await plugin.verifyConditions('test', context)

  mock.verify()
  plugin.verifyConditions._reset()
})

test('verifyConditions replaces context paths `', async () => {
  const mock = sinon.mock(realNpmPlugin)
  const context = {options: {publish: {path: '@semrel-extra/npm'}}}
  const _context = {options: {publish: {path: '@semantic-release/npm'}}}
  mock.expects('verifyConditions').once().withArgs('test', _context).returns(Promise.resolve())

  await plugin.verifyConditions('test', context)

  mock.verify()
  plugin.verifyConditions._reset()
})

test('prevents multiple `verifyConditions` invocations', async () => {
  const mock = sinon.mock(realNpmPlugin)
  const context = {options: {publish: {}}}
  mock.expects('verifyConditions').once().withArgs('test', context).returns(Promise.resolve())

  await plugin.verifyConditions('test', context)
  await plugin.verifyConditions('test', context)

  mock.verify()
  plugin.verifyConditions._reset()
})

test.run()
