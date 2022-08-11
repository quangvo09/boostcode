const vscode = require("vscode");
const { Position } = require("vscode");

const cmd = vscode.commands.registerCommand(
  "boostcode.lines-to-array",
  function () {
    // The code you place here will be executed every time your command is executed
    // Get the active text editor
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const selection = editor.selection;

    // Get the word within the selection
    let lines = document.getText(selection).split("\n");
    if (lines[lines.length - 1] === "") {
      lines.pop();
    }
    const array = lines.map((line, index) => {
      let ret = `\t"${line.replace(/"/g, '\\"')}"`;
      if (index != lines.length - 1) {
        ret += ",";
      }
      return ret;
    });

    const position = editor.selection.end;
    const start = new Position(position.line + 1, 0);
    // Show the result
    editor
      .edit((editBuilder) => {
        editBuilder.insert(selection.end, "\n");
        editBuilder.insert(selection.end, "[\n");
        editBuilder.insert(selection.end, array.join("\n"));
        editBuilder.insert(selection.end, "\n]");
      })
      .then(() => {
        editor.selection = new vscode.Selection(start, editor.selection.end);
      });
  }
);

module.exports = cmd