// helper/appIcons.js

// appIcons maps app key/names to iView icons
const appIcons = {
  about: 'information-circled', // ios-star-outline
  check: 'checkmark', // 'arrow-expand'
  default: 'leaf',
  demo: 'grid',
  home: 'home',
  links: 'link',
  message_board: 'more', // chatbubble-working, paper-airplane
  move_backward: 'arrow-left-b',
  move_forward: 'arrow-right-b',
  nav: 'navicon',
  perspectives: 'aperture',
  rules: 'lock-combination', // arrow-expand
  search: 'search',
  settings: 'gear-a', // gear-b, ios-gear
  usage_and_help: 'help-circled',
  usage: 'help-circled'
}

// appIconsMapper returns an iView icon by name
const appIconsMapper = (name) => {
  let key = String(name).toLowerCase().replace(/[- ]/g, '_')
  return appIcons[key] || appIcons.default
}

export default appIconsMapper
