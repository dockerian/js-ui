# Misc notes on ES6

> Dev notes on JavaScript and UI


<br/><a name="contents"></a>
## Contents

  * [Primitive values](#primitive)
  * [JavaScript Library/Frameworks](./JSF.md)
  * [Throtting](#throttling)


<a name="primitive"><br/></a>
## Primitive values

Six primitive values. Both `null` and `undefined` are primitive values.

* Boolean
* Null
* Undefined
* Number
* String
* Symbol

Only six falsy values. Both `null` and `undefined` are falsy values.

* `false`
* `0` (zero)
* `""` (empty string)
* `null`
* `undefined` (by default, e.g. unassigned function parameter)
* `NaN` (Not A Number)


<a name="throttling"><br/></a>
## Throttling

  Create a helper function

    ```js
    // helper function to convert any function into a throttled version.
    function throttled(delay, fn) {
      let lastTime = 0;
      return function (...args) {s
        const now = (new Date).getTime();
        if (now - lastTime < delay) {
          return;
        }
        lastTime = now;
        return fn(...args);
      }
    }
    ```

  Usage example

    ```js
    const myHandler = (event) => // do something with the event
    const tHandler = throttled(200, myHandler);
    domNode.addEventListener("mousemove", tHandler);
    ```

  See https://codeburst.io/throttling-and-debouncing-in-javascript-646d076d0a44
