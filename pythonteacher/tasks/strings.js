const runPythonCode = require('../src/pythonRunner');

module.exports = {
    question: `
    # Write a Python script that:
    # 1. Defines two string variables: \`first_name\` with your first name, and \`last_name\` with your last name.
    # 2. Concatenates the two strings with a space in between into \`full_name\`.
    # 3. Prints the value of \`full_name\`.
        `,

    validateCode: (code, callback) => {
        let score = 0;

        // Define test inputs and expected outputs
        const testCases = [
            { first_name: "John", last_name: "Doe", expectedOutput: "John Doe" },
            { first_name: "Alice", last_name: "Smith", expectedOutput: "Alice Smith" },
            { first_name: "Mona", last_name: "Lisa", expectedOutput: "Mona Lisa" }
        ];
        
        const promises = testCases.map(({ first_name, last_name, expectedOutput }) => {
            return new Promise((resolve) => {
                // Dynamically inject variables and user code
                const testCode = `
                    first_name = "${first_name}"
                    last_name = "${last_name}"
                    ${code}
                `;
        
                runPythonCode(testCode, (status, output) => {
                    if (status === 0 && output.trim() === expectedOutput) {
                        score += 33; // Adjusted for three test cases
                    }
                    resolve();
                });
            });
        });
        
        // Wait for all test cases to complete
        Promise.all(promises)
            .then(() => {
                callback(score);
            })
            .catch((error) => {
                console.error("Error during validation:", error);
                callback(0);
            });
    }
};
