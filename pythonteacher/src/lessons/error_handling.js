const runPythonCodeWi = require('../../src/pythonRunnerWI');

module.exports = {
    id: 'errorHandling',
    titleKey: 'lessons.errorHandling.title',
    descriptionKey: 'lessons.errorHandling.description',
    question: `Below is the first line of your Python program:
\`values = input()\`
Write the rest of the program below this line to:
- Parse the input string \`values\` into two values separated by a space.
- Try to convert both values to integers and divide the first by the second.
- If a ValueError occurs (non-integer input), print "Invalid input."
- If a ZeroDivisionError occurs, print "Cannot divide by zero."
- Otherwise, print the result.

Example:
Input: 10 2
Output: 5.0

Input: 10 0
Output: Cannot divide by zero.

Input: abc 2
Output: Invalid input.
values = input()`,
    questionFa: `اولین خط برنامه پایتون شما:
\`values = input()\`
بقیه برنامه را زیر این خط بنویسید:
- رشته ورودی \`values\` را به دو مقدار جداشده با فاصله تبدیل کنید.
- سعی کنید هر دو مقدار را به عدد صحیح تبدیل کنید و اولی را بر دومی تقسیم کنید.
- اگر ValueError رخ دهد: "Invalid input."
- اگر ZeroDivisionError رخ دهد: "Cannot divide by zero."
- در غیر این صورت نتیجه را چاپ کنید.

مثال:
ورودی: 10 2
خروجی: 5.0

ورودی: 10 0
خروجی: Cannot divide by zero.

ورودی: abc 2
خروجی: Invalid input.
values = input()`,
    hint: "Use try/except blocks to catch ValueError and ZeroDivisionError.",
    hintFa: "از بلوک‌های try/except برای گرفتن ValueError و ZeroDivisionError استفاده کنید.",
    validateCode: (code, callback) => {
        let score = 0;

        const testCases = [
            { input: '10 2\n', expectedOutput: '5.0', weight: 25 },
            { input: '10 0\n', expectedOutput: 'Cannot divide by zero.', weight: 25 },
            { input: 'abc 2\n', expectedOutput: 'Invalid input.', weight: 25 },
            { input: '7 3\n', expectedOutput: '2.3333333333333335', weight: 25 },
        ];

        const promises = testCases.map((testCase) => {
            return new Promise((resolve) => {
                runPythonCodeWi(code, testCase.input, (status, output) => {
                    const cleaned = output.trim();
                    if (status === 0) {
                        if (cleaned === testCase.expectedOutput.trim() || cleaned.startsWith(testCase.expectedOutput.trim().split('.')[0])) {
                            score += testCase.weight;
                        }
                    }
                    resolve();
                });
            });
        });

        Promise.all(promises)
            .then(() => callback(score))
            .catch(() => callback(0));
    },
    practice: [
        {
            question: "Read an integer input. Use try/except to handle invalid input. Print 'Valid: {n}' if valid, 'Invalid' otherwise.",
            questionFa: "ورودی عدد صحیح بخوانید. از try/except برای مدیریت ورودی نامعتبر استفاده کنید. اگر معتبر بود 'Valid: {n}'، در غیر این صورت 'Invalid' چاپ کنید.",
            hint: "Use try: n = int(input()) except ValueError: print('Invalid')",
            hintFa: "از try: n = int(input()) except ValueError: print('Invalid') استفاده کنید",
            validateCode: (code, callback) => {
                let score = 0;
                if (!code.includes('try') || !code.includes('except')) {
                    callback(0);
                    return;
                }
                const tests = [
                    { input: '42\n', expected: 'Valid' },
                    { input: 'abc\n', expected: 'Invalid' },
                ];
                Promise.all(tests.map(tc => new Promise(res => {
                    runPythonCodeWi(code, tc.input, (status, output) => {
                        if (status === 0 && output.includes(tc.expected)) score += 50;
                        res();
                    });
                }))).then(() => callback(score));
            },
        },
        {
            question: "Read two integers a and b. Use try/except to divide a by b, handling ZeroDivisionError. Print the result or 'Error'.",
            questionFa: "دو عدد صحیح a و b بخوانید. از try/except برای تقسیم a بر b استفاده کنید و ZeroDivisionError را مدیریت کنید. نتیجه یا 'Error' چاپ کنید.",
            hint: "try: print(a/b) except ZeroDivisionError: print('Error')",
            hintFa: "try: print(a/b) except ZeroDivisionError: print('Error')",
            validateCode: (code, callback) => {
                let score = 0;
                const tests = [
                    { input: '10 2\n', expected: '5.0' },
                    { input: '10 0\n', expected: 'Error' },
                ];
                Promise.all(tests.map(tc => new Promise(res => {
                    runPythonCodeWi(code, tc.input, (status, output) => {
                        if (status === 0 && (output.trim() === tc.expected || output.includes(tc.expected))) score += 50;
                        res();
                    });
                }))).then(() => callback(score));
            },
        },
    ],
};
