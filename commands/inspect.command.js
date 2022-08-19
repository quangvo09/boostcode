const vscode = require("vscode");

const cmd = vscode.commands.registerCommand(
  "boostcode.inspect",
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
      const fileName = document.fileName.split("/").reverse()[0]
      const logText = buildLogText(document.languageId, fileName, lineNumber, text)
      
      if (!logText) return

      editor.edit((editBuilder) => {
        const line = document.lineAt(lineNumber);
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

const buildLogText = (languageId, fileName, lineNumber, text) => {
  switch (languageId) {
    case "go": 
      return `\nfmt.Printf(\"🚀 Boostcode ~ file: ${fileName} ~ line ${lineNumber + 2}\, [${text}] = %+v", ${text})`

    case "python": 
      return `\nprint(\"🚀 Boostcode ~ file: ${fileName} ~ line ${lineNumber + 2}\, [${text}] = ", ${text})`
  }

  return null
}

module.exports = cmd