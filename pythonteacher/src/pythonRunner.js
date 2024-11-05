// src/pythonRunner.js

const { exec } = require('child_process');

/**
 * Runs the selected Python code using a Python subprocess and returns the output.
 * @param {string} code
 * @param {function(string): void} callback - A callback function to handle the output.
 */
function runPythonCode(code, callback) {
    const pythonCommand = `python -c "${code.replace(/"/g, '\\"')}"`;

    exec(pythonCommand, (error, stdout, stderr) => {
        if (error) {
            callback(`Error: ${stderr}`);
        } else {
            callback(`Output: ${stdout}`);
        }
    });
}

module.exports = { runPythonCode };