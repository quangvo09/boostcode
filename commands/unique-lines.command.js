const vscode = require("vscode");

const cmd = vscode.commands.registerCommand(
  "boostcode.unique-lines",
  function () {
    // The code you place here will be executed every time your command is executed
    // Get the active text editor
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const selection = editor.selection;

    // Get the word within the selection
    const lines = document.getText(selection).split("\n");
    const uniqueLines = [];
    for (const line of lines) {
      if (!uniqueLines.includes(line)) {
        uniqueLines.push(line);
      }
    }

    // Show the result
    editor.edit((editBuilder) => {
      editBuilder.delete(editor.selection);
      editBuilder.insert(selection.end, uniqueLines.join("\n"));
    });
  }
);

module.exports = cmd