const sumCmd = require("./sum.command");
const linesToArrayCmd = require("./lines-to-array.command");
const uniqueLinesCmd = require("./unique-lines.command");
const commentLogCmd = require("./comment-log.command");
const umcommentLogCmd = require("./uncomment-log.command");
const removeLogCmd = require("./remove-log.command");
const formatJsonCmd = require("./format-json.command");
const formatXmlCmd = require("./format-xml.command");
const uniqueCsvLinesCmd = require("./unique-csv-lines.command");
const inspectCmd = require("./inspect.command");
const removeInspectCmd = require("./remove-inspect.command");
const csvToJsonCmd = require("./csv-to-json.command");
const addCursorsCmd = require("./add-cursors.command");

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
  inspectCmd,
  removeInspectCmd,
  csvToJsonCmd,
  addCursorsCmd,
];
