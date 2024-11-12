const { exec } = require('child_process');

function runPythonCode(code, callback) {
    const pythonCommand = `python -c "${code.replace(/"/g, '\\"')}"`;

    exec(pythonCommand, (error, stdout, stderr) => {
        if (error) {
            callback(1, stderr);  // failure
        } else {
            callback(0, stdout);  // success
        }
    });
}

// Export the function directly
module.exports = runPythonCode;