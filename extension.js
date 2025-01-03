const vscode = require('vscode');
const SideBarViewProvider = require('./src/sideBar');
const { task1, task2, task3, task4, task5, task6, task7, task8, task9, task10, task11, task12 } = require('./tasks/all_tasks.js');

function activate(context) {
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
                    case 'TypeCasting':
                        question = task3.question;
                        break;
                    case 'IfStatement':
                        question = task4.question;
                        break;
                    case 'Strings':
                        question = task5.question;
                        break;
                    case 'Operators':
                        question = task6.question;
                        break;
                    case 'Lists':
                        question = task7.question;
                        break;
                    case 'Tuples':
                        question = task8.question;
                        break;
                    case 'Sets':
                        question = task9.question;
                        break;
                    case 'Dictionaries':
                        question = task10.question;
                        break;   
                    case 'Loops':
                        question = task11.question;
                        break;
                    case 'Functions':
                        question = task12.question;
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
            case 'TypeCasting':
                task3.validateCode(code, callback);
                break;
            case 'IfStatement':
                task4.validateCode(code, callback);
                break;
            case 'Strings':
                task5.validateCode(code, callback);
                break;
            case 'Operators':
                task6.validateCode(code, callback);
                break;
            case 'Lists':
                task7.validateCode(code, callback);
                break;
            case 'Tuples':
                task8.validateCode(code, callback);
                break;
            case 'Sets':
                task9.validateCode(code, callback);
                break;
            case 'Dictionaries':
                task10.validateCode(code, callback);
                break;
            case 'Loops':
                task11.validateCode(code, callback);
                break;
            case 'Functions':
                task12.validateCode(code, callback);
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
