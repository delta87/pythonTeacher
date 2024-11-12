// const { exec } = require('child_process');

// function runPythonCode(code) {
//     const pythonCommand = `python -c "${code.replace(/"/g, '\\"')}"`;

//     return new Promise((resolve, reject) => {
//         exec(pythonCommand, (error, stdout, stderr) => {
//             if (error) {
//                 reject(1);  // failure
//             } else {
//                 resolve(0);  // success
//             }
//         });
//     });
// }

// // Export the function directly
// module.exports = runPythonCode;

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