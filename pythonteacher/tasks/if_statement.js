const runPythonCode = require('../src/pythonRunner');


module.exports = {
    question: `
# Below is the first line of your Python program:
# \`weather = input()\`
# Write the rest of the program below this line to:
# - Check the value of the variable \`weather\`:
#   - If the value is "sunny", print "It's a sunny day!"
#   - If the value is "rainy", print "It's raining today!"
#   - If the value is "cloudy", print "It's cloudy today!"
#   - Otherwise, print "Weather unknown."
# 
# Do not modify the first line.
weather = input()
        `,

    validateCode: (code, callback) => {
        let score = 0;

        // Define test cases with input and expected output
        const testCases = [
            { input: 'sunny\n', expectedOutput: "It's a sunny day!", weight: 25 },
            { input: 'rainy\n', expectedOutput: "It's raining today!", weight: 25 },
            { input: 'cloudy\n', expectedOutput: "It's cloudy today!", weight: 25 },
            { input: 'snowy\n', expectedOutput: "Weather unknown.", weight: 25 },
        ];

        const promises = testCases.map((testCase) => {
            return new Promise((resolve) => {
                runPythonCode(code, testCase.input, (status, output) => {

                    console.log(status, output);
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
