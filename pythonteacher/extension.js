// extension.js
const vscode = require('vscode');
const { runPythonCode } = require('./src/pythonRunner');

/**
 * This function is called when the extension is activated.
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    let disposable = vscode.commands.registerCommand('pythonteacher.checkTask', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No editor is active');
            return;
        }

        const selectedText = editor.document.getText(editor.selection);
        if (!selectedText) {
            vscode.window.showErrorMessage('Please select some code to check');
            return;
        }

        try {
            runPythonCode(selectedText, (output) => {
                vscode.window.showInformationMessage(output);
            });
        } catch (error) {
            vscode.window.showErrorMessage('Error executing Python code: ' + error.message);
        }
    });

    context.subscriptions.push(disposable);
}

/**
 * This function is called when the extension is deactivated.
 */
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
