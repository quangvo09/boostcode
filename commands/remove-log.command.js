const vscode = require("vscode");

const cmd = vscode.commands.registerCommand(
  "boostcode.remove-log",
  function () {
    // The code you place here will be executed every time your command is executed
    // Get the active text editor
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const totalLines = document.lineCount;

    editor.edit((editBuilder) => {
      for (let i = 0; i < totalLines - 1; i++) {
        const line = document.lineAt(i);
        if (/^\s*#*\s*\|> IO.inspect\(label: "🚀 Boostcode ~ file:/.test(line.text)) {
          editBuilder.delete(line.range);
        }
      }
    });
  }
);

module.exports = cmd