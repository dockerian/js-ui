// appInfo/actions.js

import * as _const from './_constants'
import Message from '@/utils/message'

// appInfo actions
const actions = {
  [_const.ACK] (store, uuid) {
    let msg = store.state.get(uuid)
    if (msg !== null && msg instanceof Message) {
      msg.clearAcknowledge()
      store.commit(_const.COUNT_NOT_ACK)
    }
  },
  [_const.ACK_ALL] (store) {
    store.state.clearAcknowledge()
    store.commit(_const.COUNT_NOT_ACK)
  },
  [_const.ADD_MESSAGE] (store, msg) {
    if (Array.isArray(msg)) {
      // spread to params: message, type, notAcknowledged, successful, important
      store.state.add(...msg)
    } else if (typeof msg === 'string' || msg instanceof String) {
      store.state.add(msg)
    } else {
      store.state.addMessage(msg)
    }
    store.dispatch(_const.COUNTS)
  },
  [_const.CLEAR] (store) {
    console.log('clearing all messages')
    store.state.clear()
    store.dispatch(_const.COUNTS)
  },
  [_const.COUNTS] (store) {
    store.commit(_const.COUNT)
    store.commit(_const.COUNT_ERROR)
    store.commit(_const.COUNT_NOT_ACK)
  },
  [_const.DEL_MESSAGE] (store, uuid) {
    console.log('clearing', uuid)
    store.state.remove(uuid)
    store.dispatch(_const.COUNTS)
  },
  [_const.RESET] (store) {
    store.state.clearAndInit()
    store.dispatch(_const.COUNTS)
  }
}

export default actions
