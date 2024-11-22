const runPythonCodeWi = require('../src/pythonRunnerWI');

module.exports = {
    question: `
# Below is the first line of your Python program:
# \`numbers = input()\`
# Write the rest of the program below this line to:
# - Parse the input string \`numbers\` into a set of integers separated by spaces.
# - Perform the following operations on the set:
#   1. Print the unique elements in the format: "Unique Elements: {result}" (sorted in ascending order).
#   2. Print the largest and smallest elements in the format: 
#      "Largest: {largest}" and "Smallest: {smallest}".
#   3. Add the number 100 to the set, then print the updated set in the format: 
#      "Updated Set: {result}" (sorted in ascending order).
#   4. Remove the smallest element from the set, then print the updated set in the format: 
#      "After Removal: {result}" (sorted in ascending order).
# 
# Example:
# Input: 5 3 8 1 2 5 3
# Output:
# Unique Elements: [1, 2, 3, 5, 8]
# Largest: 8
# Smallest: 1
# Updated Set: [1, 2, 3, 5, 8, 100]
# After Removal: [2, 3, 5, 8, 100]
#
# Input: 10 20 10 30
# Output:
# Unique Elements: [10, 20, 30]
# Largest: 30
# Smallest: 10
# Updated Set: [10, 20, 30, 100]
# After Removal: [20, 30, 100]
numbers = input()
        `,

    validateCode: (code, callback) => {
        let score = 0;

        // Define test cases with input and expected output
        const testCases = [
            {
                input: '5 3 8 1 2 5 3\n',
                expectedOutput: `Unique Elements: [1, 2, 3, 5, 8]\nLargest: 8\nSmallest: 1\nUpdated Set: [1, 2, 3, 5, 8, 100]\nAfter Removal: [2, 3, 5, 8, 100]`,
                weight: 25,
            },
            {
                input: '10 20 10 30\n',
                expectedOutput: `Unique Elements: [10, 20, 30]\nLargest: 30\nSmallest: 10\nUpdated Set: [10, 20, 30, 100]\nAfter Removal: [20, 30, 100]`,
                weight: 25,
            },
            {
                input: '50 50 50\n',
                expectedOutput: `Unique Elements: [50]\nLargest: 50\nSmallest: 50\nUpdated Set: [50, 100]\nAfter Removal: [100]`,
                weight: 25,
            },
            {
                input: '7 3 1 4 6\n',
                expectedOutput: `Unique Elements: [1, 3, 4, 6, 7]\nLargest: 7\nSmallest: 1\nUpdated Set: [1, 3, 4, 6, 7, 100]\nAfter Removal: [3, 4, 6, 7, 100]`,
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
