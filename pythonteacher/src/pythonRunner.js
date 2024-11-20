// const { spawn } = require('child_process');

// function runPythonCode(code, userInput = '', callback) {
//     const pythonProcess = spawn('python', ['-c', code]);

//     let output = '';
//     let error = '';

//     // Capture stdout
//     pythonProcess.stdout.on('data', (data) => {
//         output += data.toString();
//     });

//     // Capture stderr
//     pythonProcess.stderr.on('data', (data) => {
//         error += data.toString();
//     });

//     // Handle process completion
//     pythonProcess.on('close', (code) => {
//         if (code === 0) {
//             callback(0, output.trim()); // Success
//         } else {
//             callback(1, error.trim()); // Failure
//         }
//     });

//     // Provide input to the Python script if provided
//     if (userInput != '') {
//         pythonProcess.stdin.write(userInput);
//         pythonProcess.stdin.end();
//     } else {
//         // If no user input, just end the input stream
//         pythonProcess.stdin.end();
//     }
// }

// module.exports = runPythonCode;

const { spawn } = require('child_process');

function runPythonCode(code, userInput = '', callback) {
    const pythonProcess = spawn('python', ['-c', code]);

    let output = '';
    let error = '';

    // Capture stdout
    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    // Capture stderr
    pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
        if (code === 0) {
            callback(0, output.trim()); // Success
        } else {
            callback(1, error.trim()); // Failure
        }
    });

    // Ensure userInput is a string before writing to stdin
    if (typeof userInput === 'string') {
        pythonProcess.stdin.write(userInput);
    } else if (typeof userInput === 'function') {
        // If userInput is a function, execute it and pass the result to stdin
        const result = userInput();
        if (typeof result === 'string') {
            pythonProcess.stdin.write(result);
        } else {
            callback(1, 'Error: Function must return a string.');
            return;
        }
    } else {
        callback(1, 'Error: Invalid input type.');
        return;
    }

    pythonProcess.stdin.end();
}

module.exports = runPythonCode;
