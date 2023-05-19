import { getCurrentSuite, setFn, createChainable } from 'vitest/suite'
import { expect, it } from 'vitest'

const withTransaction = createChainable(
  ['concurrent', 'skip', 'only', 'todo', 'fails'],
  function(name, runTest) {
    const task = getCurrentSuite().custom.call(this, name)
    const wrapped = (...args) => {
      runTest(...args)
    }
    setFn(task, wrapped)
  }
)

withTransaction('name1', () => {
  expect(1).toBe(2)
})
