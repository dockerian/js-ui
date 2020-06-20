// helper/elTable.js - functions for Elument UI Table (el-table) component

/**
  cellStyle is a function to provide CSS style for table cell.

  @see http://element.eleme.io/#/en-US/component/table#table-attributes
**/
export const cellStyle = ({ column }) => {
  let nowrap = {
    'white-space': 'nowrap'
  }
  let styles = { ...nowrap }
  // console.log(JSON.stringify(column, null, 2))
  switch (column.columnKey) {
    case 'pattern':
      styles = {
        ...styles,
        'font-family': 'Lucida Console,Courier New,Courier',
        'font-size': '10pt'
      }
      break
    case 'expand':
      styles = {
        ...styles,
        'padding': '0'
      }
      break
  }
  return styles
}

/**
  cellFormatter is a function to format cell content.

  @see http://element.eleme.io/#/en-US/component/table#table-column-attributes
**/
/* eslint-disable-next-line */
export const cellFormatter = (row, column, cellValue) => {
  switch (column.columnKey) {
    case 'created':
    case 'firstSeen':
    case 'lastSeen':
    case 'modified':
    case 'updated': {
      let newValue = cellValue || ''
      return newValue.substr(0, 10)
    }
    default:
      break
  }
  return cellValue
}

/**
  enforceOneRowExpand collapses all rows except the last one being expaned.

  @param {Object} row - the row data object.
  @param {Array} expandedRows - the expanded rows including the last one being expanded.
  @param {Object} elTableRef - the element reference registered by the table.

  @example <caption>Case-insensitive lookup</caption>
    <pre>
    <template>
      <el-table ref='elTableRef' @expand-change="onExpandChange"></el-table>
    </template>
    <script>
    import { enforceOneRowExpand } from '@/helper/elTable'
    var MyElTable = {
      methods: {
        onExpandChange: function (row, expandedRows) {
          enforceOneRowExpand(row, expandedRows, this.$refs.elTableRef)
        }
    </script>
    </pre>

  @see http://element.eleme.io/#/en-US/component/table#table-events
**/
export const enforceOneRowExpand = (row, expandedRows, elTableRef) => {
  let siz = expandedRows.length
  if (siz > 1) {
    for (let exr of expandedRows) {
      // console.log('comparing exr.id=', exr.id, ' row.id=', row.id)
      if (exr.id !== row.id) {
        // console.log('collaping row:', exr.id, JSON.stringify(exr, null, 2))
        elTableRef.toggleRowExpansion(exr, false)
      }
    }
  }
  return siz > 0
}

/**
  rowKey is a function to provide key of row data.

  @see http://element.eleme.io/#/en-US/component/table#table-attributes
**/
export const rowKey = (row) => {
  return row ? row.id : 0
}
