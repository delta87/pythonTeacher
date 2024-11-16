const runPythonCode = require('../src/pythonRunner');

module.exports = {
    question: `Write a Python program that uses a \`for\` loop and the \`range\` function to print numbers from 1 to 10.`,

    validateCode: (code, callback) => {
        let score = 0;

        const promises = [
            // Check if the code contains a `for` loop
            new Promise((resolve) => {
                const extraCode = `
if 'for' not in """${code}""":
    raise ValueError("No 'for' loop found in the code")
`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 20; // Add 20 points for including a `for` loop
                    resolve();
                });
            }),

            // Check if `range(1, 11)` is used
            new Promise((resolve) => {
                const extraCode = `
if 'range(1, 11)' not in """${code}""":
    raise ValueError("The range(1, 11) function is not used correctly")
`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 30; // Add 30 points for using `range(1, 11)`
                    resolve();
                });
            }),

            new Promise((resolve) => {
                runPythonCode(code, (status, output) => {
                    // Debugging logs
                    console.log("Executing code:\n", code);
                    console.log("Python runner status:", status);
                    console.log("Raw output from Python runner:", output);
            
                    // Generate the expected output as a string with consistent newlines
                    const expectedOutput = Array.from({ length: 10 }, (_, i) => (i + 1).toString()).join('\n');
            
                    if (status === 0) {
                        // Normalize both expected and actual outputs
                        const normalizedOutput = output.trim().replace(/\r\n/g, '\n');
                        const normalizedExpected = expectedOutput.trim().replace(/\r\n/g, '\n');
            
                        if (normalizedOutput === normalizedExpected) {
                            score += 50; // Add 50 points for correct output
                        } else {
                            console.error("Output mismatch. Expected:\n", normalizedExpected, "\nGot:\n", normalizedOutput);
                        }
                    } else {
                        console.error("Python code execution failed with status:", status);
                    }
            
                    resolve(); // Always resolve to avoid hanging the promise
                });
            }),   
        ];

        // Wait for all promises to resolve
        Promise.all(promises)
            .then(() => {
                callback(score);
            })
            .catch((error) => {
                console.error("Error during validation:", error);
                callback(0); // Return 0 in case of an error
            });
    },
};
