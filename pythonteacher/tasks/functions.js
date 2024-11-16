const runPythonCode = require('../src/pythonRunner');

module.exports = {
    question: `Write a Python function named \`add_numbers\` that takes two parameters \`a\` and \`b\`. The function should return their sum. Use this function to add the numbers 10 and 15, and print their sum.`,

    validateCode: (code, callback) => {
        let score = 0;

        const promises = [
            // Check if the function is defined
            new Promise((resolve) => {
                const extraCode = `
if 'def add_numbers' not in """${code}""":
    raise ValueError("Function 'add_numbers' is not defined")
`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 20; // Add 20 points for defining the function
                    resolve();
                });
            }),

            // Check if the function works with specific inputs (10 and 15)
            new Promise((resolve) => {
                const extraCode = `
result = add_numbers(10, 15)
if result != 25:
    raise ValueError("Function 'add_numbers' did not return the correct sum for input (10, 15)")
print(result)
`;
                runPythonCode(code + extraCode, (status, output) => {
                    if (status === 0) {
                        const normalizedOutput = output.trim();
                        if (normalizedOutput === "25") {
                            score += 50; // Add 50 points for correct functionality
                        }
                    }
                    resolve();
                });
            }),

            // Check if the function works with other inputs (e.g., 3 and 4)
            new Promise((resolve) => {
                const extraCode = `
result = add_numbers(3, 4)
if result != 7:
    raise ValueError("Function 'add_numbers' did not return the correct sum for input (3, 4)")
`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 30; // Add 30 points for correct functionality
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
