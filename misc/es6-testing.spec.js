// misc/kata-testing.spec.js
// - see https://jskatas.org/

/* eslint-disable */
const assert = require('assert')

function mapToArray(map) {
  return Array.from(map);
}

function assertMapsEqual(map1, map2) {
  assert.deepEqual(mapToArray(map1), mapToArray(map2));
}

// Array API
describe('Array API', () => {
  // Array.from
  describe('`Array.from` converts an array-like object or list into an Array', () => {
    const arrayLike = {0: 'one', 1: 'two', length: 2}
    it('call `Array.from` with an array-like object', function () {
      const arr = Array.from(arrayLike)
      assert.deepEqual(arr, ['one', 'two'])
    })
    it('a DOM node`s classList object can be converted', function () {
      const domNode = document.createElement('span')
      domNode.classList.add('some')
      domNode.classList.add('other')
      const classList = Array.from(domNode.classList)
      assert.equal('' + classList, '' + ['some', 'other'])
    })
    it('convert a NodeList to an Array and `filter()` works on it', function () {
      const nodeList = document.createElement('span')
      const divs = Array.from(nodeList).filter((node) => node.tagName === 'div')
      assert.deepEqual(divs.length, 0)
    })
    describe('custom conversion using a map function as second param', () => {
      it('we can modify the value before putting it in the array', function () {
        const arr = Array.from(arrayLike, (value) => value.toUpperCase())
        assert.deepEqual(arr, ['ONE', 'TWO'])
      })
      it('and we also get the object`s key as second parameter', function () {
        const arr = Array.from(arrayLike, (value, key) => `${key}=${value}`)
        assert.deepEqual(arr, ['0=one', '1=two'])
      })
    })
  })

  // Array.of
  describe('`Array.of` creates an array with the given arguments as elements', () => {
    it('dont mix it up with `Array(10)`, where the argument is the array length', () => {
      const arr = Array.of(10)
      assert.deepEqual(arr, [10])
    })
    it('puts all arguments into array elements', () => {
      const arr = Array.of(1, 2)
      assert.deepEqual(arr, [1, 2])
    })
    it('takes any kind and number of arguments', () => {
      const starter = [1, 2]
      const end = [3, '4']
      const arr = Array.of(starter, ...end)
      assert.deepEqual(arr, [[1, 2], 3, '4'])
    })
  })

  // Array.entries
  describe('`[].entries()` returns an iterator object with all entries', function () {
    it('returns key+value for each element', function () {
      const arr = ['a', 'b', 'c']
      const entriesAsArray = Array.from(arr.entries())
      assert.deepEqual(entriesAsArray, [[0, 'a'], [1, 'b'], [2, 'c']])
    })
    it('empty elements contain the value `undefined`', function () {
      const arr = ['one']
      arr[2] = 'three'
      const secondValue = Array.from(arr.entries())[1]
      assert.deepEqual(secondValue, [1, void 0])
    })
    describe('returns an iterable', function () {
      it('has `next()` to iterate', function () {
        const arr = ['one']
        const value = arr.entries().next().value
        assert.deepEqual(value, [0, 'one'])
      })
    })
  })

  // Array.prototype.entries
  describe('`[].entries()` returns an iterator object with all entries', function () {
    it('returns key+value for each element', function () {
      const arr = ['a', 'b', 'c']
      const entriesAsArray = Array.from(arr.entries())
      assert.deepEqual(entriesAsArray, [[0, 'a'], [1, 'b'], [2, 'c']])
    })
    it('empty elements contain the value `undefined`', function () {
      const arr = ['one']
      arr[2] = 'three'
      const secondValue = Array.from(arr.entries())[1]
      assert.deepEqual(secondValue, [1, void 0])
    })
    describe('returns an iterable', function () {
      it('has `next()` to iterate', function () {
        const arr = ['one']
        const value = arr.entries().next().value
        assert.deepEqual(value, [0, 'one'])
      })
    })
  })

  // Array.prototype.fill
  describe('`Array.prototype.fill` can fill up an array with one value', () => {
    it('`fill(0)` will populate `0` into each array element', function () {
      const arr = new Array(3).fill(0)
      assert.deepEqual(arr, [0, 0, 0])
    })
    it('fill only changes content, adds no new elements', function () {
      const arr = [].fill()
      assert.deepEqual(arr, [])
    })
    it('second parameter to `fill()` is the position where to start filling', function () {
      const fillPosition = 2
      const arr = [1, 2, 3].fill(42, fillPosition)
      assert.deepEqual(arr, [1, 2, 42])
    })
    it('third parameter is the position where filling stops', function () {
      const fillStartAt = 1
      const fillEndAt = 2
      const arr = [1, 2, 3].fill(42, fillStartAt, fillEndAt)
      assert.deepEqual(arr, [1, 42, 3])
    })
  })

  // Array.prototype.find
  describe('`Array.prototype.find` makes finding items in arrays easier', () => {
    it('takes a compare function', function () {
      const found = [true].find((a) => a === true)
      assert.equal(found, true)
    })
    it('returns the first value found', function () {
      const found = [2, 1].find(item => item > 1)
      assert.equal(found, 2)
    })
    it('returns `undefined` when nothing was found', function () {
      const found = [1, 2, 3].find(item => item === 20)
      assert.equal(found, void 0)
    })
    it('combined with destructuring complex compares become short', function () {
      const bob = {name: 'Bob'}
      const alice = {name: 'Alice'}
      const found = [bob, alice].find(({name}) => name === 'Alice')
      assert.equal(found, alice)
    })
  })

  // Array.prototype.findIndex
  describe('`Array.prototype.findIndex` makes finding items in arrays easier', () => {
    it('takes a compare function, returns the index where it returned true', function () {
      const foundAt = [false, true].findIndex(a => a === true)
      assert.equal(foundAt, 1)
    })
    it('returns the first position it was found at', function () {
      const foundAt = [0, 1, 1, 1].findIndex(item => item === 1)
      assert.equal(foundAt, 1)
    })
    it('returns `-1` when nothing was found', function () {
      const foundAt = [1, 2, 3].findIndex(item => item < 1)
      assert.equal(foundAt, -1)
    })
    it('the findIndex callback gets the item, index and array as arguments', function () {
      const three = 3
      const containsThree = arr => arr.indexOf(three) > -1
      function theSecondThree (item, index, arr) {
        const a = arr.slice(0, index)
        return containsThree(a) && item === three
      }
      const foundAt = [1, 1, 2, 3, 3, 3].findIndex(theSecondThree)
      assert.equal(foundAt, 4)
    })
    it('combined with destructuring complex compares become short', function () {
      const bob = {name: 'Bob'}
      const alice = {name: 'Alice'}
      const foundAt = [bob, alice].findIndex(({name: {length: l}}) => l > 3)
      assert.equal(foundAt, 1)
    })
  })

  // Array.prototype.keys
  describe('`Array.prototype.keys` returns an iterator for all keys in the array', () => {
    it('`keys()` returns an iterator', function () {
      const arr = ['a', 'b']
      const iterator = arr.keys()
      assert.deepEqual(iterator.next(), {value: 0, done: false})
      iterator.next()
      assert.deepEqual(iterator.next(), {value: void 0, done: true})
    })
    it('gets all keys', function () {
      const arr = ['a', 'b', 'c']
      const keys = Array.from(arr.keys())
      assert.deepEqual(keys, [0, 1, 2])
    })
    it('empty array contains no keys', function () {
      const arr = []
      const keys = [...arr.keys()]
      assert.equal(keys.length, 0)
    })
    it('a sparse array without real values has keys though', function () {
      const arr = [,,] // eslint-disable-line
      const keys = [...arr.keys()]
      assert.deepEqual(keys, [0, 1])
    })
    it('also includes holes in sparse arrays', function () {
      const arr = ['a',,'c'] // eslint-disable-line
      const keys = [...arr.keys()]
      assert.deepEqual(keys, [0, 1, 2])
    })
  })

  // Array.prototype.values
  describe('`Array.prototype.values` returns an iterator for all values in the array', () => {
    it('`values()` returns an iterator', function () {
      const arr = ['k', 'e', 'y']
      const iterator = arr.values()
      iterator.next()
      iterator.next()
      iterator.next()
      assert.deepEqual(iterator.next(), {value: void 0, done: true})
    })
    it('use `iterator.next()` to drop first value', function () {
      const arr = ['keys', 'values', 'entries']
      const iterator = arr.values()
      iterator.next()
      assert.deepEqual([...iterator], ['values', 'entries'])
    })
    it('empty array contains no values', function () {
      const arr = [...[...[...[...[]]]]]
      const values = [...arr.values()]
      assert.equal(values.length, 0)
    })
    it('a sparse array without real values has values though', function () {
      const arr = [,,] // eslint-disable-line
      const keys = [...arr.values()]
      assert.deepEqual(keys, [void 0, void 0])
    })
    it('also includes holes in sparse arrays', function () {
      const arr = ['a',,'c'] // eslint-disable-line
      assert.deepEqual([...arr.values()], ['a', void 0, 'c'])
    })
  })

  // Array.sort
  describe('`[].sort()` sorts an array using each value as a string', function () {
    it('is a function on the array prototype', function () {
      const theType = 'function'
      assert.equal(typeof [].sort, theType)
    })
    describe('sorts characters', function () {
      it('in alphabetical order', function () {
        const sorted = ['b', 'a'].sort()
        assert.deepEqual(sorted, ['a', 'b'])
      })
      it('upper case characters come first', function () {
        const sorted = ['B', 'C', 'a']
        assert.deepEqual(['B', '\u{61}', 'C'].sort(), sorted)
      })
      it('depending on their position in the unicode table', function () {
        const sorted = ['+', '*', '(', ')'].sort()
        assert.deepEqual(sorted, ['(', ')', '*', '+'])
      })
      it('unicode characters depending on their code point', function () {
        const grinningFace = '\u{1F601}'
        const grinningEyes = '\u{1F603}'
        const withTears = '\u{1F602}'
        const smilies = [grinningFace, grinningEyes, withTears]
        assert.deepEqual(smilies.sort(), [grinningFace, '\u{1F602}', grinningEyes])
      })
    })
    describe('sorts strings', function () {
      it('considering the string from start to end', function () {
        const sortedResult = ['Ba', 'aa']
        assert.deepEqual(['aa', 'Ba'].sort(), sortedResult)
      })
      it('shorter strings go to front', function () {
        const balls = ['Ball', 'Balls', 'bald'].sort()
        assert.deepEqual(balls, ['Ball', 'Balls', 'bald'])
      })
    })
    describe('sorts numbers as if they were strings', function () {
      it('`1` and `2` are sorted as expected', function () {
        const numbers = [3, 4, 2, 1, 5]
        assert.deepEqual(numbers.sort(), [1, 2, 3, 4, 5])
      })
      it('see multi digit numbers as strings!', function () {
        const sortedNumbers = [1, 11, 2]
        assert.deepEqual([1, 2, 11].sort(), sortedNumbers)
      })
    })
  })

  // Array.sort (with a compare function)
  describe('`[].sort()` can take a compare function', function () {
    describe('the compare function', function () {
      it('can be given as the only parameter to `sort()` (and gets used by it)', function () {
        let compareFunctionUsed
        const compare = () => { compareFunctionUsed = true };
        [2, 1].sort(compare)
        assert.equal(compareFunctionUsed, true)
      })
      it('is called with two values to be compared', function () {
        let parameters = [1, 2]
        const compare = (...args) => { return parameters === arguments };
        [2, 1].sort(compare)
        assert.ok(parameters.includes(1))
        assert.ok(parameters.includes(2))
      })
      it('is called multiple times (depending how the sort algorithm is implemented)', function () {
        let callCount = 0
        const compare = () => { callCount += 1 };
        [3, 1, 2].sort(compare)
        assert.ok(callCount > 1)
      })
      describe('the return value of the compare function indicates how the two values compare', function () {
        describe('both compared values match, they are the same', function () {
          it('when it returns 0', function () {
            const compare = () => 0
            assert.deepEqual([2, 1, 3].sort(compare), [2, 1, 3])
          })
          it('when `undefined` is returned', function () {
            const compare = () => { return 1 }
            assert.deepEqual([42, 23, Math.PI].sort(compare), [42, 23, Math.PI])
          })
          it('when `null` is returned', function () {
            const compare = () => { return '23' }
            assert.deepEqual(['1', 'a', 2].sort(compare), ['1', 'a', 2])
          })
        })
      })
    })
    describe('examples', function () {
      it('sort numbers', function () {
        const numericCompare = (a, b) => a - b
        assert.deepEqual([1, 11, 2].sort(numericCompare), [1, 2, 11])
      })
      it('sort number-like values', function () {
        const ensuredNumericCompare = (a, b) => { return parseInt(a) - parseInt(b) }
        assert.deepEqual(['1', '23', 2, ' 3 '].sort(ensuredNumericCompare), ['1', 2, ' 3 ', '23'])
      })
      it('custom compare algorithm', function () {
        const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May']
        const monthCompare = (a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b)
        assert.deepEqual(['May', 'Apr', 'Feb'].sort(monthCompare), ['Feb', 'Apr', 'May'])
      })
    })
  })
})

// Class
describe('Class API', () => {
  // class - creation
  describe('Class creation', () => {
    it('is as simple as `class XXX {}`', function () {
      class TestClass {};
      const instance = new TestClass()
      assert.equal(typeof instance, 'object')
    })
    it('a class is block scoped', () => {
      class Outter {}; // eslint-disable-line
      { class Inside {} }; // eslint-disable-line
      assert.equal(typeof Inside, 'undefined')
    })
    it('the `constructor` is a special method', function () {
      class User {
        constructor (id) {
          this.id = id
        }
      }
      const user = new User(42)
      assert.equal(user.id, 42)
    })
    it('defining a method by writing it inside the class body', function () {
      class User {
        writesTests () { return false }
      }
      const notATester = new User()
      assert.equal(notATester.writesTests(), false)
    })
    it('multiple methods need no commas (opposed to object notation)', function () {
      class User {
        wroteATest () { this.everWroteATest = true }
        isLazy () { return !this.everWroteATest }
      }
      const tester = new User()
      assert.equal(tester.isLazy(), true)
      tester.wroteATest()
      assert.equal(tester.isLazy(), false)
    })
    it('anonymous class', () => {
      const classType = typeof {}
      assert.equal(classType, 'object')
    })
  })

  // class - accessors
  describe('Class accessors (getter and setter)', () => {
    it('a getter is defined like a method prefixed with `get`', () => {
      class MyAccount {
        get balance () { return Infinity }
      }
      assert.equal(new MyAccount().balance, Infinity)
    })
    it('a setter has the prefix `set`', () => {
      class MyAccount {
        get balance () { return this.amount }
        set balance (amount) { this.amount = amount }
      }
      const account = new MyAccount()
      account.balance = 23
      assert.equal(account.balance, 23)
    })

    describe('dynamic accessors', () => {
      it('a dynamic getter name is enclosed in `[]`', function () {
        const balance = 'yourMoney'
        class YourAccount {
          get [balance] () { return -Infinity }
        }
        assert.equal(new YourAccount().yourMoney, -Infinity)
      })
      it('a dynamic setter name as well', function () {
        const propertyName = 'balance'
        class MyAccount {
          get [propertyName] () { return this.amount }
          set [propertyName] (amount) { this.amount = 23 }
        }
        const account = new MyAccount()
        account.balance = 23
        assert.equal(account.balance, 23)
      })
    })
  })

  // class - static keyword
  describe('Inside a class you can use the `static` keyword', () => {
    describe('for methods', () => {
      class UnitTest {}
      it('a static method just has the prefix `static`', () => {
        class TestFactory {
          makeTest () { return new UnitTest() }
        }
        assert.ok(new TestFactory().makeTest() instanceof UnitTest)
      })
      it('the method name can be dynamic/computed at runtime', () => {
        const methodName = 'createTest'
        class TestFactory {
          static [methodName] () { return new UnitTest() }
        }
        assert.ok(TestFactory.createTest() instanceof UnitTest)
      })
    })
    describe('for accessors', () => {
      it('a getter name can be static, just prefix it with `static`', () => {
        class UnitTest {
          static get testType () { return 'unit' }
        }
        assert.equal(UnitTest.testType, 'unit')
      })
      it('even a static getter name can be dynamic/computed at runtime', () => {
        const type = 'test' + 'Type'
        class IntegrationTest {
          static get [type] () { return 'integration' }
        }
        assert.ok('testType' in IntegrationTest)
        assert.equal(IntegrationTest.testType, 'integration')
      })
    })
  })

  // class - extends
  describe('Classes can inherit from another using `extends`', () => {
    describe('the default super class is `Object`', () => {
      it('a `class A` is an instance of `Object`', () => {
        class A {}
        assert.equal(new A() instanceof Object, true)
      })
      it('when B extends A, B is also instance of `Object`', () => {
        class A {}
        class B extends A {}
        assert.equal(new B() instanceof A, true)
        assert.equal(new B() instanceof Object, true)
      })
      it('a class can extend `null`, and is not an instance of Object', () => {
        // roughly the same as that of Object.create(null).
        // something which doesn't inherit from Object.prototype.
        class NullClass extends null {
          constructor () {
            super() // eslint-disable-line
            let _this = Object.create(new.target.prototype)
            return _this
          }
        }
        let nullInstance = new NullClass()
        assert.equal(nullInstance instanceof Object, false)
      })
    })
    describe('instance of', () => {
      it('when B inherits from A, `new B()` is also an instance of A', () => {
        class A {};
        class B extends A {}
        assert.equal(new B() instanceof A, true)
      })
      it('extend over multiple levels', () => {
        class A {}
        class B extends A {}
        class C extends B {}
        assert.equal(new C() instanceof A, true)
      })
    })
  })

  // class - extends (more)
  // see https://tddbin.com/#?kata=es6/language/class/more-extends
  describe('Classes can inherit from another', () => {
    it('extend an `old style` "class", a function, still works', () => {
      let A = function () {}
      class B extends A {}
      assert.equal(new B() instanceof A, true)
    })

    describe('prototypes are as you know them', () => {
      class A {}
      class B extends A {}
      it('A is the prototype of B', () => {
        const isIt = A.isPrototypeOf(B)
        assert.equal(isIt, true)
      })
      it('A`s prototype is also B`s prototype', () => {
        const proto = B.prototype
        assert.equal(A.prototype.isPrototypeOf(proto), true)
      })
    })
  })

  // class - super inside a method
  describe('Inside a class use `super` to access parent methods', () => {
    it('use of `super` without `extends` fails (already when transpiling)', () => {
      class A { hasSuper () { return super.prototype === null }}
      assert.equal(new A().hasSuper(), false)
    })
    it('`super` with `extends` calls the method of the given name of the parent class', () => {
      class A {hasSuper () { return true }}
      class B extends A {hasSuper () { return super.hasSuper() }}
      assert.equal(new B().hasSuper(), true)
    })
    it('when overridden a method does NOT automatically call its super method', () => {
      class A {hasSuper () { return true }}
      class B extends A {hasSuper () { return null }}
      assert.equal(new B().hasSuper(), void 0)
    })
    it('`super` works across any number of levels of inheritance', () => {
      class A {iAmSuper () { return true }}
      class B extends A {}
      class C extends B {iAmSuper () { return super.iAmSuper() }}
      assert.equal(new C().iAmSuper(), true)
    })
    it('accessing an undefined member of the parent class returns `undefined`', () => {
      class A {}
      class B extends A {getMethod () { return super.constructors }}
      assert.equal(new B().getMethod(), void 0)
    })
  })

  // class - super in constructor
  describe('Inside a class`s constructor `super()` can be used', () => {
    it('`extend` a class and use `super()` to call the parent constructor', () => {
      class A {constructor () { this.levels = 1 }}
      class B extends A {
        constructor () {
          super()
          this.levels++
        }
      }
      assert.equal(new B().levels, 2)
    })
    it('`super()` may also take params', () => {
      class A {constructor (startValue = 1, addTo = 1) { this.counter = startValue + addTo }}
      class B extends A {
        constructor (...args) {
          super(...args)
          this.counter++
        }
      }
      assert.equal(new B(42, 2).counter, 45)
    })
    it('it is important where you place your `super()` call!', () => {
      class A {inc () { this.countUp = 1 }}
      class B extends A {
        inc () {
          this.countUp = 2
          super.inc()
          return this.countUp
        }
      }
      assert.equal(new B().inc(), 1)
    })
    it('use `super.constructor` to find out if there is a parent constructor', () => {
      class ParentClassA {constructor () { 'parent' }}
      class B extends ParentClassA {
        constructor () {
          super()
          this.isTop = '' + super.constructor
        }
      }
      assert.ok(new B().isTop.includes('ParentClassA'))
    })
  })
})

// Destructuring
describe('Destructuring', () => {
  // Array - destructuring
  describe('Destructuring arrays makes shorter code', () => {
    it('extract value from array, e.g. extract 0 into x like so `let [x] = [0];`', () => {
      let [firstValue] = [1]
      assert.strictEqual(firstValue, 1)
    })
    it('get the last item from array', () => {
      let [,, lastValue] = [1, 2, 3]
      assert.strictEqual(lastValue, 3)
    })
    it('swap two variables, in one operation', () => {
      let [x, y] = ['ax', 'why'];
      [y, x] = [x, y]
      assert.deepEqual([x, y], ['why', 'ax'])
    })
    it('leading commas', () => {
      const all = ['ax', 'why', 'zet']
      const [,, z] = all
      assert.equal(z, 'zet')
    })
    it('extract from nested arrays', () => {
      const user = [['Some', 'One'], 23]
      const [[firstName, surname], age] = user
      const expected = 'Some One = 23 years'
      assert.equal(`${firstName} ${surname} = ${age} years`, expected)
    })
    it('chained assignments', () => {
      let c, d
      let [a, b] = [c, d] = [1, 2]
      assert.deepEqual([a, b, c, d], [1, 2, 1, 2])
    })
    it('in for-of loop', () => {
      for (var [, a, b] of [[0, 1, 2]]) {}
      assert.deepEqual([a, b], [1, 2])
    })
  })

  // Object - destructuring
  describe('Destructure objects', () => {
    it('by surrounding the left-hand variable with `{}`', () => {
      const {x} = {x: 1}
      assert.equal(x, 1)
    })
    describe('nested', () => {
      it('multiple objects', () => {
        const magic = {first: 23, second: 42}
        const {magic: {second}} = {magic}
        assert.equal(second, 42)
      })
      it('object and array', () => {
        const {z: [, x]} = {z: [23, 42]}
        assert.equal(x, 42)
      })
      it('array and object', () => {
        const [, [{lang}]] = [null, [{env: 'browser', lang: 'ES6'}]]
        assert.equal(lang, 'ES6')
      })
    })
    describe('interesting', () => {
      it('missing refs become undefined', () => {
        const {z: {z}} = {x: 1, z: 2}
        assert.equal(z, void 0)
      })
      it('destructure from builtins (string)', () => {
        const {substr} = '1'
        assert.equal(substr, String.prototype.substr)
      })
    })
  })

  // String - destructuring
  describe('Destructuring also works on strings', () => {
    it('destructure every character, just as if the string was an array', () => {
      // eslint-disable-next-line
      let [a, b, c] = 'abc' // eslint-disable-line no-unused-vars
      assert.deepEqual([a, b, c], ['a', 'b', 'c'])
    })
    it('missing characters are undefined', () => {
      // eslint-disable-next-line
      let [a, b, c] = 'ab' // eslint-disable-line no-unused-vars
      assert.deepEqual(['a', 'b'], [a, b])
      assert.equal(c, void 0)
    })
    it('unicode character work too', () => {
      // eslint-disable-next-line
      let [, space, coffee] = 'a ☕' // eslint-disable-line no-unused-vars
      assert.equal(coffee, '\u{2615}')
      assert.equal(space, ' ')
    })
  })
})

describe('Destructuring (more)', () => {
  // destructuring (default value)
  describe('When destructuring you can also provide default values', () => {
    it('just assign a default value, like so `a=1`', () => {
      const [a = 1] = []
      assert.equal(a, 1)
    })
    it('for a missing value', () => {
      const [,b=2,] = [1,,3]; // eslint-disable-line
      assert.equal(b, 2)
    })
    it('in an object', () => {
      const {a, b=2} = {a: 1}; // eslint-disable-line
      assert.equal(a, 1)
      assert.equal(b, 2)
    })
    it('if the value is undefined', () => {
      const {a, b = 2} = {a: 1, b: void 0}
      assert.strictEqual(b, 2)
    })
    it('also a string works with defaults', () => {
      const [a, b = 2] = '1'
      assert.equal(a, '1')
      assert.equal(b, 2)
    })
  })

  // destructuring - assign
  describe('Assign object property values to new variables while destructuring', () => {
    describe('for simple objects', function () {
      it('use a colon after the property name, like so `propertyName: newName`', () => {
        const {x: y} = {x: 1}
        assert.equal(y, 1)
      })
      it('assign a new name and give it a default value using `= <default value>`', () => {
        const {x: y = 42} = {y: 23}
        assert.equal(y, 42)
      })
    })
    describe('for function parameter names', function () {
      it('do it the same way, with a colon behind it', () => {
        const fn = ({x: y}) => {
          assert.equal(y, 1)
        }
        fn({x: 1})
      })
      it('giving it a default value is possible too, like above', () => {
        const fn = ({x: y = 3}) => {
          assert.equal(y, 3)
        }
        fn({})
      })
    })
  })

  // destructuring - parameters
  describe('Destructuring function parameters', () => {
    describe('destruct parameters', () => {
      it('multiple params from object', () => {
        const fn = ({id, name}) => {
          assert.equal(id, 42)
          assert.equal(name, 'Wolfram')
        }
        const user = {name: 'Wolfram', id: 42}
        fn(user)
      })
      it('multiple params from array/object', () => {
        const fn = ([, {name}]) => {
          assert.equal(name, 'Alice')
        }
        const users = [{name: 'nobody'}, {name: 'Alice', id: 42}]
        fn(users)
      })
    })
    describe('default values', () => {
      it('for simple values', () => {
        const fn = ({id, name = 'Bobby'}) => {
          assert.strictEqual(id, 23)
          assert.strictEqual(name, 'Bob')
        }
        fn({id: 23, name: 'Bob'})
      })
      it('for a missing array value', () => {
        const defaultUser = {id: 23, name: 'Joe'}
        const fn = ([user = defaultUser]) => {
          assert.deepEqual(user, defaultUser)
        }
        fn([])
      })
      it('mix of parameter types', () => {
        const fn = (id = 1, [arr = 2] = [], {obj = 3} = {}) => {
          assert.equal(id, 1)
          assert.equal(arr, 2)
          assert.equal(obj, 3)
        }
        fn(void 0, [], {})
      })
    })
  })
})

// Generator
describe('Generator', () => {
  // Generator - creation
  describe('Generators can be created in multiple ways', function () {
    it('the most common way is by adding `*` after `function`', function () {
      function * g () {}
      assertIsGenerator(g())
    })
    it('as a function expression, by adding a `*` after `function`', function () {
      let g = function * () {}
      assertIsGenerator(g())
    })
    it('inside an object by prefixing the function name with `*`', function () {
      let obj = {
        * g () {}
      }
      assertIsGenerator(obj.g())
    })
    it('computed generator names, are just prefixed with a `*`', function () {
      const generatorName = 'g'
      let obj = {
        * [generatorName] () {}
      }
      assertIsGenerator(obj.g())
    })
    it('inside a class the same way', function () {
      const generatorName = 'g'
      class Klazz {
        * [generatorName] () {}
      }
      assertIsGenerator(new Klazz().g())
    })

    function assertIsGenerator (gen) {
      const toStringed = '' + gen
      assert.equal(toStringed, '[object Generator]')
    }
  })

  // Generator - iterator
  describe('Generators returns an iterable object', function () {
    function * generatorFunction () {
      yield 1
      yield 2
    }
    let generator
    beforeEach(() => {
      generator = generatorFunction()
    })
    it('a generator returns an object', function () {
      const typeOfTheGenerator = 'object'
      assert.equal(typeof generator, typeOfTheGenerator)
    })
    it('a generator object has a key `Symbol.iterator`', function () {
      const key = Symbol.iterator
      assert.equal(key in generator, true)
    })
    it('the `Symbol.iterator` is a function', function () {
      const theType = typeof generator[Symbol.iterator]
      assert.equal(theType, 'function')
    })
    it('can be looped with `for-of`, which expects an iterable', function () {
      function * iterateForOf () {
        for (let value of {}) {
          console.log(value) // no statements needed
        }
      }
      assert.doesNotThrow(iterateForOf)
    })
  })

  // Generator - yield expression
  describe('Generator - `yield` is used to pause and resume a generator function', () => {
    function * generatorFunction () {
      yield 'hello'
      yield 'world'
    }
    let generator

    beforeEach(function () {
      generator = generatorFunction()
    })
    it('converting a generator to an array (using `Array.from`) resumes the generator until all values are received', () => {
      let values = Array.from(generator)
      assert.deepEqual(values, ['hello', 'world'])
    })
    describe('after the first `generator.next()` call', function () {
      it('the value is "hello"', function () {
        const {value} = generator.next()
        assert.equal(value, 'hello')
      })
      it('and `done` is false', function () {
        const {done} = generator.next()
        assert.equal(done, false)
      })
    })
    describe('after the second `next()` call', function () {
      let first, secondItem
      beforeEach(function () {
        first = generator.next()
        secondItem = generator.next()
      })
      it('`value` is "world"', function () {
        let {value} = secondItem
        assert.equal(first.value, 'hello')
        assert.equal(value, 'world')
      })
      it('and `done` is still false', function () {
        const {done} = secondItem
        assert.equal(done, false)
      })
    })
    describe('after stepping past the last element, calling `next()` that often', function () {
      it('`done` property equals true, since there is nothing more to iterator over', function () {
        generator.next()
        generator.next()
        let {done} = generator.next()
        assert.equal(done, true)
      })
    })
  })

  // Generator - send value to a generator
  describe('Pass a value to a generator', () => {
    it('basics: get the values from a generator in two ways', function () {
      function * generatorFunction () {
        yield 1
        yield 2
      }
      // way #1
      var convertedToAnArray = Array.from(generatorFunction())
      // way #2
      var iterator = generatorFunction()
      var iteratedOver = [iterator.next().value, iterator.next().value]
      assert.deepEqual(convertedToAnArray, iteratedOver)
    })
    it('pass a value to the iterator', function () {
      function * generatorFunction (param) {
        yield 1
        yield param
      }
      var iterator = generatorFunction(2)
      var iteratedOver = [iterator.next().value, iterator.next().value]
      assert.deepEqual([1, 2], iteratedOver)
    })
    it('a value passed to the 1st `next()` call is ignored', function () {
      function * generatorFunction (param) {
        yield 1
        yield param
      }
      let iterator = generatorFunction(2)
      const values = [
        iterator.next('irrelevant').value,
        iterator.next('second').value
      ]
      assert.deepEqual(values, [1, 2])
    })
  })

  // Generator - send function to a generator
  describe('Pass a function to a generator', () => {
    it('the generator can receive a function as a value', function () {
      let fn = function () {}
      function * generatorFunction (fn) {
        assert.equal(yield null, fn) // remember, don't touch this line
      }
      let iterator = generatorFunction()
      iterator.next()
      iterator.next()
    })
    it('pass a function to the iterator, which calls it', function () {
      let fn = function () { return 2 }
      function * generatorFunction (fn) {
        yield fn(yield 1)
      }
      var iterator = generatorFunction(fn)
      var iteratedOver = [iterator.next().value, iterator.next().value]
      assert.deepEqual([1, 2], iteratedOver)
    })
    it('nesting yielded function calls', function () {
      let fn = function () {
        fn.x = fn.x || 0
        return ++fn.x
      }
      function * generatorFunction (fn) {
        yield fn(yield fn(yield fn()))
      }
      var iterator = generatorFunction(fn)
      var iteratedOver = Array.from(iterator)
      assert.deepEqual([1, 2, 3], iteratedOver)
    })
  })

  // Generator - `return` inside a generator is special
  describe('`return` in a generator function is special', function () {
    describe('the returned value is an IteratorResult (just like any value returned via `yield`)', function () {
      it('returns an IteratorResult (an object with the properties `value` and `done`)', function () {
        function * generatorFunction () { return 1 }
        const returned = generatorFunction().next()
        const propertyNames = ['value', 'done']
        assert.deepEqual(Object.keys(returned), propertyNames)
      })
      it('the property `value` is the returned value', function () {
        function * generatorFunction () { return 23 }
        const {value} = generatorFunction().next()
        assert.equal(value, 23)
      })
      it('the property `done` is true', function () {
        function * generatorFunction () { return 42 }
        const {done} = generatorFunction().next()
        assert.equal(done, true)
      })
      it('NOTE: `yield` does not return `done=true` but `done=false`!', function () {
        function * generatorFunction () { yield 1; return 1 }
        const returned = generatorFunction().next()
        assert.deepEqual(returned, {value: 1, done: false})
      })
      it('a missing `return` returns `{value: undefined, done: true}`', function () {
        function * generatorFunction () { }
        const returned = generatorFunction().next()
        assert.deepEqual(returned, {value: void 0, done: true})
      })
    })

    describe('mixing `return` and `yield`', function () {
      function * generatorFunctionWithYieldAndReturn () {
        yield 1
        return 2
      }
      it('is possible', function () {
        const iterator = generatorFunctionWithYieldAndReturn()
        const values = [
          iterator.next(),
          iterator.next()
        ]
        assert.deepEqual(values, [{value: 1, done: false}, {value: 2, done: true}])
      })
      it('the mix behaves different to two `yield`s', function () {
        const iterator = generatorFunctionWithYieldAndReturn()
        const values = [1]
        assert.deepEqual(Array.from(iterator), values)
      })
      it('two `yield`s returning values', function () {
        function * generatorFunctionWithTwoYields () {
          yield 1
          yield 2
        }
        assert.deepEqual(Array.from(generatorFunctionWithTwoYields()), [1, 2])
      })
      it('return a yielded value by "chaining" `return` and `yield`', function () {
        function * generatorFunction () {
          return (yield 1)
        }
        const iterator = generatorFunction()
        const values = [
          iterator.next().value,
          iterator.next(2).value
        ]
        assert.deepEqual(values, [1, 2])
      })
    })
  })
})

// Iterator
// The iterator protocol defines a standard way to produce a sequence of values,
// either finite or infinite. Read more at
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
describe('Iterator', () => {
  // Iterator/iterable - array
  describe('The native array is a built-in iterable object', function() {
    const arr = ['a', 'B', 'see'];
    describe('the iterator', function() {
      it('an array has an iterator, which is a function', function() {
        const iterator = arr[Symbol.iterator];
        const theType = typeof iterator;
        const expected = 'function';
        assert.equal(theType, expected);
      });
      it('can be looped with `for-of`, which expects an iterable', function() {
        let count = 0;
        for (let value of arr) {
          count++;
        }
        assert.equal(count, arr.length);
      });
    });
    describe('the iterator protocol', function() {
      it('calling `next()` on an iterator returns an object according to the iterator protocol', function() {
        const iterator = arr[Symbol.iterator]();
        const firstItem = iterator.next();
        assert.deepEqual(firstItem, {done: false, value: 'a'});
      });
      it('the after-last element has done=true', function() {
        const arr = [];
        const iterator = arr[Symbol.iterator]();
        const afterLast = iterator.next();
        assert.deepEqual(afterLast, {done: true, value: void 0});
      });
    });
  });

  // Iterator/iterable - string
  describe('The native string is a built-in iterable object', function() {

    const s = 'abc';

    describe('string is iterable', function() {
      it('the string`s object key `Symbol.iterator` is a function', function() {
        const isA = typeof s[Symbol.iterator];
        assert.equal(isA, 'function');
      });
      it('use `Array.from()` to make an array out of any iterable', function(){
        const arr = Array.from(s);
        assert.deepEqual(arr, ['a', 'b', 'c']);
      });
    });

    describe('a string`s iterator', function() {
      let iterator;
      beforeEach(function() {
        iterator = s[Symbol.iterator]();
      });
      it('has a special string representation', function(){
        const description = iterator.toString();
        assert.equal(description, '[object String Iterator]');
      });
      it('`iterator.next()` returns an object according to the iterator protocol', function(){
        const value = iterator.next();
        assert.deepEqual(value, {done: false, value: 'a'});
      });
      it('the after-last call to `iterator.next()` says done=true, no more elements', function(){
        iterator.next();
        iterator.next();
        iterator.next();

        assert.equal(iterator.next().done, true);
      });
    });
  });

  // Iterator - custom
  describe('A simple iterable without items inside, implementing the right protocol', () => {

    function * iteratorFunction() {}

    describe('the `iteratorFunction` needs to comply to the iterator protocol', function() {
      it('must return an object', function() {
        assert.equal(typeof iteratorFunction(), 'object');
      });
      it('the object must have a function assigned to a key `next`', function() {
        assert.equal(typeof iteratorFunction().next, 'function');
      });
      it('calling `next()` must return an object with `{done: true}`', function() {
        var next = iteratorFunction().next()
        assert.deepEqual({done: next.done}, {done: true});
      });
    });

    let iterable;
    beforeEach(function() {
      iterable = function * () {};
    });

    describe('the iterable', function() {
      it('must be an object', function() {
        assert.equal(typeof iterable(), 'object');
      });
      it('must have the iterator function assigned to the key `Symbol.iterator`', function() {
        assert.equal(iterable[Symbol.iterator], iteratorFunction[Symbol.iterator]);
      });
    });
    describe('using the iterable', function() {
      it('it contains no values', function() {
        let values;
        for (let value of iterable()) {
          values += value;
        }
        assert.equal(values, void 0);
      });
      it('has no `.length` property', function() {
        const hasLengthProperty = iterable().hasOwnProperty('length');
        assert.equal(hasLengthProperty, false);
      });
      describe('can be converted to an array', function() {
        it('using `Array.from()`', function() {
          const arr = Array.from(iterable);
          assert.equal(Array.isArray(arr), true);
        });
        it('where `.length` is still 0', function() {
          const arr = iterable;
          const length = arr.length;
          assert.equal(length, 0);
        });
      });
    });
  });


})

// Map
describe('Map', () => {
  // Map - basics
  describe('`Map` is a key/value map', function(){
    it('`Map` is a new global constructor function', function() {
      const typeOfMap = 'function';
      assert.equal(typeof Map, typeOfMap);
    });
    it('provides `new Map().set()` to add key+value pair, `get()` to read it by key', function() {
      let map = new Map();
      map.set('key', 'value');
      const value = map.get('key');
      assert.equal(value, 'value');
    });
    it('`has()` tells if map has the given key', function() {
      let map = new Map();
      map.set('key', 'value');
      const hasIt = map.has('key');
      assert.equal(hasIt, true);
    });
    it('a map is iterable', function() {
      let map = new Map();
      map.set('1', 'one');
      map.set('2', 'two');
      const mapAsArray = Array.from(map); // hint: kata #29 http://tddbin.com/#?kata=es6/language/array-api/from
      assert.deepEqual(mapAsArray, [['1', 'one'], ['2', 'two']]);
    });
    it('complex types can be keys', function() {
      const obj = {x: 1};
      const otherObj = {x: 1};
      let map = new Map();
      map.set(obj, otherObj);
      map.set(otherObj, 'other object');
      assert.equal(map.has(otherObj), true);
    });
  });

  // Map - initialize
  describe('initialize a `Map`', function(){
    it('a `new Map()` is empty, has size=0', function() {
      const mapSize = new Map().size;
      assert.equal(mapSize, 0);
    });
    it('init Map with `[[]]` has a size=1', function() {
      const mapSize = new Map([[]]).size;
      assert.equal(mapSize, 1);
    });
    it('init a Map with `[[1]]` is the same as `map.set(1, void 0)`', function() {
      let map1 = new Map([[1]]);
      let map2 = new Map().set(1, void 0);
      assertMapsEqual(map1, map2);
    });
    it('init Map with multiple key+value pairs', function() {
      const pair1 = [1, 'one'];
      const pair2 = [2, 'two'];
      const map = new Map([pair1, pair2]);
      assertMapsEqual(map, new Map().set(...pair1).set(...pair2));
    });
    it('keys are unique, the last one is used', function() {
      const pair1 = [1, 'one'];
      const pair2 = [1, 'uno'];
      const pair3 = [1, 'eins'];
      const pair4 = [2, 'two'];
      const map = new Map([pair1, pair2, pair3, pair4]);
      assertMapsEqual(map, new Map().set(...pair3).set(...pair4));
    });
    it('init Map from an Object, is a bit of work', function() {
      let map = new Map();
      const obj = {x: 1, y: 2};
      const keys = Object.keys(obj);
      keys.forEach(key => map.set(key, obj[key]));
      const expectedEntries = [['x', 1], ['y', 2]];
      assertMapsEqual(map, expectedEntries);
    });
  });

  // Map.prototype.get()
  describe('`Map.prototype.get` returns the element from the map for a key', function(){
    it('`get(key)` returns the value stored for this key', function() {
      let map = new Map();
      map.set('key', 'value');
      const value = map.get('key');
      assert.equal(value, 'value');
    });
    it('multiple calls still return the same value', function() {
      let map = new Map();
      map.set('value', 'value');
      var value = map.get(map.get(map.get('value')));
      assert.equal(value, 'value');
    });
    it('requires exactly the value as passed to `set()`', function() {
      let map = new Map();
      const obj = {};
      map.set(obj, 'object is key');
      assert.equal(map.get(obj), 'object is key');
    });
    it('leave out the key, and you get the value set for the key `undefined` (void 0)', function() {
      let map = new Map();
      map.set(void 0, 'yo');
      const value = map.get(void 0);
      assert.equal(value, 'yo');
    });
    it('returns undefined for an unknown key', function() {
      let map = new Map();
      map.set(void 0, 1);
      const value = map.get('none');
      assert.equal(value, void 0);
    });
  });

  // Map.prototype.set()
  describe('`Map.prototype.set` adds a new element with key and value to a Map', function(){
    it('simplest use case is `set(key, value)` and `get(key)`', function() {
      let map = new Map();
      map.set('key', 'value');
      assert.equal(map.get('key'), 'value');
    });
    it('the key can be a complex type too', function() {
      const noop = function() {};
      let map = new Map();
      map.set(noop, 'the real noop');
      assert.equal(map.get(noop), 'the real noop');
    });
    it('calling `set()` again with the same key replaces the value', function() {
      let map = new Map();
      map.set('key', 'value');
      map.set('key', 'value1');
      assert.equal(map.get('key'), 'value1');
    });
    it('`set()` returns the map object, it`s chainable', function() {
      let map = new Map();
      map.set(1, 'one')
         .set(2, 'two')
         .set(3, 'three')
      ;
      assert.deepEqual([...map.keys()], [1,2,3]);
      assert.deepEqual([...map.values()], ['one', 'two', 'three']);
    });
  });

  // Map - has()
  describe('`map.has()` indicates whether an element with a key exists', function() {
    it('finds nothing in an empty map', function() {
      let map = new Map();
      const hasKey = map.has(void 0);
      assert.equal(hasKey, false);
    });
    it('finds an element by it`s key', function() {
      let map = new Map([['key', 'VALUE']]);
      const hasKey = map.has('key');
      assert.equal(hasKey, true);
    });
    it('finds `undefined` as key too', function() {
      let map = new Map([[void 0, 'not defined key']]);
      const hasUndefinedAsKey = map.has(void 0);
      assert.equal(hasUndefinedAsKey, true);
    });
    it('does not coerce keys', function() {
      let map = new Map([['1', 'one']]);
      const findsStringOne = true;
      assert.equal(map.has('1'), findsStringOne);
    });
    it('after removal (using `map.delete(<key>)`) it doesnt find the element anymore', function() {
      let map = new Map([[1, 'one']]);
      map.delete(1)
      assert.equal(map.has(1), false);
    });
    it('adding an item (using `map.set(key, value)`) later will make `has()` return true', function() {
      let map = new Map();
      map.set(void 0, 'value')
      assert.equal(map.has(void 0), true);
    });
  });
})

// Number API
describe('Number API', () => {
  // Number.isInteger
  describe('`Number.isInteger()` determines if a value is an integer', function () {
    it('`isInteger` is a static function on `Number`', function () {
      const whatType = 'function'
      assert.equal(typeof Number.isInteger, whatType)
    })
    describe('zero in different ways', function () {
      it('0 is an integer', function () {
        const zero = 0
        assert(Number.isInteger(zero))
      })
      it('0.000', function () {
        const veryZero = 0.00000
        assert(Number.isInteger(veryZero))
      })
      it('the string "0" is NOT an integer', function () {
        const stringZero = '0'
        assert(Number.isInteger(stringZero) === false)
      })
    })
    describe('one in different ways', function () {
      it('0.111 + 0.889', function () {
        const rest = 0.889
        assert(Number.isInteger(0.111 + rest))
      })
      it('0.5 + 0.2 + 0.2 + 0.1 = 1 ... isn`t it?', function () {
        const oneOrNot = 0.5 + 0.2 + 0.2 + 0.1
        assert(Number.isInteger(oneOrNot) === false)
      })
      it('parseInt`ed "1" is an integer', function () {
        const convertedToInt = Number.parseInt('1.01')
        assert(Number.isInteger(convertedToInt))
      })
    })
    describe('what is not an integer', function () {
      it('`Number()` is an integer', function () {
        const numberOne = Number()
        assert(Number.isInteger(numberOne))
      })
      it('`{}` is NOT an integer', function () {
        const isit = Number.isInteger({})
        assert(isit === false)
      })
      it('`0.1` is not an integer', function () {
        const isit = Number.isInteger(0.1)
        assert(isit === false)
      })
      it('`Number.Infinity` is not an integer', function () {
        const isit = Number.isInteger(Number.Infinity)
        assert(isit === false)
      })
      it('`NaN` is not an integer', function () {
        const isit = Number.isInteger(NaN)
        assert(isit === false)
      })
    })
  })

  // Number.isNaN
  describe('`Number.isNaN()` determines if a value is `NaN`', function () {
    it('it is a static function on `Number`', function () {
      const whatType = 'function'
      assert.equal(typeof Number.isNaN, whatType)
    })
    describe('returns false', () => {
      describe('for any not-Number type', () => {
        it('like null', () => {
          const justNull = null
          assert.equal(Number.isNaN(justNull), false)
        })
        it('like a string', () => {
          const aString = 'NaN'
          assert.equal(Number.isNaN(aString), false)
        })
        it('like an object', () => {
          const anObject = {}
          assert.equal(Number.isNaN(anObject), false)
        })
        describe('different to the global `isNaN` function (specified way before ES6)', () => {
          it('an object gets converted to a Number before the check, and returns true therefore', () => {
            const fn = isNaN
            assert.equal(fn({}), true)
          })
          it('a string gets converted to a Number first, and returns true therefore (even though its not `NaN`)', () => {
            const fn = isNaN
            assert.equal(fn('just a string'), true)
          })
        })
      })
      describe('for Numbers', () => {
        it('like 0', () => {
          const zero = 0
          assert.equal(Number.isNaN(zero), false)
        })
        it('or Infinity (+∞)', () => {
          const infinity = Number.POSITIVE_INFINITY
          assert.equal(Number.isNaN(infinity), false)
        })
        it('or the biggest Number (9007199254740991 (2^53−1))', () => {
          const max = Number.MAX_SAFE_INTEGER
          assert.equal(Number.isNaN(max), false)
        })
        it('or a decimal number', () => {
          const pi = 3.1415926535897932
          assert.equal(Number.isNaN(pi), false)
        })
      })
    })
    describe('returns true for', () => {
      it('exactly `NaN`', () => {
        const notANumber = NaN
        assert.equal(Number.isNaN(notANumber), true)
      })
      it('zero divided by zero', () => {
        const zeroDividedByZero = 0 / 0
        assert.equal(Number.isNaN(zeroDividedByZero), true)
      })
    })
  })
})

// Object API
describe('Object API', () => {
  // Object.fromEntries
  describe('`Object.fromEntries()` converts key-value pairs (entries) into an object', () => {
    it('`fromEntries()` method is defined on `Object` (not on the object literal)', () => {
      const fn = Object.fromEntries
      assert.equal(typeof fn, 'function')
    })
    describe('GIVEN a list of entries (a key and a value) each WILL be converted into an object', () => {
      it('WHERE an entry is an array with two elements', () => {
        const entry1 = ['key', 'value']
        const entry2 = ['key1', 'value 1']
        assert.deepEqual(Object.fromEntries([entry1, entry2]), {key: 'value', key1: 'value 1'})
      })
      it('WHEN using `arr.entries()` the array-index becomes the key and values stay values', () => {
        const arr = ['one', 'two']
        assert.deepEqual(Object.fromEntries(arr.entries()), {0: 'one', 1: 'two'})
      })
      it('WHERE an entry is a Map, and key and value map naturally', () => {
        const map = new Map()
        map.set('key', 'value')
        map.set('key1', 'value 1')
        assert.deepEqual(Object.fromEntries(map.entries()), {key: 'value', key1: 'value 1'})
      })
      it('WHERE an entry is a Set, the values are used as keys too', () => {
        const set = new Set()
        set.add('set value 1')
        assert.deepEqual(Object.fromEntries(set.entries()), {'set value 1': 'set value 1'})
      })
      it('WHERE an entry is an object, the properties `0` and `1` are key and value', () => {
        const entry1Object = Object.values({1: 'key', 2: 'value'})
        const entry2Object = Object.entries({'key1': 'value 1'})
        assert.deepEqual(Object.fromEntries([entry1Object, ...entry2Object]), {key: 'value', key1: 'value 1'})
      })
    })
  })
})

// Set
describe('Set', () => {
  // Set - basics
  describe('`Set` lets you store unique values of any type', function(){
    it('`Set` is a new global constructor function', function() {
      const typeOfSet = 'function';
      assert.equal(typeof Set, typeOfSet);
    });
    it('every value in a set is unique', function() {
      let set = new Set();
      set.add(1);
      set.add(11);
      const expectedSize = 2;
      assert.equal(set.size, expectedSize);
    });
    it('the string "1" is different to the number 1', function() {
      let set = new Set();
      set.add(1);
      set.add('1')
      assert.equal(set.size, 2);
    });
    it('even NaN is equal to NaN', function() {
      let set = new Set();
      set.add(NaN);
      set.add(NaN);
      assert.equal(set.size, 1);
    });
    it('+0 and -0 are seen as equal', function() {
      let set = new Set();
      set.add(+0);
      set.add(0);
      set.add(-0);
      assert.deepEqual([...set.values()], [+0]);
    });
  });

  // Set - API overview
  describe('`Set` API overview', function(){
    const api = ['size', 'add', 'clear', 'delete', 'entries', 'forEach', 'has', 'keys', 'values'];
    let set;
    beforeEach(function() {
      set = new Set(api);
    });
    it('a Set can be created from an array', function() {
      let set = new Set(api);
      assert.deepEqual(Array.from(set), api);
    });
    it('`size` is the number of values', function() {
      const theSize = set.size;
      assert.equal(theSize, api.length);
    });
    it('`add()` appends the given value', function() {
      // Hint: To make the content of `api` and `set` consistent you can add the
      // `Symbol.iterator` to the `set`. Strongly speaking it is missing in the API.
      set.add(Symbol.iterator)
      assert.equal(set.size, api.length + 1);
    });
    it('`clear()` removes all elements', function() {
      set.clear()
      assert.equal(set.size, 0);
    });
    it('`delete()` removes the given value', function() {
      set.delete('size')
      assert.equal(set.size, api.length - 1);
    });
    it('`entries()` returns an iterator for all values', function() {
      const expectedEntries = api.map(entry => [entry, entry]);
      const actualEntries = set.entries();
      assert.deepEqual([...actualEntries], expectedEntries);
    });
    it('`forEach()` calls a callback for each value', function() {
      let values = [];
      set.forEach(value => { values.push(value); });
      assert.deepEqual(values, api);
    });
    it('`has()` returns true if the given value is in the set', function() {
      const propertyName = 'new';
      set.add(propertyName)
      assert.equal(set.has(propertyName), true);
    });
    it('returns `undefined`', function() {
      var expectedReturn = void 0;
      assert.equal(set.clear(), expectedReturn);
    });

    describe('returns an iterator that contains all values', function() {
      // In order to be alike to `Map`, `keys()` and `values()` are essentially the same thing for a `Set`.
      it('`keys()`', function() {
        set = new Set(api);
        const allKeys = Array.from(set.keys());
        assert.deepEqual([...allKeys], api);
      });
      it('`values()`', function() {
        const allValues = set.values();
        assert.deepEqual([...allValues], api);
      });
      it('`[Symbol.iterator]()`', function() {
        const iteratorKey = Symbol.iterator;
        assert.deepEqual([...set[iteratorKey]()], api);
      });
    });
  });

  // Set - add
  describe('`add()` appends a new element to the end of a Set object.', function(){
    let set;
    beforeEach(() => set = new Set());
    it('adds every value, of any type, only once', function() {
      const fn = () => {};
      set.add(1);
      set.add(1);
      set.add(fn);
      set.add(fn);
      assert.equal(set.size, 2);
    });
    it('is chainable', function() {
      set.add(1).add(2);
      assert.equal(set.has(2), true);
    });
    it('call without params adds undefined', function() {
      set.add()
      assert.equal(set.has(void 0), true);
    });
    it('0, -0 and +0 are equal', function() {
      set.add(0);
      set.add(-0);
      assert.equal(set.has(+0), true);
    });
  });

  // Set - delete
  describe('`set.delete()` deletes an element from a set', function(){
    let set;
    beforeEach(() => set = new Set());
    describe('use `delete(<value>)` to delete an element', function() {
      beforeEach(function() {
        set.add('one').add('two').add('three');
      });
      it('`delete()` returns `true` when the element was found', function() {
        const returns = set.delete('one');
        assert.strictEqual(returns, true);
      });
      it('and the size decreases', function() {
        set.delete('three')
        assert.equal(set.size, 2);
      });
    });
    describe('if nothing was deleted (no element with the given value was found)', function() {
      it('returns `false`', function() {
        set.add('one');
        set.delete('one')
        const returns = set.delete('one');
        assert.equal(returns, false);
      });
    });
    describe('`undefined` is a valid value in a set', function() {
      it('deleting it, when it is not in the set, returns `false` too', function() {
        let whatToDelete = 'undefined'
        assert.equal(set.delete(whatToDelete), false);
      });
      it('`delete()` removes it, when its in the set', function() {
        set.add(void 0)
        assert.equal(set.delete(), true);
      });
    });
    describe('the value does NOT get casted', function() {
      it('number 1 is different to string "1"', function() {
        set.add('1');
        set.delete('1');
        assert.equal(set.delete('1'), false);
      });
    });
  });

})

/* eslint-enable */
