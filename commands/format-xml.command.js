const vscode = require("vscode");
var xmlFormatter = require("xml-formatter");

const cmd = vscode.commands.registerCommand(
  "boostcode.format-xml",
  function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const selection = editor.selection;

    // Get the word within the selection
    try {
      const text = document.getText(selection).replace(/>\s+</gm, "><");
      const formatted = xmlFormatter(text, {
        indentation: " ",
        collapseContent: true,
        lineSeparator: "\n",
      });
      // Show the result
      editor.edit((editBuilder) => {
        editBuilder.delete(editor.selection);
        editBuilder.insert(selection.end, formatted);
      });
    } catch (err) {
      vscode.window.showInformationMessage(
        "Selected text is not correct xml format"
      );
    }
  }
);

module.exports = cmd