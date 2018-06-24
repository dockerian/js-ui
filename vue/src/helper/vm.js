// helper/vm.js - generic helper functions for view models

import Vue from 'vue'
import clipboardCopy from 'clipboard-copy'
import * as _const from '@/store/appInfo/_constants'
import Message from '@/utils/message'

/**
  addLoginMessage adds a standard login message to appInfo (MessageBoard)
**/
export const addLoginMessage = (vm) => {
  let action = `appInfo/${_const.ADD_MESSAGE}`
  let user = 'anonymous'
  let message = new Message(`Logged in as [${user}]`, 'sticky')
  // adding a sticky info (without acknowledgeable flag)
  vm.$store.dispatch(action, message)
}

/**
  checkPageSize returns validated page size within specific limit.

  @param {Integer} pageSize - the page size to be validated.
  @param {Integer} pageSizeLimit - the maximum page size value, default 500.

  @return {Integer} validated page size (between 10 and the pageSizeLimit).
**/
export const checkPageSize = (pageSize, pageSizeLimit = 500) => {
  let siz = 10 // minimum page size
  let pgz = parseInt(pageSize)
  let val = Math.min(pageSizeLimit, Math.max(siz, pgz))
  let div = val > 100 ? 100 * Math.floor(val / 100) : 10 * Math.floor(val / 10)
  let mod = val > 100 ? val % 100 : val % 10
  let pat = mod > 0 ? (val > 100 ? 50 : 5) : 0

  siz = div + pat

  return siz
}

export const copyConfig = (vm) => {
  let data = JSON.stringify(vm.config, null, 2)
  let success = clipboardCopy(data)
  if (success) {
    let content = `Config data copied to clipboard.`
    vm.$Message.success({content, duration: 5})
    console.log(content, data)
  }
}

export const copyMessage = (vm, msg) => {
  if (msg instanceof Message || msg instanceof Array) {
    let data = JSON.stringify(msg, null, 2)
    let success = clipboardCopy(data)
    if (success) {
      let content = `Message(s) data copied to clipboard.`
      vm.$Message.success({content, duration: 5})
      console.log(content, data)
    }
  }
}

export const EventBus = new Vue()

/**
  getAlertType returns type for (Element or iView) Alert component.

  @param {Message} message - the utils.Message object.

  @return {String} - Alert type.
**/
export const getAlertType = (message) => {
  let type = 'info'
  switch (message.type) {
    case 'error':
    case 'fatal':
      return 'error'
    case 'info':
      return message.successful ? 'success' : 'info'
    case 'warn':
      return 'warning'
    default:
      break
  }
  return type
}

/**
  replaceRouteQuery replaces router path with specific query.

  @param {Object} vm - viewmodel with `$router` and `$route` properties.
  @param {Object} query - the query object to replace.
**/
export const replaceRouteQuery = (vm, query) => {
  console.log('setting router query:', JSON.stringify(query))
  vm.$router.replace({
    path: vm.$route.path,
    query: query
  })
}
