const vscode = require("vscode");

const cmd = vscode.commands.registerCommand("boostcode.sum", function () {
  // The code you place here will be executed every time your command is executed
  // Get the active text editor
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const document = editor.document;
  const selection = editor.selection;

  // Get the word within the selection
  const lines = document.getText(selection).split("\n");
  const sum = lines.reduce((acc, value) => {
    const num = +value;
    if (isNaN(num)) return acc;
    return acc + num;
  }, 0);

  // Show the result
  editor
    .edit((editBuilder) => {
      editBuilder.insert(selection.end, `\nSum: ${sum}`);
    })
    .then(() => {
      editor.selection = new vscode.Selection(
        editor.selection.end,
        editor.selection.end
      );
    });
});

module.exports = cmd