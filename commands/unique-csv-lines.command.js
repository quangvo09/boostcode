const vscode = require("vscode");

const cmd = vscode.commands.registerCommand(
  "boostcode.unique-csv-lines",
  function () {
    // The code you place here will be executed every time your command is executed
    // Get the active text editor
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const lines = document.getText().split("\n");
    
    const uniqueLines = [];
    const columnMap = {}
    for (const line of lines) {
      const length = uniqueLines.length

      if (length == 0) {
        uniqueLines.push(line);
        continue;
      }

      const columns = line.split(",");
      const uniqueColumn = columns[0]

      if (length == 1) {
        uniqueLines.push(line);
        columnMap[uniqueColumn] = length
        continue;
      }

      const rowIndex = columnMap[uniqueColumn]
      if (rowIndex >= 0) {
        const mergedRow = mergeRows(uniqueLines[rowIndex], line)
        uniqueLines[rowIndex] = mergedRow
      } else {
        uniqueLines.push(line);
        columnMap[uniqueColumn] = length
      }
    }

    // Show the result
    editor.edit((editBuilder) => {
      const range = new vscode.Range(new vscode.Position(0, 0), new vscode.Position(lines.length, lines[lines.length - 1].length))
      editBuilder.delete(range)
      editBuilder.insert(new vscode.Position(0, 0), uniqueLines.join("\n"));
    });
  }
);

const mergeRows = (row1, row2) => {
  const firstColumns = row1.split(",")
  const secondColumns = row2.split(",")
  const length = Math.max(firstColumns.length, secondColumns.length)
  const columns = []

  for(let i = 0; i < length; i++) {
    columns.push(secondColumns[i] || firstColumns[i] || "")
  }

  return columns.join(",")
}
module.exports = cmd