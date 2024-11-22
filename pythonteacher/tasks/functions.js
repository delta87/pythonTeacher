const runPythonCodeWi = require('../src/pythonRunnerWI');

module.exports = {
    question: `
# Write a Python program with the following:
# - A function named \`factorial\` that calculates the factorial of a given number.
# - The program should read an integer input \`n\` and print the factorial of \`n\` using the \`factorial\` function.
#
# Example:
# Input: 5
# Output: 120
#
n = int(input())
# Write your factorial function and the rest of your program below.
    `,

    validateCode: (code, callback) => {
        let score = 0;

        // Check if the code defines a function named `factorial`
        if (!code.includes('def factorial')) {
            console.log("Code must include a function named 'factorial'.");
            callback(0);
            return;
        }

        // Define test cases with input and expected output
        const testCases = [
            { input: '3\n', expectedOutput: '6\n', weight: 20 },
            { input: '5\n', expectedOutput: '120\n', weight: 20 },
            { input: '0\n', expectedOutput: '1\n', weight: 20 },
            { input: '10\n', expectedOutput: '3628800\n', weight: 20 },
            { input: '1\n', expectedOutput: '1\n', weight: 20 },
        ];

        const promises = testCases.map((testCase) => {
            return new Promise((resolve) => {
                runPythonCodeWi(code, testCase.input, (status, output) => {
                    // Strip trailing newlines from the output
                    const cleanedOutput = output.trim();

                    if (status === 0 && cleanedOutput === testCase.expectedOutput.trim()) {
                        console.log(`Test case passed! Adding ${testCase.weight} points.`);
                        score += testCase.weight;
                    } else {
                        console.log(`Test case failed. Expected: ${testCase.expectedOutput} but got: ${cleanedOutput}`);
                    }

                    resolve(); // Resolve the promise for this test case
                });
            });
        });

        // Wait for all promises to resolve
        Promise.all(promises)
            .then(() => callback(score))
            .catch((error) => {
                console.error("Error during validation:", error);
                callback(0);
            });
    },
};
