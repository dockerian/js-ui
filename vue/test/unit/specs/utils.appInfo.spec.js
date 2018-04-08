// unit/specs/utils.appInfo.spec - testing utils/appInfo and utils/message

import _ from 'lodash'
import AppInfo from '@/utils/appInfo'
import Message, {MessageAttributes, MessageTypes} from '@/utils/message'

// messageTests contains
//  - 4 info messages
//  - 1 successful message
//  - 1 warning message
//  - 3 error messages
//  - 1 important message
//  - 2 notAcknowledged messages
//  - 1 fatal message
const messageTests = [
  {
    msg: new Message('blank type'),
    expected: {
      type: 'info',
      attrib: 'info',
      important: false,
      notAcknowledged: false,
      successful: false
    }
  },
  {
    msg: new Message('info message', 'informational'),
    expected: {
      type: 'info',
      attrib: 'info',
      important: false,
      notAcknowledged: false,
      successful: false
    }
  },
  {
    msg: new Message('This must be the 3rd message in this list to be removed', 'error'),
    expected: {
      type: 'error',
      attrib: 'error',
      important: false,
      notAcknowledged: false,
      successful: false
    }
  },
  {
    msg: new Message('successful message', 'success'),
    expected: {
      type: 'info',
      attrib: 'info successful',
      important: false,
      notAcknowledged: false,
      successful: true
    }
  },
  {
    msg: new Message('one error message', 'error'),
    expected: {
      type: 'error',
      attrib: 'error',
      important: false,
      notAcknowledged: false,
      successful: false
    }
  },
  {
    msg: new Message('clearable info message', 'informat'),
    expected: {
      type: 'info',
      attrib: 'info',
      important: false,
      notAcknowledged: false,
      successful: false
    }
  },
  {
    msg: new Message('one warning message', 'warn', true),
    expected: {
      type: 'warn',
      attrib: 'warn notAcknowledged',
      important: false,
      notAcknowledged: true,
      successful: false
    }
  },
  {
    msg: new Message('2nd last notAcked error message', 'err', true),
    expected: {
      type: 'error',
      attrib: 'error notAcknowledged',
      important: false,
      notAcknowledged: true,
      successful: false
    }
  },
  {
    msg: new Message('important message', 'fatal', false, false, true),
    expected: {
      type: 'fatal',
      attrib: 'fatal important',
      important: true,
      notAcknowledged: false,
      successful: false
    }
  }
]

describe('utils.appInfo.AppInfo', () => {
  it('should construct an AppInfo object', () => {
    let appInfo = new AppInfo(103)
    expect(appInfo.size).toBe(103)
    expect(appInfo.count).toEqual(0)
    expect(appInfo.countError).toEqual(0)
    expect(appInfo.countNotAck).toEqual(0)
    expect(appInfo.messages).toEqual([])
    expect(appInfo.messagesMap).toEqual({})
  })

  it('should construct an AppInfo object with limited size', () => {
    let tests = _.cloneDeep(messageTests)
    let appInfo = new AppInfo(tests.length)
    for (let i = tests.length; i > 0; i--) {
      appInfo.addMessage(tests[i - 1].msg)
    }
    expect(appInfo.count).toBe(tests.length)
    expect(appInfo.countNotAck).toBe(2)
    expect(appInfo.countError).toBe(4)

    appInfo.addMessage(new Message('new message'))
    expect(appInfo.count).toBe(tests.length) // within the limit

    let msg = appInfo.messages[tests.length - 2] // 2nd last (notAcked)
    appInfo.remove(msg.uuid)
    expect(appInfo.countNotAck).toBe(1)
  })

  it('should add/get/remove/shift/clear messages', () => {
    let appInfo = new AppInfo()
    let prefix = '12345678-aabb-4567-ccdd-1234567890' // 10-digit prefix for uuid
    let tests = _.cloneDeep(messageTests) // Object.assign([], messageTests)
    for (let i = tests.length; i > 0; i--) {
      let msg = tests[i - 1].msg // get the message object
      // set sequence in original order of messageTests
      msg.uuid = `${prefix}${i.toString().padStart(2, '0')}`
      appInfo.addMessage(tests[i - 1].msg)
    }
    // console.log(JSON.stringify(appInfo))
    expect(appInfo.count).toBe(tests.length)
    expect(appInfo.countNotAck).toBe(2)
    expect(appInfo.countError).toBe(4)

    let countAll = appInfo.count
    // pick the 3rd message (from bottom) to remove
    let uuidToBeRemoved = '12345678-aabb-4567-ccdd-123456789003'
    let msgToBeRemoved = appInfo.get(uuidToBeRemoved)
    expect(msgToBeRemoved.uuid).toEqual(uuidToBeRemoved)

    appInfo.remove(uuidToBeRemoved)
    let nullMessage = appInfo.get(uuidToBeRemoved)
    expect(appInfo.count).toBe(countAll - 1)
    expect(nullMessage).toBeNull()

    appInfo.shift()
    expect(appInfo.count).toBe(countAll - 2)

    appInfo.clear()
    expect(appInfo.count).toBe(3) // important and notAcknowledged remain

    appInfo.clearAcknowledge()
    expect(appInfo.count).toBe(3) // no message removed by clearAcknowledge
    appInfo.clear()
    expect(appInfo.count).toBe(1) // important message remain

    appInfo.clearAndInit()
    expect(appInfo.count).toBe(0)
  })

  it('should maintain correct counters after remove', () => {
    let appInfo = new AppInfo()
    let tests = _.cloneDeep(messageTests) // vs Object.assign([], messageTests)
    for (let i = tests.length; i > 0; i--) {
      let msg = tests[i - 1].msg // get the message object
      appInfo.addMessage(msg)
    }
    expect(appInfo.count).toBe(tests.length)
    expect(appInfo.countNotAck).toBe(2)
    expect(appInfo.countError).toBe(4)

    for (let msg of appInfo.messages) {
      if (msg.type === 'error') {
        appInfo.remove(msg.uuid)
      }
    }
    expect(appInfo.count).toBe(tests.length - 3)
    expect(appInfo.countNotAck).toBe(1) // there one notAcknowledged error
    expect(appInfo.countError).toBe(1)

    for (let msg of appInfo.messages) {
      if (msg.notAcknowledged) {
        appInfo.remove(msg.uuid)
      }
    }
    expect(appInfo.count).toBe(tests.length - 4)
    expect(appInfo.countNotAck).toBe(0)
    expect(appInfo.countError).toBe(1)
  })

  it('should get the latest message', () => {
    let appInfo = new AppInfo()
    expect(appInfo.getLatest()).toBeNull()

    appInfo.addMessage(new Message())
    expect(appInfo.getLatest()).toBeNull()

    appInfo.addMessage(new Message('older message'))
    appInfo.addMessage(new Message('newer message'))
    let top = appInfo.getLatest()
    expect(top).not.toBeNull()
    expect(top.message).toEqual('newer message')
    expect(top.type).toEqual('info')
  })

  it('should add new object as msssage', () => {
    let tests = [
      {
        msg: {
          message: 'new sticky message in object',
          type: 'sticky'
        },
        expected: 'new sticky message in object'
      },
      {
        msg: {
          message: '  a successful message  ',
          type: 'info',
          notAcknowledged: true,
          successful: true,
          important: true
        },
        expected: 'a successful message'
      },
      {
        msg: {
          message: '\nerror:\tmessage\n',
          type: 'error',
          important: true
        },
        expected: 'error:\tmessage'
      },
      {
        msg: {
          message: '  ',
          type: 'info',
          notAcknowledged: true,
          successful: true,
          important: true
        },
        expected: ''
      }
    ]

    for (let test of tests) {
      let appInfo = new AppInfo()
      appInfo.addMessage(test.msg)

      expect(appInfo.count).toBe(appInfo.counts())
      expect(appInfo.countError).toBe(appInfo.countsError())
      expect(appInfo.countNotAck).toBe(appInfo.countsNotAck())

      if (test.expected && test.expected !== '') {
        // console.log('- test:', JSON.stringify(test.msg))
        let msg = appInfo.getLatest()
        let sticky = test.msg.type === 'sticky' || test.msg.important || false
        expect(msg).not.toBeNull()
        expect(msg.successful).toBe(test.msg.successful || false)
        expect(msg.notAcknowledged).toBe(test.msg.notAcknowledged || false)
        expect(msg.important).toBe(sticky)
        expect(msg.message).toEqual(test.expected)
        expect(appInfo.count).toBe(1)
      } else {
        let msg = appInfo.getLatest()
        expect(appInfo.count).toBe(0)
        expect(msg).toBeNull()
      }
    }
  })

  it('should not add empty message', () => {
    let appInfo = new AppInfo()
    expect(appInfo.count).toBe(0)
    expect(appInfo.countNotAck).toBe(0)
    expect(appInfo.countError).toBe(0)

    appInfo.addMessage(new Message(new Message('nested object')))
    expect(appInfo.count).toBe(0)
    expect(appInfo.countNotAck).toBe(0)
    expect(appInfo.countError).toBe(0)

    appInfo.addMessage(new Message(['a new message'], 'info'))
    expect(appInfo.count).toBe(0)
    expect(appInfo.countNotAck).toBe(0)
    expect(appInfo.countError).toBe(0)

    appInfo.addMessage(new Message())
    expect(appInfo.count).toBe(0)
    expect(appInfo.countNotAck).toBe(0)
    expect(appInfo.countError).toBe(0)

    let result = appInfo.add(' ')
    expect(appInfo.count).toBe(0)
    expect(appInfo.countNotAck).toBe(0)
    expect(appInfo.countError).toBe(0)
    expect(result.message).toBeNull()
    expect(result.count).toBe(0)

    result = appInfo.add('a new success', 'success')
    expect(appInfo.count).toBe(1)
    expect(appInfo.countNotAck).toBe(0)
    expect(appInfo.countError).toBe(0)
    expect(result.message).not.toBeNull()
    expect(result.message.successful).toBe(true)
    expect(result.count).toBe(1)
  })
})

describe('utils.message.Message', () => {
  it('should construct a new Message object', () => {
    let uuid = ''
    let tests = _.cloneDeep(messageTests) // Object.assign([], messageTests)
    for (let test of tests) {
      let msg = test.msg
      let regexTsLocal = /(\d+):(\d+):(\d+) (AM|PM)/
      let matches = msg.datetimeLocal.match(regexTsLocal)
      let attrib = msg.getAttributes()
      expect(matches).not.toBeNull()
      expect(matches.length).toBe(5)
      expect(Number.parseInt(matches[1], 10)).toBeGreaterThanOrEqual(1)
      expect(Number.parseInt(matches[1], 10)).toBeLessThanOrEqual(23)
      expect(Number.parseInt(matches[2], 10)).toBeLessThanOrEqual(59)
      expect(Number.parseInt(matches[3], 10)).toBeLessThanOrEqual(59)

      expect(msg.type).toEqual(test.expected.type)
      expect(msg.important).toBe(test.expected.important)
      expect(msg.notAcknowledged).toBe(test.expected.notAcknowledged)
      expect(msg.successful).toBe(test.expected.successful)
      expect(attrib).toEqual(test.expected.attrib)

      let notAcked = msg.notAcknowledged
      msg.clearAcknowledge()
      expect(msg.notAcknowledged).toBe(false)
      msg.notAcknowledged = notAcked

      // console.log(JSON.stringify(msg))
      let regexUUID4 = /^([a-z0-9]{8})-([a-z0-9]{4})-(4[a-z0-9]{3})-([a-z0-9]{4})-([a-z0-9]{12})$/
      let regexUUID4Matches = msg.uuid.match(regexUUID4)
      expect(regexUUID4Matches.length).toBe(6)
      expect(msg.uuid).not.toBe(uuid)
      uuid = msg.uuid
    }
  })

  it('should construct a success message', () => {
    let msg1 = new Message('\t the job succeeded. \n', 'success', '', 'true', 'true')
    expect(msg1.message).toEqual('the job succeeded.')
    expect(msg1.successful).toBe(true)
    expect(msg1.notAcknowledged).toBe(false)
    expect(msg1.important).toBe(false)

    let msg2 = new Message('2nd job succeeded. \n', 'success', false, 'true', true)
    expect(msg2.message).toEqual('2nd job succeeded.')
    expect(msg2.successful).toBe(true)
    expect(msg2.notAcknowledged).toBe(false)
    expect(msg2.important).toBe(true)
  })

  it('should construct a success message', () => {
    let msg1 = new Message('the sticky info', 'sticky')
    expect(msg1.message).toEqual('the sticky info')
    expect(msg1.successful).toBe(false)
    expect(msg1.notAcknowledged).toBe(false)
    expect(msg1.important).toBe(true)
    expect(msg1.type).toBe('info')
  })
})

describe('utils.message', () => {
  it('should have MessageAttributes', () => {
    for (let key in MessageAttributes) {
      let type = typeof MessageAttributes[key]
      expect(type).toEqual('string')
    }
  })

  it('should have MessageTypes', () => {
    for (let key in MessageTypes) {
      let type = typeof MessageTypes[key]
      expect(type).toEqual('string')
    }
  })
})
