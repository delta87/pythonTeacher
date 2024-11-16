const runPythonCode = require('../src/pythonRunner');

module.exports = {
    question: `Define a dictionary named \`my_dict\` with the following key-value pairs: "name" as "Alice", "age" as 30, and "city" as "New York". Then, add a new key-value pair: "country" as "USA". Finally, print the updated dictionary.`,

    validateCode: (code, callback) => {
        let score = 0;

        const promises = [
            // Check if the dictionary is defined with the initial key-value pairs
            new Promise((resolve) => {
                const extraCode = `
if not isinstance(my_dict, dict):
    raise ValueError("my_dict is not a dictionary")
if my_dict != {"name": "Alice", "age": 30, "city": "New York"}:
    raise ValueError("my_dict does not have the correct initial values")
`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 40; // Add 40 points for correct initial dictionary
                    resolve();
                });
            }),

            // Check if the new key-value pair was added
            new Promise((resolve) => {
                const extraCode = `
my_dict["country"] = "USA"
if my_dict.get("country") != "USA":
    raise ValueError("Key 'country' was not added with the value 'USA'")
print(my_dict)
`;
                runPythonCode(code + extraCode, (status, output) => {
                    if (status === 0) {
                        const expectedPart = `'country': 'USA'`; // Check if the output contains the new pair
                        if (output.includes(expectedPart)) {
                            score += 50; // Add 50 points for correct addition and output
                        }
                    }
                    resolve();
                });
            }),

            // Check if the dictionary prints correctly
            new Promise((resolve) => {
                runPythonCode(code, (status, output) => {
                    const normalizedOutput = output.trim().replace(/\s+/g, ' '); // Normalize whitespace
                    const expectedOutput = `{'name': 'Alice', 'age': 30, 'city': 'New York', 'country': 'USA'}`.replace(/\s+/g, ' ');

                    if (status === 0 && normalizedOutput === expectedOutput) {
                        score += 10; // Add 10 points for correct final output
                    } else {
                        console.error("Output mismatch. Expected:\n", expectedOutput, "\nGot:\n", normalizedOutput);
                    }
                    resolve();
                });
            }),
        ];

        // Wait for all promises to resolve
        Promise.all(promises)
            .then(() => {
                callback(score); // Return the final score
            })
            .catch((error) => {
                console.error("Error during validation:", error);
                callback(0); // Return 0 if there's an error
            });
    },
};
