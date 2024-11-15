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
