// helper/appIcons.js

// appIcons maps app key/names to iView icons
const appIcons = {
  about: 'md-information-circle', // ios-star-outline
  check: 'md-checkmark', // checkmark-round
  default: 'ios-leaf',
  demo: 'md-apps',
  home: 'md-home',
  links: 'md-link',
  message_board: 'ios-more', // md-chatbubble, md-paper-plane
  move_backward: 'md-arrow-dropleft',
  move_forward: 'md-arrow-dropright',
  nav: 'navicon', // navicon-round
  perspectives: 'md-aperture',
  rules: 'md-lock', // md-calculator
  search: 'md-search',
  settings: 'md-settings', // md-options, ios-settings
  usage_and_help: 'md-help-circle',
  usage: 'md-help-circle'
}

// appIconsMapper returns an iView icon by name
const appIconsMapper = (name) => {
  let key = String(name).toLowerCase().replace(/[- ]/g, '_')
  return appIcons[key] || appIcons.default
}

export default appIconsMapper
