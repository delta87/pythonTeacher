const vscode = require('vscode');
const SideBarViewProvider = require('./src/sideBar');
const { task1, task2 } = require('./tasks/all_tasks.js');
const { exec } = require('child_process');

function checkPythonInstallation() {
    exec('python --version', (error, stdout, stderr) => {
        if (error) {
            vscode.window.showWarningMessage('برای استفاده از افزونه آموزشیار پایتون فارسی، لطفاً پایتون را روی سیستم خود نصب کنید.');
        }
    });
}

function activate(context) {
    checkPythonInstallation();
    
    const documentLessonMap = new Map();  // Map to store each document's lessonTitle

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('pythonTeacherSidebar', new SideBarViewProvider(context))
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pythonteacher.openSidebar', () => {
            vscode.commands.executeCommand('workbench.view.extension.pythonTeacherSidebar');
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pythonteacher.openLessonFile', (lessonTitle) => {
            vscode.workspace.openTextDocument({ language: 'python' }).then(doc => {
                var question;
                switch (lessonTitle) {
                    case 'Variables':
                        question = task1.question;
                        break;    
                    case 'DataTypes':
                        question = task2.question;
                        break;
                }

                // Associate this document with the lesson
                documentLessonMap.set(doc.uri.toString(), lessonTitle);

                vscode.window.showTextDocument(doc).then(editor => {
                    editor.edit(editBuilder => {
                        editBuilder.insert(new vscode.Position(0, 0), `# Lesson Task: ${lessonTitle}\n# ${question}\n\n`);
                    });
                    // Show the validation button for this specific lesson
                    showValidationButton(lessonTitle);
                });
            });
        })
    );

    let currentValidationButton = null;       // Track the current button
    let validateCommand = null;               // Track the command registration

    function showValidationButton(lessonTitle) {
        if (currentValidationButton) {
            currentValidationButton.dispose();
        }

        const button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        button.text = `✔️ Validate ${lessonTitle}`;
        button.command = `pythonteacher.validateCode.${lessonTitle}`;
        button.tooltip = `Click to validate the Python code for ${lessonTitle}`;
        button.show();

        currentValidationButton = button;

        if (validateCommand) {
            validateCommand.dispose();
        }

        validateCommand = vscode.commands.registerCommand(`pythonteacher.validateCode.${lessonTitle}`, () => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const code = editor.document.getText();

                validatePythonCode(code, lessonTitle, (score) => {
                    if (score === 100) {
                        vscode.window.showInformationMessage(`✅  Perfect! ${score}/100`);
                    } else if (score > 0 && score < 100) {
                        vscode.window.showInformationMessage(`⚠️  Some issues found. ${score}/100`);
                    } else {
                        vscode.window.showInformationMessage(`❌  Validation failed. ${score}/100`);
                    }
                });
            }
        });

        context.subscriptions.push(button, validateCommand);
    }

    function validatePythonCode(code, lessonTitle, callback) {
        switch (lessonTitle) {
            case 'Variables':
                task1.validateCode(code, callback);
                break;
            case 'DataTypes':
                task2.validateCode(code, callback);
                break;
            // Add other cases as needed
            default:
                callback(0); // Default to zero if lessonTitle doesn't match
        }
    }

    // Listen for changes in the active editor to update the validation button
    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            const lessonTitle = documentLessonMap.get(editor.document.uri.toString());
            if (lessonTitle) {
                showValidationButton(lessonTitle);
            } else if (currentValidationButton) {
                currentValidationButton.hide();  // Hide button if no lesson is associated
            }
        }
    });

    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
