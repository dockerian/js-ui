// utils/browser.js

import * as json2csv from 'json2csv'
import dateformat from 'dateformat'
import download from 'downloadjs'

// maximum view port size in [width, height]
const MAXIMUM_VIEW_PORT_SIZE = [3840, 2400]
// minimum view port size in [width, height]
const MINIMUM_VIEW_PORT_SIZE = [300, 200]

/**
  checkViewPortSize checks and returns a valid view port size within limits.

  @param {Array} v - view port size in [with, height].

  @return {Array} corrected view port size in limits.
**/
export const checkViewPortSize = (v) => {
  let maxW = MAXIMUM_VIEW_PORT_SIZE[0]
  let minW = MINIMUM_VIEW_PORT_SIZE[0]
  let maxH = MAXIMUM_VIEW_PORT_SIZE[1]
  let minH = MINIMUM_VIEW_PORT_SIZE[1]
  let half = MAXIMUM_VIEW_PORT_SIZE.map(e => e / 2)
  let size = v && v.height && v.width ? v : { height: half[1], width: half[0] }
  size.height = Math.max(Math.min(size.height, maxH), minH) || half[1]
  size.width = Math.max(Math.min(size.width, maxW), minW) || half[0]
  return size
}

/**
  downloadFile creates a clickable HTML element (a) to download file in browser.

  @param {Object} params - params including data/url, filename, contentType, and encoding

  @see https://github.com/eligrey/FileSaver.js
**/
export const downloadFile = function (params) {
  let options = params || {}
  let data = options.data || ''
  let filename = options.filename || ''
  let contentType = options.contentType || 'text/plain'
  let encoding = options.encoding || 'utf-8'
  let url = options.url || ''

  let link = document.createElement('a')
  let href = url || `data:${contentType};charset:${encoding},${encodeURIComponent(data)}`
  link.setAttribute('href', href)
  link.setAttribute('download', filename)
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
  Export data to a file to be formatted and downloaded in the browser.

  @param {Object} data - the source data to be exported.
  @param {Object} exportOptions - the export options, in format of

  ```
  {
    format: `(json|csv)`,
    filename: 'file name to be saved',
    columns: `[...fieldNamesToParseDataToCsvFormat]`,
    indent: `number of spaces indent for JSON format`,
    download: (true|false)
  }
  ```

  @return {Object} transformed data to be exported.
**/
export const exportFile = function (data, exportOptions) {
  let options = exportOptions || {}
  let dataFormat = String(options.format || '').toLowerCase() || 'json'
  let fileName = String(options.filename || '') || dateformat(new Date(), 'yyyymmdd_HHMMss') + `.${dataFormat}`
  let sample = (Array.isArray(data) ? data[0] : data) || {}
  let columns = options.columns || Object.keys(sample)
  let jsonIndent = options.indent || 2
  let mime = options.mime
  let result

  switch (dataFormat) {
    case 'csv':
      result = json2csv.parse(data, { fields: columns })
      mime = mime || 'text/csv'
      break
    case 'json':
      result = JSON.stringify(data, null, jsonIndent)
      mime = mime || 'application/json'
      break
    case 'zip':
      result = data
      mime = mime || 'application/zip'
      break
    default:
      console.log(`Exporting ${dataFormat} format is not implemented.`)
      break
  }

  if (result && options.download) {
    console.log(`downloading '${fileName}' [mime: ${mime}, size: ${result.length}] ...`)
    download(result, fileName, mime)
  }

  return result
}
