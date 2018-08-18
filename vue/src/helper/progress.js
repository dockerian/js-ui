// helper/progress.js

import moment from 'moment'
import config from '@/config'
import * as hc from '@/utils/htmlColor'

export const calcDays = (start, end) => {
  return moment(end).diff(start, 'days')
}

export const calcDaysByNow = (start) => {
  let now = new Date()
  return moment(now).diff(start, 'days')
}

export const calcPercent = (start, end) => {
  let now = new Date()
  return Math.round(Math.min(1,
    moment(now).diff(start, 'days') /
    moment(end).diff(start, 'days')) * 100)
}

const project = config.settings.project
const release = {
  ...project.releases[0],
  startDate: project.releases[0].startDate || project.startDate
}
const version = release.epic

export const progress = {
  colorEnd: 'green',
  colorStart: 'red',
  dateEnd: release.endDate,
  dateStart: release.startDate,
  percent: calcPercent(release.startDate, release.endDate),
  days: calcDays(release.startDate, release.endDate),
  daysByNow: calcDaysByNow(release.startDate)
}

const daysLeft = progress.days - progress.daysByNow
const beOnLiveInfo = daysLeft < 0
  ? `${-daysLeft} days ${version} live <br/>since ${progress.dateEnd}`
  : `${project.name} ${version} on live`

const progressInfo = daysLeft > 0
  ? `${daysLeft} days to ${version} release`
  : beOnLiveInfo

export const progressUpdate = (percent, hndProgressInterval) => {
  let x = Math.log10(1 + percent / 10)
  let percentage = percent + 0.5 * (1 + progress.percent * x / 10)
  if (percentage > progress.percent) {
    clearInterval(hndProgressInterval)
    percentage = progress.percent
  }
  return {
    percentage,
    percentColor: hc.getHslByPercent(percentage)
  }
}

export const progressVm = {
  percentage: 0,
  percentColor: hc.getHslByPercent(0, progress.colorStart, progress.colorEnd),
  progressPercent: progress.percent,
  progressInfo
}
