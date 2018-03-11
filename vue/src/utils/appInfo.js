// utils/appInfo.js - app info notification/message center functions

import Message from '@/utils/message'

const DEFAULT_SIZE = 50 // default container size for AppInfo
const MAXIMUM_SIZE = 200 // default container size for AppInfo
const MINIMUM_SIZE = 5 // default container size for AppInfo
const NOTACK_LIMIT = 0.5 // percentage limit of notAcknowledged messages
const STICKY_LIMIT = 0.1 // percentage limit of important/sticky messages

export default class AppInfo {
  /**
   * Construct AppInfo - represents a notification message center.
   *
   * @constructor
   * @param {Integer} size - the limit of messages count in AppInfo.
  **/
  constructor (size) {
    this.size = Number.isInteger(size)
      ? Math.max(Math.min(size, MAXIMUM_SIZE), MINIMUM_SIZE) : DEFAULT_SIZE
    this.stickyLimit = Math.ceil(this.size * STICKY_LIMIT)
    this.notAckLimit = Math.ceil(this.size * NOTACK_LIMIT)
    this.resetAndInit()
  }

  /**
   * Add a new message.
   *
   * @param {String} message - notification message or log info.
   * @param {String} type - message type, must be in Object.keys(MessageTypes).
   * @param {Boolean} notAcknowledged - indicating a message must be acknowledged.
   * @param {Boolean} successful - indicating an info message is a success.
   * @param {Boolean} important - indicating if a message is important.
   *
   * @return {Object} an object in format of
   *
   *    ```
   *    {
   *      message: <new Message object or null>,
   *      count: <new count of messages>
   *    }
   *    ```
  **/
  add (message, type, notAcknowledged = false, successful = false, important = false) {
    let count = this.count
    let msg = new Message(message, type, notAcknowledged, successful, important)
    let num = this.addMessage(msg)
    let res = {
      message: num > count ? msg : null,
      count: num
    }
    return res
  }

  /**
   * Add a Message object to AppInfo notification message center.
   *
   * @param {Object} msg - a new Message object; or an Object with fields:
   *
   *        ```
   *        {
   *          message: <string>,
   *          type: <string>,
   *          notAcknowledged: <bool>,
   *          successful: <bool>,
   *          important: <bool>,
   *        }
   *        ```
   *
   * @return {Integer} - the count of messages.
  **/
  addMessage (msg) {
    let validType = msg instanceof Message
    let validData = msg && typeof msg.message === 'string' && msg.message.trim() !== ''
    let newerUUID = msg && msg.uuid && !this.messagesMap[msg.uuid]
    let emptyUUID = msg && typeof msg === 'object' && msg.uuid === undefined
    let newObject = !validType && validData && emptyUUID
    let goodToAdd = validType && validData && newerUUID

    if (newObject) {
      this.add(msg.message, msg.type,
        msg.notAcknowledged, msg.successful, msg.important)
    } else if (goodToAdd) {
      if (this.count >= this.size) {
        this.shift()
      }
      // setting in messages map
      this.messagesMap[msg.uuid] = msg
      // adding msg to the beginning to the array (like a push to queue)
      this.messages.unshift(msg)

      if (msg.type === 'error') {
        this.countError += 1
      }
      if (msg.notAcknowledged) {
        if (this.countNotAck >= this.notAckLimit) {
          // acknowledge the oldest one
          this.clearAcknowledge(true)
        }
        this.countNotAck += 1
      }
      if (msg.important) {
        if (this.countSticky >= this.stickyLimit) {
          // no more sticky/important message can be added
          msg.important = false
        } else {
          this.countSticky += 1
        }
      }
      this.count += 1
    }
    return this.count
  }

  /**
   * Clear all messages (except important and notAcknowledged ones) from AppInfo.
  **/
  clear () {
    let count = 0
    let countError = 0
    for (let i = this.count - 1; i >= 0; i--) {
      let msg = this.messages[i]
      if (msg.important || msg.notAcknowledged) {
        if (msg.type === 'error') {
          countError += 1
        }
        count += 1
        continue
      }
      delete this.messagesMap[msg.uuid]
      this.messages.splice(i, 1)
      this.count -= 1
    }
    this.count = count
    this.countError = countError
  }

  /**
   * Acknowledge all messages.
   *
   * @param {Boolean} oldestOnly - clear the oldest one only.
  **/
  clearAcknowledge (oldestOnly = false) {
    for (let i = this.count - 1; i >= 0; i--) {
      let msg = this.messages[i]
      if (msg.notAcknowledged) {
        msg.notAcknowledged = false
        --this.countNotAck
        if (oldestOnly) {
          break
        }
      }
    }
  }

  /**
   * Get counts of messages.
   *
   * @return {Integer} - the counts of messages.
  **/
  counts () {
    let countSticky = 0
    for (let msg of this.messages) {
      if (msg.important) countSticky++
    }
    this.countSticky = countSticky
    this.count = this.messages.length
    return this.count
  }

  /**
   * Get counts of error messages.
   *
   * @return {Integer} - the counts of error messages.
  **/
  countsError () {
    let count = 0
    for (let msg of this.messages) {
      if (msg.type === 'error') count++
    }
    this.countError = count
    return count
  }

  /**
   * Get counts of notAcknowledged messages.
   *
   * @return {Integer} - the counts of notAcknowledged messages.
  **/
  countsNotAck () {
    let count = 0
    for (let msg of this.messages) {
      if (msg.notAcknowledged) count++
    }
    this.countNotAck = count
    return count
  }

  /**
   * Get a message by UUID.
   *
   * @param {String} uuid - the message UUID.
  **/
  get (uuid) {
    for (let msg of this.messages) {
      if (msg.uuid === uuid) {
        return msg
      }
    }
    return null
  }

  /**
   * Get the latest message.
   *
   * @return {Message} - the latest message, or null.
  **/
  getLatest () {
    return this.count > 0 ? this.messages[0] : null
  }

  /**
   * Remove a message by UUID.
   *
   * @param {String} uuid - the message UUID.
  **/
  remove (uuid) {
    for (let i = this.count - 1; i >= 0; i--) {
      let msg = this.messages[i]
      if (msg.uuid === uuid) {
        delete this.messagesMap[msg.uuid]
        this.messages.splice(i, 1)
        if (msg.type === 'error') {
          this.countError -= 1
        }
        if (msg.notAcknowledged) {
          this.countNotAck -= 1
        }
        this.count -= 1
        break
      }
    }
    return this.count
  }

  /**
   * Clear all counters and messages (including important ones) from AppInfo.
  **/
  resetAndInit () {
    this.count = 0
    this.countError = 0
    this.countNotAck = 0
    this.countSticky = 0
    this.messages = []
    this.messagesMap = {}
  }

  /**
   * Remove the oldest message (acknowledged and not important).
  **/
  shift () {
    for (let i = this.count - 1; i >= 0; i--) {
      let msg = this.messages[i]
      if (msg.important === false && msg.notAcknowledged === false) {
        delete this.messagesMap[msg.uuid]
        this.messages.splice(i, 1)
        this.count -= 1
        break
      }
    }
    return this.count
  }
}
