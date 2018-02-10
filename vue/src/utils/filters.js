// filters

export function leftPad (value) {
  if (value < 0) {
    return value
  }
  return (value < 10 ? '0' : '') + value
}

function pluralize (value, unit) {
  return value + ' ' + unit + (value > 1 ? 's' : '')
}

export function timeAgo (time) {
  const diff = Date.now() / 1000 - Number(time)
  const _min = 60
  const _hr1 = _min * 60 // 3600
  const _day = _hr1 * 24 // 86400
  const _mon = _day * 30 // 2592000
  const _yr1 = _day * 365 // 31536000

  if (diff < _hr1) {
    return pluralize(~~(diff / _min), ' minute')
  } else if (diff < _day) {
    return pluralize(~~(diff / _hr1), ' hour')
  } else if (diff < _mon) {
    return pluralize(~~(diff / _day), ' day')
  } else if (diff < _yr1) {
    return pluralize(~~(diff / _mon), ' month')
  } else {
    return pluralize(~~(diff / _yr1), ' year')
  }
}
