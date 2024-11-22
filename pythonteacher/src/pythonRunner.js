
const { spawn } = require('child_process');

function runPythonCode(code, callback) {
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
}

module.exports = runPythonCode;
