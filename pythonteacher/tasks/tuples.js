const runPythonCodeWi = require('../src/pythonRunnerWI');

const compareStrings = require('../src/compareStrings'); 

module.exports = {
    question: `
# Below is the first line of your Python program:
# \`numbers = input()\`
# Write the rest of the program below this line to:
# - Parse the input string \`numbers\` into a tuple of integers separated by spaces.
# - Perform the following operations on the tuple:
#   1. Print the length of the tuple in the format: "Length: {result}"
#   2. Print the first and last elements of the tuple in the format: 
#      "First Element: {first}" and "Last Element: {last}"
#   3. Check if the number 5 exists in the tuple. If it does, print: "5 is in the tuple."
#      Otherwise, print: "5 is not in the tuple."
#   4. Print the reversed tuple in the format: "Reversed Tuple: {result}"
# 
# Example:
# Input: 10 20 5 40
# Output:
# Length: 4
# First Element: 10
# Last Element: 40
# 5 is in the tuple.
# Reversed Tuple: (40, 5, 20, 10)
#
# Input: 1 2 3 4
# Output:
# Length: 4
# First Element: 1
# Last Element: 4
# 5 is not in the tuple.
# Reversed Tuple: (4, 3, 2, 1)
numbers = input()
        `,

    validateCode: (code, callback) => {
        let score = 0;

        // Define test cases with input and expected output
        const testCases = [
            {
                input: '10 20 5 40\n',
                expectedOutput: `Length: 4\nFirst Element: 10\nLast Element: 40\n5 is in the tuple.\nReversed Tuple: (40, 5, 20, 10)`,
                weight: 25,
            },
            {
                input: '1 2 3 4\n',
                expectedOutput: `Length: 4\nFirst Element: 1\nLast Element: 4\n5 is not in the tuple.\nReversed Tuple: (4, 3, 2, 1)`,
                weight: 25,
            },
            {
                input: '5\n',
                expectedOutput: `Length: 1\nFirst Element: 5\nLast Element: 5\n5 is in the tuple.\nReversed Tuple: (5,)`,
                weight: 25,
            },
            {
                input: '100 -50 25\n',
                expectedOutput: `Length: 3\nFirst Element: 100\nLast Element: 25\n5 is not in the tuple.\nReversed Tuple: (25, -50, 100)`,
                weight: 25,
            },
        ];

        const promises = testCases.map((testCase) => {
            return new Promise((resolve) => {
                runPythonCodeWi(code, testCase.input, (status, output) => {
                    if (status === 0 && compareStrings(testCase.expectedOutput, output)) {
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
