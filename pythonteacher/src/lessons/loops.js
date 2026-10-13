const runPythonCodeWi = require('../../src/pythonRunnerWI');

module.exports = {
    id: 'loops',
    titleKey: 'lessons.loops.title',
    descriptionKey: 'lessons.loops.description',
    question: `Below is the first line of your Python program:
\`n = int(input())\`
Write the rest of the program below this line to:
- Calculate the sum of squares of the first \`n\` positive integers.
- Print the result.

Example:
Input: 3
Output: 14
(Explanation: 1^2 + 2^2 + 3^2 = 14)
n = int(input())`,
    questionFa: `اولین خط برنامه پایتون شما:
\`n = int(input())\`
بقیه برنامه را زیر این خط بنویسید:
- مجموع مربعات اولین \`n\` عدد صحیح مثبت را محاسبه کنید.
- نتیجه را چاپ کنید.

مثال:
ورودی: 3
خروجی: 14
(توضیح: 1^2 + 2^2 + 3^2 = 14)
n = int(input())`,
    hint: "Use a for loop with range(1, n+1) and accumulate i*i.",
    hintFa: "از حلقه for با range(1, n+1) و تجمع i*i استفاده کنید.",
    validateCode: (code, callback) => {
        let score = 0;

        const testCases = [
            { input: '3\n', expectedOutput: '14', weight: 15 },
            { input: '5\n', expectedOutput: '55', weight: 15 },
            { input: '1\n', expectedOutput: '1', weight: 10 },
            { input: '10\n', expectedOutput: '385', weight: 20 },
            { input: '20\n', expectedOutput: '2870', weight: 20 },
            { input: '100\n', expectedOutput: '338350', weight: 20 },
        ];

        const promises = testCases.map((testCase) => {
            return new Promise((resolve) => {
                runPythonCodeWi(code, testCase.input, (status, output) => {
                    const cleanedOutput = output.trim();
                    if (status === 0 && cleanedOutput === testCase.expectedOutput) {
                        score += testCase.weight;
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
            question: "Read an integer n and print all numbers from 1 to n, each on a new line.",
            questionFa: "یک عدد صحیح n بخوانید و تمام اعداد از 1 تا n را هر کدام در یک خط چاپ کنید.",
            hint: "Use a for loop with range(1, n+1).",
            hintFa: "از حلقه for با range(1, n+1) استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCodeWi(code, '5\n', (status, output) => {
                    if (status === 0) {
                        const lines = output.trim().split('\n');
                        if (lines.length === 5 && lines[0] === '1' && lines[4] === '5') score = 100;
                    }
                    callback(score);
                });
            },
        },
        {
            question: "Read an integer n and print the factorial of n.",
            questionFa: "یک عدد صحیح n بخوانید و فاکتوریل n را چاپ کنید.",
            hint: "Initialize result = 1 and multiply in a loop.",
            hintFa: "result = 1 را مقداردهی کنید و در حلقه ضرب کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                const tests = [
                    { input: '5\n', expected: '120' },
                    { input: '0\n', expected: '1' },
                    { input: '7\n', expected: '5040' },
                ];
                Promise.all(tests.map(tc => new Promise(res => {
                    runPythonCodeWi(code, tc.input, (status, output) => {
                        if (status === 0 && output.trim() === tc.expected) score += 34;
                        res();
                    });
                }))).then(() => callback(Math.min(score, 100)));
            },
        },
        {
            question: "Read an integer n and print a countdown from n to 1.",
            questionFa: "یک عدد صحیح n بخوانید و شمارش معکوس از n تا 1 را چاپ کنید.",
            hint: "Use range(n, 0, -1).",
            hintFa: "از range(n, 0, -1) استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCodeWi(code, '5\n', (status, output) => {
                    if (status === 0) {
                        const expected = '5\n4\n3\n2\n1';
                        if (output.trim() === expected) score = 100;
                    }
                    callback(score);
                });
            },
        },
    ],
};
