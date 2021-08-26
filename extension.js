// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "boostcode.sum",
    function () {
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
      editor.edit((editBuilder) => {
        editBuilder.insert(selection.end, `\nSum: ${sum}`);
      });
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
