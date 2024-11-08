const vscode = require('vscode');
const SideBarViewProvider = require('./src/sideBar');

function activate(context) {
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('pythonTeacherSidebar', new SideBarViewProvider(context))
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pythonteacher.openLessonFile', (lessonContent) => {
            vscode.workspace.openTextDocument({ language: 'python' }).then(doc => {
                vscode.window.showTextDocument(doc).then(editor => {
                    editor.edit(editBuilder => {
                        editBuilder.insert(new vscode.Position(0, 0), `# Lesson Task:\n# ${lessonContent}\n\n`);
                    });
                });
            });
            showValidationButton(); // Show the validation button once the file is open
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pythonteacher.validateCode', () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const code = editor.document.getText();
                
                // Sample validation logic
                const isValid = validatePythonCode(code);
                if (isValid) {
                    vscode.window.showInformationMessage('✅ Code is correct!');
                } else {
                    vscode.window.showInformationMessage('❌ Code validation failed.');
                }
            }
        })
    );

    function showValidationButton() {
        // Create a status bar item to act as the floating button
        const button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        button.text = "✔️ Validate Code";  // Use a checkmark icon with Unicode green check
        button.command = "pythonteacher.validateCode";  // Set it to run the validation command
        button.tooltip = "Click to validate the Python code";  // Tooltip for more info
        button.show();  // Display the button in the status bar

        // Dispose of the button when the editor is closed
        context.subscriptions.push(button);
    }

    function validatePythonCode(code) {
        // Placeholder validation logic - modify this as needed
        return code.includes('alireza');
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
