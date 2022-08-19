const vscode = require("vscode");

const cmd = vscode.commands.registerCommand(
  "boostcode.remove-inspect",
  function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const totalLines = document.lineCount;
    const pattern = buildPattern(document.languageId)

    if (!pattern) return

    editor.edit((editBuilder) => {
      for (let i = 0; i < totalLines - 1; i++) {
        const line = document.lineAt(i);
        if (pattern.test(line.text)) {
          editBuilder.delete(line.range);
        }
      }
    });
  }
);

const buildPattern = (languageId) => {
  switch (languageId) {
    case "elixir": 
      return /^\s*#*\s*\|> IO.inspect\(label: "🚀 Boostcode ~ file:/

    case "go": 
      return /^\s*fmt.Printf\("🚀 Boostcode ~ file:/
      
    case "python": 
      return /^\s*print\("🚀 Boostcode ~ file:/
  }

  return null
}


module.exports = cmd