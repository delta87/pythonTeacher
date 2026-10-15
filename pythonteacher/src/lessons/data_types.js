const runPythonCode = require('../../src/pythonRunner');

module.exports = {
    id: 'dataTypes',
    titleKey: 'lessons.dataTypes.title',
    descriptionKey: 'lessons.dataTypes.description',
    question: "Define variables 'a' as an integer, 'b' as a float, 'c' as a string, and 'd' as a boolean.",
    questionFa: "متغیرهای 'a' به عنوان عدد صحیح، 'b' به عنوان عدد اعشاری، 'c' به عنوان رشته و 'd' به عنوان بولین تعریف کنید.",
    hint: "Use int, float, str values and True/False for boolean.",
    hintFa: "از مقادیر int، float، str و True/False برای بولین استفاده کنید.",
    validateCode: (code, callback) => {
        let score = 0;

        const promises = [
            new Promise((resolve) => {
                let extraCode = `\nif not isinstance(a, int):\n    raise ValueError("a is not an integer")`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 25;
                    resolve();
                });
            }),
            new Promise((resolve) => {
                let extraCode = `\nif not isinstance(b, float):\n    raise ValueError("b is not a float")`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 25;
                    resolve();
                });
            }),
            new Promise((resolve) => {
                let extraCode = `\nif not isinstance(c, str):\n    raise ValueError("c is not a string")`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 25;
                    resolve();
                });
            }),
            new Promise((resolve) => {
                let extraCode = `\nif not isinstance(d, bool):\n    raise ValueError("d is not a boolean")`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 25;
                    resolve();
                });
            }),
        ];

        Promise.all(promises)
            .then(() => callback(score))
            .catch(() => callback(0));
    },
    practice: [
        {
            question: "Create variables of type int, float, str, and bool. Print each one's type using type().",
            questionFa: "متغیرهایی از نوع int، float، str و bool ایجاد کنید. نوع هر کدام را با type() چاپ کنید.",
            hint: "Example: print(type(my_var))",
            hintFa: "مثال: print(type(my_var))",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCode(code, (status) => {
                    if (status === 0 && code.includes('type')) score = 100;
                    callback(score);
                });
            },
        },
        {
            question: "Create a variable 'age' as an integer with value 25, then print it.",
            questionFa: "متغیری به نام 'age' به عنوان عدد صحیح با مقدار 25 ایجاد کنید، سپس چاپ کنید.",
            hint: "age = 25, then print(age)",
            hintFa: "age = 25، سپس print(age)",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCode(code, (status, output) => {
                    if (status === 0) {
                        if (/age\s*=\s*25/.test(code)) score += 50;
                        if (output.trim() === '25') score += 50;
                    }
                    callback(score);
                });
            },
        },
    ],
};
