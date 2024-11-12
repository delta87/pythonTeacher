const vscode = require('vscode');
const SideBarViewProvider = require('./src/sideBar');

function activate(context) {
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('pythonTeacherSidebar', new SideBarViewProvider(context))
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pythonteacher.openLessonFile', (lessonTitle) => {
            vscode.workspace.openTextDocument({ language: 'python' }).then(doc => {
                
                vscode.window.showTextDocument(doc).then(editor => {
                    editor.edit(editBuilder => {
                        // TODO
                        // Add lesson task at the beginning of the file
                        editBuilder.insert(new vscode.Position(0, 0), `# Lesson Task: ${lessonTitle}\n#\n\n`);
                    });
                    // Show the validation button for this specific lesson
                    showValidationButton(lessonTitle);
                });
            });
        })
    );


    context.subscriptions.push(
        vscode.commands.registerCommand('pythonteacher.validateCode', (lessonTitle) => {
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                const code = editor.document.getText();

                // Sample validation logic based on lesson title
                const isValid = validatePythonCode(code, lessonTitle);
                if (isValid) {
                    vscode.window.showInformationMessage(`✅ ${lessonTitle} code is correct!`);
                } else {
                    vscode.window.showInformationMessage(`❌ ${lessonTitle} code validation failed.`);
                }
            }
        })
    );

    function showValidationButton(lessonTitle) {
        // Create a status bar item for the floating validation button
        const button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        button.text = `✔️ Validate ${lessonTitle}`;  // Display lesson-specific text
        button.command = "pythonteacher.validateCode";  // Set the validation command
        button.tooltip = `Click to validate the Python code for ${lessonTitle}`;  // Tooltip with lesson-specific info
        button.show();  // Display the button in the status bar

        // Dispose of the button when the editor is closed
        context.subscriptions.push(button);
    }

    // Sample validation logic, adjusted for lesson-specific validation
    function validatePythonCode(code, lessonTitle) {
        // Adjust validation logic based on the lesson title
        switch (lessonTitle) {
            case 'Variables':
                // Add validation logic for the Variables lesson
                if (!code.includes('=') || code.split('=').length !== 2) {
                    return 'Variable assignment seems incorrect. Make sure you are assigning a value to a variable.';
                }
                break;
    
            case 'DataTypes':
                // Add validation logic for the Data Types lesson
                if (!/^(int|float|str|list|tuple|dict|set)$/.test(code)) {
                    return 'Please use a valid data type like int, float, str, list, tuple, dict, or set.';
                }
                break;
    
            case 'TypeCasting':
                // Add validation logic for Type Casting lesson
                if (!code.includes('int(') && !code.includes('float(') && !code.includes('str(')) {
                    return 'Please use a type casting function like int(), float(), or str() for conversion.';
                }
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




