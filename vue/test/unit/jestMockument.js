// test/unit/jestMockument.js

/*
global.Range = function Range() {}

Range.prototype.createContextualFragment = (html) => createContextualFragment(html)

const createContextualFragment = (html) => {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.children[0] // so hokey it's not even funny
}

global.window.document.createRange = function () {
  return {
    setEnd: () => {},
    setStart: () => {},
    createContextualFragment,
    getBoundingClientRect: () => {
      return { right: 0 }
    },
    getClientRects: function(){
      return {
          length: 0,
          left: 0,
          right: 0
      }
    }
  }
}
*/
