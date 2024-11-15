const runPythonCode = require('../src/pythonRunner');

module.exports = {
    question: `Create a dictionary called \`my_dict\` with at least two key-value pairs where the keys are strings and the values are integers. Then, add a new key-value pair \`"age": 30\` to the dictionary, and print the updated dictionary.`,

    validateCode: (code, callback) => {
        let score = 0;

        // Array of promises for validation
        const promises = [
            // Check if `my_dict` is a dictionary
            new Promise((resolve) => {
                let extraCode = `
if not isinstance(my_dict, dict):
    raise ValueError("my_dict is not a dictionary")
`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 30; // Add 30 points if my_dict is a dictionary
                    resolve();
                });
            }),

            // Check if `my_dict` has at least two valid key-value pairs
            new Promise((resolve) => {
                let extraCode = `
if len(my_dict) < 2:
    raise ValueError("my_dict does not have at least two key-value pairs")
if not all(isinstance(k, str) and isinstance(v, int) for k, v in my_dict.items()):
    raise ValueError("Keys must be strings and values must be integers")
`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 30; // Add 30 points if key-value pairs are valid
                    resolve();
                });
            }),

            // Validate appending `"age": 30` and output
            new Promise((resolve) => {
                let extraCode = `
my_dict["age"] = 30
print(my_dict)
`;
                runPythonCode(code + extraCode, (status, output) => {
                    if (status === 0) {
                        try {
                            const parsedOutput = JSON.parse(output.replace(/'/g, '"')); // Handle Python's single quotes
                            if (parsedOutput["age"] === 30) {
                                score += 40; // Add 40 points if "age": 30 is added
                            }
                        } catch (err) {
                            console.error("Failed to parse output:", err);
                        }
                    }
                    resolve();
                });
            }),
        ];

        // Wait for all promises to resolve
        Promise.all(promises)
            .then(() => {
                (score); // Return the total score
            })
            .catch((error) => {
                console.error("Error during validation:", error);
                callback(0); // Return 0 in case of an error
            });
    },
};
