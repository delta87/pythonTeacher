const runPythonCodeWi = require('../../src/pythonRunnerWI');

module.exports = {
    id: 'functions',
    titleKey: 'lessons.functions.title',
    descriptionKey: 'lessons.functions.description',
    question: `Write a Python program with the following:
- A function named \`factorial\` that calculates the factorial of a given number.
- The program should read an integer input \`n\` and print the factorial of \`n\` using the \`factorial\` function.

Example:
Input: 5
Output: 120
n = int(input())
# Write your factorial function and the rest of your program below.`,
    questionFa: `برنامه پایتونی با ویژگی‌های زیر بنویسید:
- تابعی به نام \`factorial\` که فاکتوریل یک عدد را محاسبه می‌کند.
- برنامه باید عدد صحیح \`n\` را بخواند و فاکتوریل \`n\` را با استفاده از تابع \`factorial\` چاپ کند.

مثال:
ورودی: 5
خروجی: 120
n = int(input())
# تابع factorial و بقیه برنامه را زیر این خط بنویسید.`,
    hint: "Define the function before calling it. Use a loop or recursion inside.",
    hintFa: "تابع را قبل از فراخوانی تعریف کنید. از حلقه یا بازگشت داخل تابع استفاده کنید.",
    validateCode: (code, callback) => {
        let score = 0;

        if (!code.includes('def factorial')) {
            callback(0);
            return;
        }

        const testCases = [
            { input: '3\n', expectedOutput: '6', weight: 20 },
            { input: '5\n', expectedOutput: '120', weight: 20 },
            { input: '0\n', expectedOutput: '1', weight: 20 },
            { input: '10\n', expectedOutput: '3628800', weight: 20 },
            { input: '1\n', expectedOutput: '1', weight: 20 },
        ];

        const promises = testCases.map((testCase) => {
            return new Promise((resolve) => {
                runPythonCodeWi(code, testCase.input, (status, output) => {
                    const cleanedOutput = output.trim();
                    if (status === 0 && cleanedOutput === testCase.expectedOutput.trim()) {
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
            question: "Write a function is_even(n) that returns True if n is even, False otherwise. Read n and print the result.",
            questionFa: "تابع is_even(n) بنویسید که اگر n زوج باشد True برمی‌گرداند. n را بخوانید و نتیجه را چاپ کنید.",
            hint: "Use the % operator: return n % 2 == 0",
            hintFa: "از عملگر % استفاده کنید: return n % 2 == 0",
            validateCode: (code, callback) => {
                let score = 0;
                if (!code.includes('def is_even')) {
                    callback(0);
                    return;
                }
                const tests = [
                    { input: '4\n', expected: 'True' },
                    { input: '7\n', expected: 'False' },
                ];
                Promise.all(tests.map(tc => new Promise(res => {
                    runPythonCodeWi(code, tc.input, (status, output) => {
                        if (status === 0 && output.trim() === tc.expected) score += 50;
                        res();
                    });
                }))).then(() => callback(score));
            },
        },
        {
            question: "Write a function add(a, b) that returns the sum. Read two integers and print their sum using the function.",
            questionFa: "تابع add(a, b) بنویسید که مجموع را برمی‌گرداند. دو عدد صحیح بخوانید و مجموع آن‌ها را با تابع چاپ کنید.",
            hint: "Define add(a, b) that returns a + b.",
            hintFa: "تابع add(a, b) که a + b را برمی‌گرداند تعریف کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                if (!code.includes('def add')) {
                    callback(0);
                    return;
                }
                const tests = [
                    { input: '3 5\n', expected: '8' },
                    { input: '10 20\n', expected: '30' },
                ];
                Promise.all(tests.map(tc => new Promise(res => {
                    runPythonCodeWi(code, tc.input, (status, output) => {
                        if (status === 0 && output.trim() === tc.expected) score += 50;
                        res();
                    });
                }))).then(() => callback(score));
            },
        },
    ],
};
