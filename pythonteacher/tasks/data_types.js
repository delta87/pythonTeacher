const runPythonCode = require('../src/pythonRunner');

module.exports = {
    question: "Define variables 'a' as an integer, 'b' as a float, 'c' as a string, and 'd' as a boolean.",
    validateCode: (code, callback) => {
        let score = 0;

        const promises = [
            new Promise((resolve) => {
                let extraCode = `\nif not isinstance(a, int):\n    raise ValueError("a is not an integer")`;
                runPythonCode(code + extraCode, (status) => {
                    if (status == 0) score += 25;
                    resolve();
                });
            }),
            new Promise((resolve) => {
                let extraCode = `\nif not isinstance(b, float):\n    raise ValueError("b is not a float")`;
                runPythonCode(code + extraCode, (status) => {
                    if (status == 0) score += 25;
                    resolve();
                });
            }),
            new Promise((resolve) => {
                let extraCode = `\nif not isinstance(c, str):\n    raise ValueError("c is not a string")`;
                runPythonCode(code + extraCode, (status) => {
                    if (status == 0) score += 25;
                    resolve();
                });
            }),
            new Promise((resolve) => {
                let extraCode = `\nif not isinstance(d, bool):\n    raise ValueError("d is not a boolean")`;
                runPythonCode(code + extraCode, (status) => {
                    if (status == 0) score += 25;
                    resolve();
                });
            }),

        ];

        // Wait for all promises to resolve
        Promise.all(promises)
            .then(() => {
                callback(score); // Return the score after all checks
            })
            .catch((error) => {
                callback(0); // Return 0 if there's an error
            });
    }
};
