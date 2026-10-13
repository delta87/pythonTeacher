const runPythonCodeWi = require('../../src/pythonRunnerWI');

module.exports = {
    id: 'modules',
    titleKey: 'lessons.modules.title',
    descriptionKey: 'lessons.modules.description',
    question: `Write a Python program that:
1. Imports the \`math\` module.
2. Reads an integer \`n\` from input.
3. Calculates and prints the square root of \`n\` using \`math.sqrt()\`, formatted to 2 decimal places.
4. Also prints the value of pi from the math module.

Example:
Input: 16
Output:
Square root: 4.00
Pi: 3.141592653589793`,
    questionFa: `برنامه پایتونی بنویسید که:
1. ماژول \`math\` را import کند.
2. عدد صحیح \`n\` را از ورودی بخواند.
3. جذر \`n\` را با استفاده از \`math.sqrt()\` محاسبه و با 2 رقم اعشار چاپ کند.
4. همچنین مقدار pi از ماژول math را چاپ کند.

مثال:
ورودی: 16
خروجی:
Square root: 4.00
Pi: 3.141592653589793`,
    hint: "Use import math and math.sqrt(n) and math.pi.",
    hintFa: "از import math و math.sqrt(n) و math.pi استفاده کنید.",
    validateCode: (code, callback) => {
        let score = 0;

        if (code.includes('import math')) score += 30;
        if (code.includes('math.sqrt')) score += 30;
        if (code.includes('math.pi')) score += 20;

        runPythonCodeWi(code, '16\n', (status, output) => {
            if (status === 0) {
                if (output.includes('4.00')) score += 10;
                if (output.includes('3.14')) score += 10;
            }
            callback(Math.min(score, 100));
        });
    },
    practice: [
        {
            question: "Import the random module, generate a random integer between 1 and 10, and print it.",
            questionFa: "ماژول random را import کنید، یک عدد تصادفی بین 1 تا 10 ایجاد کنید و چاپ کنید.",
            hint: "Use random.randint(1, 10).",
            hintFa: "از random.randint(1, 10) استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                if (code.includes('import random')) score += 40;
                if (code.includes('randint') || code.includes('random()')) score += 60;
                callback(score);
            },
        },
        {
            question: "Import the datetime module and print the current date.",
            questionFa: "ماژول datetime را import کنید و تاریخ فعلی را چاپ کنید.",
            hint: "Use datetime.date.today().",
            hintFa: "از datetime.date.today() استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                if (code.includes('import datetime') || code.includes('from datetime')) score += 50;
                if (code.includes('today') || code.includes('now')) score += 50;
                callback(score);
            },
        },
    ],
};
