// // The module 'vscode' contains the VS Code extensibility API
// // Import the module and reference it with the alias vscode in your code below
// const vscode = require('vscode');

// // This method is called when your extension is activated
// // Your extension is activated the very first time the command is executed

// /**
//  * @param {vscode.ExtensionContext} context
//  */
// function activate(context) {

// 	// Use the console to output diagnostic information (console.log) and errors (console.error)
// 	// This line of code will only be executed once when your extension is activated
// 	console.log('Congratulations, your extension "pythonteacher" is now active!');

// 	// The command has been defined in the package.json file
// 	// Now provide the implementation of the command with  registerCommand
// 	// The commandId parameter must match the command field in package.json
// 	const disposable = vscode.commands.registerCommand('pythonteacher.helloWorld', function () {
// 		// The code you place here will be executed every time your command is executed

// 		// Display a message box to the user
// 		vscode.window.showInformationMessage('Hello World from PythonTeacher!');
// 	});

// 	context.subscriptions.push(disposable);
// }

// // This method is called when your extension is deactivated
// function deactivate() {}

// module.exports = {
// 	activate,
// 	deactivate
// }



const vscode = require('vscode');
const { exec } = require('child_process');

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
 * Runs the selected Python code using a Python subprocess and returns the output.
 * @param {string} code
 * @param {function(string): void} callback - A callback function to handle the output.
 */
function runPythonCode(code, callback) {
    // Save the Python code to a temporary file
    const pythonCommand = `python -c "${code.replace(/"/g, '\\"')}"`;

    exec(pythonCommand, (error, stdout, stderr) => {
        if (error) {
            callback(`Error: ${stderr}`);
        } else {
			console.log(stdout);
            callback(`Output: ${stdout}`);
        }
    });
}

/**
 * This function is called when the extension is deactivated.
 */
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
