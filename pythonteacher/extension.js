const vscode = require('vscode');
const SideBarViewProvider = require('./src/sideBar');
const { task1, task2 } = require('./tasks/all_tasks.js');


function activate(context) {
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('pythonTeacherSidebar', new SideBarViewProvider(context))
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
        // Dispose of the old button if it exists
        if (currentValidationButton) {
            currentValidationButton.dispose();
        }

        // Create a new status bar item for the validation button
        const button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        button.text = `✔️ Validate ${lessonTitle}`;  // Display lesson-specific text
        button.command = 'pythonteacher.validateCode';  // Set the validation command string
        button.tooltip = `Click to validate the Python code for ${lessonTitle}`;  // Tooltip with lesson-specific info
        button.show();  // Display the button in the status bar

        // Store the new button reference
        currentValidationButton = button;

        // Unregister the previous command if it exists
        if (validateCommand) {
            validateCommand.dispose();
        }

        // Register the command and store the registration so it can be disposed of later
        validateCommand = vscode.commands.registerCommand('pythonteacher.validateCode', () => {
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

        // Add both button and command to the context subscriptions
        context.subscriptions.push(button, validateCommand);
    }


    // Sample validation logic, adjusted for lesson-specific validation
    function validatePythonCode(code, lessonTitle, callback) {
        // Adjust validation logic based on the lesson title
        switch (lessonTitle) {
            case 'Variables':
                task1.validateCode(code, (result) => {
                    callback(result)})
                break;

            case 'DataTypes':
                task2.validateCode(code, (result) => {
                    callback(result)})
                break;
                
    
            case 'TypeCasting':    
                break;
                
    
            case 'Strings':
                // Add validation logic for Strings lesson
                if (!code.includes('"') && !code.includes("'")) {
                    return 'Strings should be enclosed in quotes, either single or double.';
                }
                break;
    
            case 'Operators':
                // Add validation logic for Operators lesson
                if (!/[+\-*/]/.test(code)) {
                    return 'Please use an operator like +, -, *, or / in your code.';
                }
                break;
    
            case 'Lists':
                // Add validation logic for Lists lesson
                if (!code.includes('[') || !code.includes(']')) {
                    return 'A list should be defined with square brackets [].';
                }
                break;
    
            case 'Tuples':
                // Add validation logic for Tuples lesson
                if (!code.includes('(') || !code.includes(')')) {
                    return 'A tuple should be defined with parentheses ().';
                }
                break;
    
            case 'Sets':
                // Add validation logic for Sets lesson
                if (!code.includes('{') || !code.includes('}')) {
                    return 'A set should be defined with curly braces {}.';
                }
                break;
    
            case 'Dictionaries':
                // Add validation logic for Dictionaries lesson
                if (!code.includes(':')) {
                    return 'A dictionary should use a colon (:) to separate keys and values.';
                }
                break;
    
            case 'Loops':
                // Add validation logic for Loops lesson
                if (!/for\s+\w+\s+in\s+\w+/.test(code) && !/while\s+\w+/.test(code)) {
                    return 'Loops should be defined using for or while syntax.';
                }
                break;
    
            case 'Functions':
                // Add validation logic for Functions lesson
                if (!code.includes('def ')) {
                    return 'Functions should be defined using the "def" keyword.';
                }
                break;
    
            default:
                // Default case if lessonTitle doesn't match
                return 'Unknown lesson. Please select a valid lesson to validate the code.';
        }
    
        // If all validations pass, return true
        return true;
    }
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};




