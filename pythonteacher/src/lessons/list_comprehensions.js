const runPythonCodeWi = require('../../src/pythonRunnerWI');
const compareStrings = require('../../src/compareStrings');

module.exports = {
    id: 'listComprehensions',
    titleKey: 'lessons.listComprehensions.title',
    descriptionKey: 'lessons.listComprehensions.description',
    question: `Below is the first line of your Python program:
\`numbers = input()\`
Write the rest of the program below this line to:
- Parse the input string \`numbers\` into a list of integers separated by spaces.
- Create a new list containing the squares of each number using a list comprehension.
- Print the result.

Example:
Input: 1 2 3 4 5
Output: [1, 4, 9, 16, 25]
numbers = input()`,
    questionFa: `اولین خط برنامه پایتون شما:
\`numbers = input()\`
بقیه برنامه را زیر این خط بنویسید:
- رشته ورودی \`numbers\` را به لیستی از اعداد صحیح جداشده با فاصله تبدیل کنید.
- لیستی حاوی مربع هر عدد را با list comprehension ایجاد کنید.
- نتیجه را چاپ کنید.

مثال:
ورودی: 1 2 3 4 5
خروجی: [1, 4, 9, 16, 25]
numbers = input()`,
    hint: "Use [x**2 for x in your_list] syntax.",
    hintFa: "از سینتکس [x**2 for x in your_list] استفاده کنید.",
    validateCode: (code, callback) => {
        let score = 0;

        const testCases = [
            {
                input: '1 2 3 4 5\n',
                expectedOutput: '[1, 4, 9, 16, 25]',
                weight: 25,
            },
            {
                input: '0 10 20\n',
                expectedOutput: '[0, 100, 400]',
                weight: 25,
            },
            {
                input: '-2 -1 0 1 2\n',
                expectedOutput: '[4, 1, 0, 1, 4]',
                weight: 25,
            },
            {
                input: '3\n',
                expectedOutput: '[9]',
                weight: 25,
            },
        ];

        const promises = testCases.map((testCase) => {
            return new Promise((resolve) => {
                runPythonCodeWi(code, testCase.input, (status, output) => {
                    if (status === 0 && compareStrings(testCase.expectedOutput, output)) {
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
            question: "Read a list of integers and create a new list with only the even numbers using a list comprehension.",
            questionFa: "لیستی از اعداد صحیح بخوانید و لیستی جدید با فقط اعداد زوج با list comprehension ایجاد کنید.",
            hint: "[x for x in lst if x % 2 == 0]",
            hintFa: "[x for x in lst if x % 2 == 0]",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCodeWi(code, '1 2 3 4 5 6\n', (status, output) => {
                    if (status === 0) {
                        if (code.includes('for') && code.includes('if')) score += 40;
                        if (output.includes('2') && output.includes('4') && output.includes('6') && !output.includes('1')) score += 60;
                    }
                    callback(score);
                });
            },
        },
        {
            question: "Read a list of integers and create a list of their absolute values.",
            questionFa: "لیستی از اعداد صحیح بخوانید و لیستی از مقادیر مطلق آن‌ها ایجاد کنید.",
            hint: "[abs(x) for x in lst]",
            hintFa: "[abs(x) for x in lst]",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCodeWi(code, '-3 5 -1 0 2\n', (status, output) => {
                    if (status === 0) {
                        if (output.includes('3') && output.includes('5') && output.includes('1') && output.includes('0') && output.includes('2')) score = 100;
                    }
                    callback(score);
                });
            },
        },
    ],
};
