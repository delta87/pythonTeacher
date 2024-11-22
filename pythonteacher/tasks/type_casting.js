const runPythonCode = require('../src/pythonRunner');

module.exports = {
    question: `
#    Define the following variables:
#    - 'initial_num' as an integer with a value of 10.
#    - 'num_str' as a string representation of 'initial_num'.
#    - 'flt_num' as the float value of 'num_str'.
#    - 'sum_val' as the sum of 'initial_num' and 'flt_num', but cast it to an integer.
    `,
    
    validateCode: (code, callback) => {
        let score = 0;

        const promises = [
            // Check if 'initial_num' is defined as an integer with value 10
            new Promise((resolve) => {
                let extraCode = `\nif not (isinstance(initial_num, int) and initial_num == 10):\n    raise ValueError("initial_num is not an integer with value 10")`;
                runPythonCode(code + extraCode, (status) => {
                    if (status == 0) score += 25;
                    resolve();
                });
            }),

            // Check if 'num_str' is a string representation of 'initial_num'
            new Promise((resolve) => {
                let extraCode = `\nif not (isinstance(num_str, str) and num_str == str(initial_num)):\n    raise ValueError("num_str is not a string representation of initial_num")`;
                runPythonCode(code + extraCode, (status) => {
                    if (status == 0) score += 25;
                    resolve();
                });
            }),

            // Check if 'flt_num' is a float representation of 'num_str'
            new Promise((resolve) => {
                let extraCode = `\nif not (isinstance(flt_num, float) and flt_num == float(num_str)):\n    raise ValueError("flt_num is not a float representation of num_str")`;
                runPythonCode(code + extraCode, (status) => {
                    if (status == 0) score += 25;
                    resolve();
                });
            }),

            // Check if 'sum_val' is the integer sum of 'initial_num' and 'flt_num'
            new Promise((resolve) => {
                let extraCode = `\nif not (isinstance(sum_val, int) and sum_val == int(initial_num + flt_num)):\n    raise ValueError("sum_val is not the integer sum of initial_num and flt_num")`;
                runPythonCode(code + extraCode, (status) => {
                    if (status == 0) score += 25;
                    resolve();
                });
            }),


        ];

        // Wait for all promises to resolve
        Promise.all(promises)
            .then(() => {
                callback(score); // Return the score after all checks
            })
            .catch((error) => {
                console.error("Error during validation:", error);
                callback(0); // Return 0 if there's an error
            });
    }
};
