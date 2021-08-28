// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const { Position } = require("vscode");
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const sumCmd = vscode.commands.registerCommand("boostcode.sum", function () {
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

  const linesToArrayCmd = vscode.commands.registerCommand(
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

  const uniqueLinesCmd = vscode.commands.registerCommand(
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

  context.subscriptions.push(sumCmd, linesToArrayCmd, uniqueLinesCmd);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
