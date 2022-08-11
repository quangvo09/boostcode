const vscode = require("vscode");

const cmd = vscode.commands.registerCommand(
  "boostcode.format-json",
  function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const selection = editor.selection;

    // Get the word within the selection
    const text = document.getText(selection);
    try {
      const formatted = JSON.stringify(JSON.parse(text), null, 2);
      // Show the result
      editor.edit((editBuilder) => {
        editBuilder.delete(editor.selection);
        editBuilder.insert(selection.end, formatted);
      });
    } catch (err) {
      vscode.window.showInformationMessage(
        "Selected text is not correct json format"
      );
    }
  }
);

module.exports = cmd