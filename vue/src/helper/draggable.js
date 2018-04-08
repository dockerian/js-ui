// helper/draggable.js
// see https://siongui.github.io/2017/02/06/vuejs-draggable-movable-element/

const draggable = {
  bind: function (el) {
    el.style.position = 'absolute'
    let startX, startY, initialMouseX, initialMouseY

    function mousemove (e) {
      let dx = e.clientX - initialMouseX
      let dy = e.clientY - initialMouseY
      el.style.top = startY + dy + 'px'
      el.style.left = startX + dx + 'px'
      return false
    }

    function mouseup () {
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseup)
    }

    el.addEventListener('mousedown', function (e) {
      startX = el.offsetLeft
      startY = el.offsetTop
      initialMouseX = e.clientX
      initialMouseY = e.clientY
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
      return false
    })
  }
}

export default draggable
