const runPythonCode = require('../src/pythonRunner');

module.exports = {
    question: `
# Write an \`if\` statement that checks the value of the variable \`weather\`:
# - If the value of \`weather\` is "sunny", print "It's a sunny day!"
# - If the value of \`weather\` is "rainy", print "It's raining today!"
# - If the value of \`weather\` is "cloudy", print "It's cloudy today!"
# - Otherwise, print "Weather unknown."
    `,
    
    validateCode: (code, callback) => {
        let score = 0;

        const testCases = [
            { input: '"sunny"', expected: "It's a sunny day!" },
            { input: '"rainy"', expected: "It's raining today!" },
            { input: '"cloudy"', expected: "It's cloudy today!" },
            { input: '"windy"', expected: "Weather unknown." }
        ];

        const promises = testCases.map(testCase => {
            return new Promise(resolve => {
                const extraCode = `\nweather = ${testCase.input}\n${code}`;
                runPythonCode(extraCode, result => {
                    const trimmedResult = result.trim(); // Ensure no leading/trailing spaces
                    const expected = testCase.expected.trim(); // Ensure no leading/trailing spaces
                    
                    // Check if the result matches the expected output
                    if (trimmedResult === expected) {
                        score += 25; // Each correct case gives 25 points
                    }
                    resolve();
                });
            });
        });

        // Wait for all promises to resolve
        Promise.all(promises)
            .then(() => {
                callback(score); // Return the score after all checks
            })
            .catch(error => {
                console.error("Error during validation:", error);
                callback(0); // Return 0 if there's an error
            });
    }
};
