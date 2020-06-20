// tests/unit/specs/helper.progress.spec.js

import * as helper from '@/helper/progress'

jest.useFakeTimers()

describe('helper/progress', () => {
  it(`helper/progress :: progressUpdate`, async (done) => {
    let x = 0
    let fncInterval = function () {
      x += 10
    }
    let hndInterval = setInterval(fncInterval, 25)
    let test = function () {
      let update = helper.progressUpdate(x, hndInterval)
      console.log(JSON.stringify(hndInterval))
      console.log(JSON.stringify(update))
      console.log(JSON.stringify(x))
    }

    await setTimeout(test, 100)
    await setTimeout(test, 500)

    let update1 = helper.progressUpdate(0, hndInterval)
    // console.log(JSON.stringify(hndInterval))
    // console.log(JSON.stringify(update1))
    // console.log(JSON.stringify(x))
    expect(update1.percentage).toBeGreaterThan(0)
    expect(x).toBeGreaterThanOrEqual(0)

    let update2 = helper.progressUpdate(100, hndInterval)
    // console.log(JSON.stringify(hndInterval))
    // console.log(JSON.stringify(update2))
    // console.log(JSON.stringify(x))
    expect(update2.percentage).toEqual(helper.progress.percent)
    expect(x).toBeGreaterThanOrEqual(0)

    done()
  })
})
