const Papa = require("papaparse");
const vscode = require("vscode");

const csvToJson = (csvString) => {
  const results = Papa.parse(csvString, { header: true });
  return JSON.stringify(results.data, null, 2);
};

const cmd = vscode.commands.registerCommand(
  "boostcode.csv-to-json",
  async function () {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const selection = editor.selection;

    // Get the word within the selection
    const text = document.getText(selection);
    try {
      const result = csvToJson(text);
      // Create new document
      const newDocument = await vscode.workspace.openTextDocument({
        content: "",
        language: "json",
      });
      // Open the new document
      const editor = await vscode.window.showTextDocument(newDocument);
      // Set its content
      await editor.edit((editBuilder) => {
        editBuilder.insert(new vscode.Position(0, 0), result);
      });
    } catch (err) {
      vscode.window.showInformationMessage(
        "Selected text is not correct json format"
      );
    }
  }
);

module.exports = cmd;
