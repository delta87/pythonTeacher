const runPythonCodeWi = require('../src/pythonRunnerWI');


module.exports = {
    question: `
# Below is the first line of your Python program:
# \`input_string = input()\`
# Write the rest of the program below this line to:
# - Check if the string in the variable \`input_string\`:
#   - Starts with the word "Hello" (case-sensitive): Print "Greeting detected."
#   - Ends with an exclamation mark: Print "Excited tone detected."
#   - Contains the substring "Python": Print "Python mentioned!"
# - Otherwise, print "No special patterns detected."
# 
# Handle the cases in the order mentioned above, and ensure only one message is printed for each input.
input_string = input()
        `,

    validateCode: (code, callback) => {
        let score = 0;

        // Define test cases with input and expected output
        const testCases = [
            { input: 'Hello there!\n', expectedOutput: "Greeting detected.", weight: 25 },
            { input: 'Wow, this is fun!\n', expectedOutput: "Excited tone detected.", weight: 25 },
            { input: 'I love Python programming.\n', expectedOutput: "Python mentioned!", weight: 25 },
            { input: 'Just a regular sentence.\n', expectedOutput: "No special patterns detected.", weight: 25 },
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
                callback(0);
            });
    },
};
