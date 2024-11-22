const runPythonCodeWi = require('../src/pythonRunnerWI');

module.exports = {
    question: `
# Below is the first line of your Python program:
# \`numbers = input()\`
# Write the rest of the program below this line to:
# - Parse the input string \`numbers\` into a list of integers separated by spaces.
# - Perform the following operations on the list:
#   1. Print the largest number in the list in the format: "Largest: {result}"
#   2. Print the smallest number in the list in the format: "Smallest: {result}"
#   3. Print the sum of all numbers in the list in the format: "Sum: {result}"
#   4. Sort the list in ascending order and print it in the format: "Sorted List: {result}"
# 
# Example:
# Input: 5 3 8 1 2
# Output:
# Largest: 8
# Smallest: 1
# Sum: 19
# Sorted List: [1, 2, 3, 5, 8]
numbers = input()
        `,

    validateCode: (code, callback) => {
        let score = 0;

        // Define test cases with input and expected output
        const testCases = [
            {
                input: '5 3 8 1 2\n',
                expectedOutput: `Largest: 8\nSmallest: 1\nSum: 19\nSorted List: [1, 2, 3, 5, 8]`,
                weight: 25,
            },
            {
                input: '10 20 30 40 50\n',
                expectedOutput: `Largest: 50\nSmallest: 10\nSum: 150\nSorted List: [10, 20, 30, 40, 50]`,
                weight: 25,
            },
            {
                input: '-1 -5 -3 -4 -2\n',
                expectedOutput: `Largest: -1\nSmallest: -5\nSum: -15\nSorted List: [-5, -4, -3, -2, -1]`,
                weight: 25,
            },
            {
                input: '7\n',
                expectedOutput: `Largest: 7\nSmallest: 7\nSum: 7\nSorted List: [7]`,
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
