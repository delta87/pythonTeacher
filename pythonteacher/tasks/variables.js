const runPythonCode = require('../src/pythonRunner');

module.exports = {
    question: `Define two variables, \`first_name\` and \`last_name\`, and assign your first and last name as strings to them. Then, concatenate the two variables with a space in between and print the result.`,

    validateCode: (code, callback) => {
        let score = 0;

        // Array of promises for validation
        const promises = [
            // Validate if `first_name` is a string
            new Promise((resolve) => {
                let extraCode = `\nif not isinstance(first_name, str):\n    raise ValueError("first_name is not a string")`;
                runPythonCode(code + extraCode, (status) => {
                    if (status == 0) score += 25;
                    resolve();
                });
            }),
            // Validate if `last_name` is a string
            new Promise((resolve) => {
                let extraCode = `\nif not isinstance(last_name, str):\n    raise ValueError("last_name is not a string")`;
                runPythonCode(code + extraCode, (status) => {
                    if (status == 0) score += 25;
                    resolve();
                });
            }),
            // Validate the concatenation and print result
            new Promise((resolve) => {
                let extraCode = `
full_name = first_name + " " + last_name
if full_name != (first_name + " " + last_name):
    raise ValueError("Concatenation is incorrect")
`;
                runPythonCode(code + extraCode, (status, output) => {
                    if (status == 0 && output.trim() === `${"John Doe"}`) {
                        score += 50; // Concatenation validation gets the most weight
                    }
                    resolve();
                });
            }),
            console.log(code + extraCode)
        ];

        // Wait for all promises to resolve
        Promise.all(promises)
            .then(() => {
                callback(score); // Return total score after all checks
            })
            .catch((error) => {
                console.error("Error during validation:", error);
                callback(0); // Return 0 if there's an error
            });
    },
};
