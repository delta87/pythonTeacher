const runPythonCodeWi = require('../src/pythonRunnerWI');

module.exports = {
    question: `
# Below is the first line of your Python program:
# \`n = int(input())\`
# Write the rest of the program below this line to:
# - Calculate the sum of squares of the first \`n\` positive integers.
# - Print the result.
# 
# Example:
# Input: 3
# Output: 14
# (Explanation: 1^2 + 2^2 + 3^2 = 14)
#
n = int(input())
        `,

    validateCode: (code, callback) => {
        let score = 0;

        // Define test cases with input and expected output
        const testCases = [
            { input: '3\n', expectedOutput: '14', weight: 15 },
            { input: '5\n', expectedOutput: '55', weight: 15 },
            { input: '1\n', expectedOutput: '1', weight: 10 },
            { input: '10\n', expectedOutput: '385', weight: 20 },
            { input: '20\n', expectedOutput: '2870', weight: 20 },
            { input: '100\n', expectedOutput: '338350', weight: 20 },
        ];

        const promises = testCases.map((testCase) => {
            return new Promise((resolve) => {
                runPythonCodeWi(code, testCase.input, (status, output) => {
                    const cleanedOutput = output.trim(); // Remove whitespace/newlines
                    if (status === 0 && cleanedOutput === testCase.expectedOutput) {
                        score += testCase.weight;
                    }
                    resolve();
                });
            });
        });

        // Wait for all promises to resolve
        Promise.all(promises)
            .then(() => callback(score))
            .catch((error) => {
                callback(0);
            });
    },
};
