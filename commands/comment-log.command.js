const vscode = require("vscode");

const cmd = vscode.commands.registerCommand(
  "boostcode.comment-log",
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
        if (/^\s*\|> IO.inspect\(label: "🚀 ~ file:/.test(line.text)) {
          const str = line.text.replace(
            /^(\s*)\|> IO.inspect(.*)/,
            "$1# |> IO.inspect$2"
          );
          editBuilder.replace(line.range, str);
        }
      }
    });
  }
);

module.exports = cmd