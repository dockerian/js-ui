// utils/message.js - message/notification functions

import * as str from '@/utils/str'
import dateformat from 'dateformat'
import uuidv4 from 'uuid/v4'

export const MessageAttributes = {
  important: 'important',
  notAcknowledged: 'notAcknowledged',
  successful: 'successful',
  sticky: 'sticky'
}

export const MessageTypes = {
  debug: 'Log', // debugging message
  info: 'Informational', // generic or successful message
  warn: 'Warning', // caution or warning
  error: 'Error', // error or failure
  fatal: 'Fatal' // system failure
}

// Message defines a notification message object
export default class Message {
  /**
   * Construct a Message object.
   *
   * @constructor
   * @param {String} message - nofication message or log info.
   * @param {String} type - message type, must be in Object.keys(MessageTypes).
   * @param {Boolean} notAcknowledged - indicating a message must be acknowledged.
   * @param {Boolean} successful - indicating an info message is a success.
   * @param {Boolean} important - indicating if a message is important.
   *
   * @return {Message} a Message object.
   *
   * Notes:
   * - All properties (except notAcknowledged) should be readonly.
   * - message string will be trimmed.
  **/
  constructor (message, type, notAcknowledged = false, successful = false, important = false) {
    let dtNow = new Date()
    this.datetimeISO = dtNow.toISOString()
    this.datetimeLocal = dateformat(dtNow, 'HH:MM:ss TT')
    this.datetime = dateformat(dtNow, 'yyyy-mm-dd HH:MM:ss')
    this.type = str.checkLookup(type, MessageTypes, true) || 'info'
    this.important = typeof important === 'boolean' && important
    this.notAcknowledged = typeof notAcknowledged === 'boolean' && notAcknowledged
    this.successful = typeof successful === 'boolean' && successful
    this.message = typeof message === 'string' ? message.trim() : ''
    this.uuid = uuidv4()

    if (type === 'sticky') {
      this.important = true
      this.type = 'info'
    }
    if (this.type === 'info') {
      this.successful = this.successful || type === 'success'
    }
  }

  /**
   * Clear notAcknowledged message.
  **/
  clearAcknowledge () {
    this.notAcknowledged = false
  }

  /**
   * Get a string representation of all attributes (including the type).
  **/
  getAttributes () {
    let attrib = this.type
    if (this.important) {
      attrib += ` ${MessageAttributes['important']}`
    }
    if (this.notAcknowledged) {
      attrib += ` ${MessageAttributes['notAcknowledged']}`
    }
    if (this.successful) {
      attrib += ` ${MessageAttributes['successful']}`
    }
    return attrib
  }
}
