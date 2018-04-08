// utils/jsKits.js - JavaScript functions

/**
  getPropByIdentifer returns an object property by a string identifier.

  @param {Object} obj - an Object.
  @param {String} identifier - a string identifier, delimited by `.` (dot).
  @param {String} delimiter - delimiter for keys, default '.' (dot).
  @param {RegExp} discards - regular expression to discard, default `/\s+/g`.

  @return {Object} the object property by the identifier.

  @example <caption>First level identifier</caption>
  // returns 'v'
  getPropByIdentifer({a: 'v'}, 'a')

  @example <caption>Second level identifier</caption>
  // returns 'vv'
  getPropByIdentifer({a: {b: 'vv'}}, 'a.b')

  @example <caption>Deeper level identifier</caption>
  // setting a more complicate object
  let o = {
    a: {
      a1: {
        aa1: 'vvv', aa2: 'zzz'
      },
      a2: 'a2',
      a3: {
        aa1: { aaa3: 'a.a3.aa1.aaa3' },
        aa2: { aaa3: 'here' }
      }
    },
    b: { b1: { bb1: { bbb1: 'bbb1' } } }
  }
  // return 'zzz'
  getPropByIdentifer(o, 'a.a1.aa2')
  // return {aaa3: 'here'}
  getPropByIdentifer(o, 'a.a3.aa2')
  // return 'bbb1'
  getPropByIdentifer(o, 'b.b1.bb1.bbb1')
  // return undefined
  getPropByIdentifer(o, 'a.a3.aa5')

  @see https://lodash.com/docs/4.17.5#get
**/
export const getPropByIdentifer = (obj, identifier, delimiter = '.', discards = /\s+/g) => {
  if (obj instanceof Object) {
    let oLvl = obj
    let flat = String(identifier).replace(discards, '')
    let keys = flat.split(delimiter)
    // console.log('- keys:', keys)
    for (let key of keys) {
      // console.log(`-- ${identifier} [${key}]:`, JSON.stringify(oLvl, null, 2))
      if (oLvl instanceof Object !== true) {
        return undefined
      }
      oLvl = oLvl instanceof Array ? oLvl.slice(key)[0] : oLvl[key]
    }
    return oLvl
  }
  return undefined
}
