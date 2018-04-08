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

const version = 'MVP'
const project = config.settings.project

export const progress = {
  colorEnd: 'green',
  colorStart: 'red',
  dateEnd: project.releases[version],
  dateStart: project.startDate,
  percent: calcPercent(project.startDate, project.releases[version]),
  days: calcDays(project.startDate, project.releases[version]),
  daysByNow: calcDaysByNow(project.startDate)
}

const daysLeft = progress.days - progress.daysByNow
const beOnLiveInfo = daysLeft < 0
  ? `${-daysLeft} days ${version} live`
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
