const runPythonCodeWi = require('../src/pythonRunnerWI');

const compareStrings = require('../src/compareStrings')

module.exports = {
    question: `
# Below is the first line of your Python program:
# \`entries = input()\`
# Write the rest of the program below this line to:
# - Parse the input string \`entries\` into a dictionary. The input format is: 
#   "key1:value1, key2:value2, key3:value3" (keys and values are separated by colons and pairs by commas).
# - Perform the following operations on the dictionary:
#   1. Print the dictionary in the format: "Dictionary: {result}".
#   2. Find and print the key with the largest value in the format: "Key with Largest Value: {key}".
#   3. Remove the key with the smallest value and print the updated dictionary in the format: "After Removal: {result}".
#   4. Add a new key-value pair ("new_key": 100) to the dictionary and print the updated dictionary in the format: "Final Dictionary: {result}".
# 
# Example:
# Input: a:10, b:20, c:5
# Output:
# Dictionary: {'a': 10, 'b': 20, 'c': 5}
# Key with Largest Value: b
# After Removal: {'a': 10, 'b': 20}
# Final Dictionary: {'a': 10, 'b': 20, 'new_key': 100}
#
# Input: apple:40, banana:15, cherry:25
# Output:
# Dictionary: {'apple': 40, 'banana': 15, 'cherry': 25}
# Key with Largest Value: apple
# After Removal: {'apple': 40, 'cherry': 25}
# Final Dictionary: {'apple': 40, 'cherry': 25, 'new_key': 100}
entries = input()
        `,

    validateCode: (code, callback) => {
        let score = 0;

        // Define test cases with input and expected output
        const testCases = [
            {
                input: 'a:10, b:20, c:5\n',
                expectedOutput: `Dictionary: {'a': 10, 'b': 20, 'c': 5}\nKey with Largest Value: b\nAfter Removal: {'a': 10, 'b': 20}\nFinal Dictionary: {'a': 10, 'b': 20, 'new_key': 100}`,
                weight: 25,
            },
            {
                input: 'apple:40, banana:15, cherry:25\n',
                expectedOutput: `Dictionary: {'apple': 40, 'banana': 15, 'cherry': 25}\nKey with Largest Value: apple\nAfter Removal: {'apple': 40, 'cherry': 25}\nFinal Dictionary: {'apple': 40, 'cherry': 25, 'new_key': 100}`,
                weight: 25,
            },
            {
                input: 'x:50, y:100, z:1\n',
                expectedOutput: `Dictionary: {'x': 50, 'y': 100, 'z': 1}\nKey with Largest Value: y\nAfter Removal: {'x': 50, 'y': 100}\nFinal Dictionary: {'x': 50, 'y': 100, 'new_key': 100}`,
                weight: 25,
            },
            {
                input: 'key1:200, key2:50, key3:300\n',
                expectedOutput: `Dictionary: {'key1': 200, 'key2': 50, 'key3': 300}\nKey with Largest Value: key3\nAfter Removal: {'key1': 200, 'key3': 300}\nFinal Dictionary: {'key1': 200, 'key3': 300, 'new_key': 100}`,
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
                callback(0);
            });
    },
};
