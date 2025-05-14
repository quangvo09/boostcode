const vscode = require("vscode");

const cmd = vscode.commands.registerCommand(
  "boostcode.add-cursors",
  function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const selection = editor.selection;

    // Get the selected text
    const selectedText = document.getText(selection);
    if (!selectedText) return;

    // Find all matches of the selected text in the document
    const text = document.getText();
    const matches = [];
    let match;
    const regex = new RegExp(escapeRegExp(selectedText), "g");

    while ((match = regex.exec(text)) !== null) {
      const position = document.positionAt(match.index);
      matches.push(
        new vscode.Selection(
          position,
          position.translate(0, selectedText.length)
        )
      );
    }

    // Set the selections
    editor.selections = matches;
  }
);

// Helper function to escape special characters in regex
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = cmd;
