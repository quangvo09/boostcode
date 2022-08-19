const sumCmd = require('./sum.command')
const linesToArrayCmd = require('./lines-to-array.command')
const uniqueLinesCmd = require('./unique-lines.command')
const commentLogCmd = require('./comment-log.command')
const umcommentLogCmd = require('./uncomment-log.command')
const removeLogCmd = require('./remove-log.command')
const formatJsonCmd = require('./format-json.command')
const formatXmlCmd = require('./format-xml.command')
const uniqueCsvLinesCmd = require('./unique-csv-lines.command')
const inspectPythonCmd = require('./inspect.python.command')
const inspectGoCmd = require('./inspect.go.command')

module.exports.commands = [
  sumCmd,
  linesToArrayCmd,
  uniqueLinesCmd,
  commentLogCmd,
  umcommentLogCmd,
  removeLogCmd,
  formatJsonCmd,
  formatXmlCmd,
  uniqueCsvLinesCmd,
  inspectPythonCmd,
  inspectGoCmd,
]