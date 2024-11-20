const runPythonCode = require('../src/pythonRunner');

module.exports = {
    question: "Define a variable 'x' and assign the integer value '10' to it. Then, print the value of 'x' to the console.",
    validateCode: (code, callback) => {
        let score = 0;

        // Create an array of promises
        const promises = [
            new Promise((resolve) => {
                let extraCode = `\nif not isinstance(x, int):\n    raise ValueError()`;
                // Ensure code is correctly modified and passed to runPythonCode
                let modifiedCode = code + extraCode;
            

                console.log(typeof modifiedCode);
                runPythonCode(modifiedCode, (status, output) => {
                    console.log(status);
                    if (status === 0) {
                        score += 33; // Update score if successful
                    }
                    resolve(); // Resolve after updating score
                });
            }),
            // new Promise((resolve) => {
            //     let extraCode = `\nif not isinstance(x, int):\n    raise ValueError()`;
            //     code += extraCode
            //     runPythonCode(code, (status, output) => {
            //         console.log(status);
            //         if (status == 0) score += 33;
            //         resolve();  // Resolve after updating score
            //     });
            // }),
            // new Promise((resolve) => {
            //     let extraCode = `\nif x != 10:\n    raise ValueError()`
            //     code += extraCode
            //     runPythonCode(code, (status, output) => {
            //         if (status == 0) score += 33;
            //         resolve();  // Resolve after updating score
            //     });
            // }),
            // new Promise((resolve) => {
            //     runPythonCode(code, (status, output) => {
            //         if (status == 0) {
            //             if (output.trim() === '10') score += 34;
            //             resolve();
            //         }
            //         resolve();  // Resolve after updating score
            //     });
            // }),

        ];
        // Wait for all promises to resolve
        Promise.all(promises)
            .then(() => {
                // Now you can return the updated score through the callback
                callback(score);
            })
            .catch((error) => {
                // Handle any error that occurs during the promises
                console.error("Error during validation:", error);
                callback(0);  // Return 0 if there's an error
            });
    }
};
