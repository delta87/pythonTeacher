const runPythonCode = require('../../src/pythonRunner');

module.exports = {
    id: 'variables',
    titleKey: 'lessons.variables.title',
    descriptionKey: 'lessons.variables.description',
    question: `Define a variable 'x' and assign the integer value '10' to it. Then, print the value of 'x' to the console.`,
    questionFa: `یک متغیر به نام 'x' تعریف کنید و مقدار صحیح '10' را به آن اختصاص دهید. سپس مقدار 'x' را در کنسول چاپ کنید.`,
    hint: "Use the assignment operator '=' to create a variable and print() to display it.",
    hintFa: "از عملگر تخصیص '=' برای ایجاد متغیر و print() برای نمایش آن استفاده کنید.",
    validateCode: (code, callback) => {
        let score = 0;

        const promises = [
            new Promise((resolve) => {
                let extraCode = `\nif not isinstance(x, int):\n    raise ValueError()`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 33;
                    resolve();
                });
            }),
            new Promise((resolve) => {
                let extraCode = `\nif x != 10:\n    raise ValueError()`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 33;
                    resolve();
                });
            }),
            new Promise((resolve) => {
                runPythonCode(code, (status, output) => {
                    if (status === 0 && output.trim() === '10') score += 34;
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
            question: "Create a variable called 'name' and assign your name to it. Print it.",
            questionFa: "متغیری به نام 'name' ایجاد کنید و نام خود را به آن اختصاص دهید. آن را چاپ کنید.",
            hint: "Use quotes around string values: name = \"YourName\"",
            hintFa: "از علامت نقل قول دور مقادیر رشته‌ای استفاده کنید: name = \"YourName\"",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCode(code, (status, output) => {
                    if (status === 0) {
                        if (code.includes('name') && /["'].+["']/.test(code)) score += 50;
                        if (output.length > 0) score += 50;
                    }
                    callback(score);
                });
            },
        },
        {
            question: "Create two variables 'a' and 'b' with values 5 and 3. Print their sum.",
            questionFa: "دو متغیر 'a' و 'b' با مقادیر 5 و 3 ایجاد کنید. مجموع آن‌ها را چاپ کنید.",
            hint: "Use the + operator to add two numbers.",
            hintFa: "از عملگر + برای جمع دو عدد استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCode(code, (status, output) => {
                    if (status === 0 && output.trim() === '8') score = 100;
                    callback(score);
                });
            },
        },
        {
            question: "Create a variable 'pi' with value 3.14 and print its type using type().",
            questionFa: "متغیری به نام 'pi' با مقدار 3.14 ایجاد کنید و نوع آن را با استفاده از type() چاپ کنید.",
            hint: "Use type(pi) inside print()",
            hintFa: "از type(pi) داخل print() استفاده کنید",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCode(code, (status, output) => {
                    if (status === 0) {
                        if (code.includes('type') && code.includes('pi')) score += 50;
                        if (output.includes('float')) score += 50;
                    }
                    callback(score);
                });
            },
        },
    ],
};
