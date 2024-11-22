const runPythonCodeWi = require('../src/pythonRunnerWI');

module.exports = {
    question: `
# Below is the first line of your Python program:
# \`numbers = input()\`
# Write the rest of the program below this line to:
# - Parse the input string \`numbers\` into two integers separated by a space.
# - Perform the following operations on the two integers:
#   - Add them and print the result in the format: "Sum: {result}"
#   - Subtract the second number from the first and print: "Difference: {result}"
#   - Multiply them and print: "Multiplication Result: {result}"
#   - If the second number is not zero, divide the first by the second and print: "Quotient: {result:.2f}"
#   - If the second number is zero, print: "Division by zero is not allowed."
# 
# Each operation should be printed on a new line.
#
# Example:
# Input: 10 5
# Output:
# Sum: 15
# Difference: 5
# Multiplication Result: 50
# Quotient: 2.00
#
# Input: 8 0
# Output:
# Sum: 8
# Difference: 8
# Multiplication Result: 0
# Division by zero is not allowed.
numbers = input()
        `,

    validateCode: (code, callback) => {
        let score = 0;

        // Define test cases with input and expected output
        const testCases = [
            {
                input: '10 5\n',
                expectedOutput: `Sum: 15\nDifference: 5\nMultiplication Result: 50\nQuotient: 2.00`,
                weight: 25,
            },
            {
                input: '7 -3\n',
                expectedOutput: `Sum: 4\nDifference: 10\nMultiplication Result: -21\nQuotient: -2.33`,
                weight: 25,
            },
            {
                input: '8 0\n',
                expectedOutput: `Sum: 8\nDifference: 8\nMultiplication Result: 0\nDivision by zero is not allowed.`,
                weight: 25,
            },
            {
                input: '-4 -6\n',
                expectedOutput: `Sum: -10\nDifference: 2\nMultiplication Result: 24\nQuotient: 0.67`,
                weight: 25,
            },
        ];

        const promises = testCases.map((testCase) => {
            return new Promise((resolve) => {
                runPythonCodeWi(code, testCase.input, (status, output) => {
                    if (status === 0 && output === testCase.expectedOutput) {
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
                console.error("Error during validation:", error);
                callback(0);
            });
    },
};
