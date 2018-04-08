// test/unit/specs/helper.draggable.spec.js

import draggable from '@/helper/draggable'

describe('helper/draggable', () => {
  it(`helper/draggable :: bind`, () => {
    let mockEvents = {}
    let mockElement = {
      addEventListener: function (name, handler) {
        mockEvents[name] = handler
      },
      offsetLeft: 101,
      offsetTop: 235,
      style: {
        position: ''
      }
    }

    let directive = draggable.bind(mockElement)
    expect(mockEvents.mousedown).not.toBeNull()
    let result = mockEvents.mousedown({
      clientX: 11,
      clientY: 22
    })
    expect(directive).toBeUndefined()
    expect(mockElement.style.position).toBe('absolute')
    expect(result).toBeFalsy()

    let mouseMoveEvent = document.createEvent('MouseEvents')
    mouseMoveEvent.initMouseEvent(
      'mousemove', // event type: click, mousedown, mouseup, mouseover, mousemove, mouseout.
      true, // canBubble
      false, // cancelable
      window, // event's AbstractView: should be window
      1, // detail: Event's mouse click count
      50, // screenX
      50, // screenY
      50, // clientX
      50, // clientY
      false, // ctrlKey
      false, // altKey
      false, // shiftKey
      false, // metaKey
      0, // button: 0 = click, 1 = middle button, 2 = right button
      null // relatedTarget: Only used with some event types (e.g. mouseover and mouseout). In other cases, pass null.
    )
    document.dispatchEvent(mouseMoveEvent)

    let mouseUpEvent = document.createEvent('MouseEvents')
    mouseUpEvent.initMouseEvent('mouseup', true, true)
    document.dispatchEvent(mouseUpEvent)
  })
})
