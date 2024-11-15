const runPythonCode = require('../src/pythonRunner');

module.exports = {
    question: `Create a list called \`my_list\` with at least three integers. Append the number 42 to the list, and then print the updated list.`,

    validateCode: (code, callback) => {
        let score = 0;

        // Array of promises for validation
        const promises = [
            // Check if `my_list` is a list
            new Promise((resolve) => {
                let extraCode = `\nif not isinstance(my_list, list):\n    raise ValueError("my_list is not a list")`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 30; // Add 30 points if my_list is a list
                    resolve();
                });
            }),

            // Check if `my_list` has at least three integers
            new Promise((resolve) => {
                let extraCode = `
if len(my_list) < 3 or not all(isinstance(x, int) for x in my_list[:3]):
    raise ValueError("my_list does not have at least three integers")
`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 30; // Add 30 points if list has three integers
                    resolve();
                });
            }),

            // Check if the list includes the number 42 after appending
            new Promise((resolve) => {
                let extraCode = `
if 42 not in my_list:
    raise ValueError("42 was not appended to the list")
`;
                runPythonCode(code + extraCode, (status, output) => {
                    const expectedPart = "42"; // Check if 42 is in the output
                    if (status === 0 && output.includes(expectedPart)) {
                        score += 40; // Add 40 points for correct append and output
                    }
                    resolve();
                });
            }),
        ];

        // Wait for all promises to resolve
        Promise.all(promises)
            .then(() => {
                callback(score); // Return the total score
            })
            .catch((error) => {
                console.error("Error during validation:", error);
                callback(0); // Return 0 in case of an error
            });
    },
};
