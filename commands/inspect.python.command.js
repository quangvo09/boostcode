const vscode = require("vscode");

const cmd = vscode.commands.registerCommand(
  "boostcode.python.inspect",
  function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const selection = editor.selection;

    if (!selection) return

    // Get the word within the selection
    const text = document.getText(selection);

    if (!text) return

    try {
      const lineNumber = selection.start.line
      const line = document.lineAt(lineNumber);
      const logText = `\nprint(\"🚀 Boostcode ~ file: ${document.fileName} ~ line ${selection.start.line + 2}\: ", ${text})`
      editor.edit((editBuilder) => {
        editBuilder.insert(line.range.end, logText);
      }).then(() => {
        const currentPosition = document.lineAt(lineNumber +1).range.end
        editor.selection = new vscode.Selection(currentPosition, currentPosition);
      });
    } catch (err) {
      vscode.window.showInformationMessage(
        "Selected text is not correct json format"
      );
    }
  }
);

module.exports = cmd