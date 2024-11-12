const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');


async function readAndLogJsonKeys() {
    const exercisesPath = path.join(__dirname, 'src/exercises.json');

    try {
        const data = await fs.promises.readFile(exercisesPath, 'utf8');
        const exercises = JSON.parse(data); 
        return exercises; 
    } catch (err) {
        console.error('Error loading or parsing exercises JSON file.');
        return null;
    }
}

function Execute(code) {
    return new Promise((resolve, reject) => {
      fs.writeFileSync('temp_script.py', code);
  
      exec('python temp_script.py', (error, stdout, stderr) => {
        if (error) {
          reject(`exec error: ${error}`);
          return;
        }
        console.error(`stderr: ${stderr}`);
        resolve(stdout); 
      });
    });
  }

  async function compareWithTestCases(userCode, testCases) {
    let correctTests = 0;
    let results = [];
    
    for (const testCase of testCases) {
        const { input, output } = testCase;
        const fullCode = `input=${input}\n${userCode}`;
        const userOutput = await Execute(fullCode); 
        //console.log(`This is userOutput -> ${userOutput}`);
        if (userOutput.trim() === output.trim()) {
            correctTests++;
            results.push(`Test passed for input: ${input}`);
            console.log(`Test passed for input: ${input}`)
            
        } else {
            results.push(`Test failed for input: ${input}. Expected: ${output}, but got: ${userOutput}`);
            console.log(`Test failed for input: ${input}. Expected: ${output}, but got: ${userOutput}`)
        }
    }
    return results;
}

function activate(context) {
    let testCases;


    let exerciseCommand = vscode.commands.registerCommand('pythonteacher.Exercise', async function () {
        const exercises = await readAndLogJsonKeys();
        const categories = Object.keys(exercises); 
        const selectedCategory = await vscode.window.showQuickPick(categories, {
            placeHolder: "Select a category"
        });

        if (selectedCategory) {
            let selectedExercises = [];
            if (selectedCategory === 'operator') {
                selectedExercises = exercises.operator;
            } else if (selectedCategory === 'list') {
                selectedExercises = exercises.list;
            } 
            const exerciseTitles = selectedExercises.map(exercise => exercise.title);

            const selectedExerciseTitle = await vscode.window.showQuickPick(exerciseTitles, {
                placeHolder: `Select an exercise from ${selectedCategory}`
            });

            if (selectedExerciseTitle) {
                const selectedExercise = selectedExercises.find(exercise => exercise.title === selectedExerciseTitle);
                testCases = selectedExercise.io;
                vscode.window.showInformationMessage(`You selected: ${selectedExercise.title}`);

                const doc = await vscode.workspace.openTextDocument({ content: `# ${selectedExercise.title}\n # Description :  ${selectedExercise.description} \n# Write your answer below:\n`, language: 'python' });
                await vscode.window.showTextDocument(doc, { preview: false });
            }
        }
    });


    let TaskCheckCommand = vscode.commands.registerCommand('pythonteacher.checkTask', async function () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found!');
            return;
        }

        const userCode = editor.document.getText(); 
        try {
            await compareWithTestCases(userCode, testCases); 

        } catch (error) {
            console.error('Error:', error);  
        }     
    });


    context.subscriptions.push(TaskCheckCommand, exerciseCommand);
}



function deactivate() {}

module.exports = {
    activate,
    deactivate
};
