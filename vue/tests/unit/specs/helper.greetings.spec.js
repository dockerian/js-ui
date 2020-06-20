// tests/unit/specs/helper.greetings.spec.js

import * as helper from '@/helper/greetings'
import * as jsKits from '@/utils/jsKits'

describe('helper/greetings', () => {
  it(`helper/greetings`, () => {
    let langs = helper.greetings['langs']
    let texts = helper.greetings['hello']
    let langsKeys = Object.keys(langs)
    let textsKeys = Object.keys(texts)
    expect(langsKeys.length).toBeGreaterThanOrEqual(textsKeys.length)
    expect(jsKits.arrayContains(langsKeys, textsKeys))
  })
})
