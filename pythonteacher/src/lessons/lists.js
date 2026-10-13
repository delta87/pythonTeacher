const runPythonCodeWi = require('../../src/pythonRunnerWI');
const compareStrings = require('../../src/compareStrings');

module.exports = {
    id: 'lists',
    titleKey: 'lessons.lists.title',
    descriptionKey: 'lessons.lists.description',
    question: `Below is the first line of your Python program:
\`numbers = input()\`
Write the rest of the program below this line to:
- Parse the input string \`numbers\` into a list of integers separated by spaces.
- Perform the following operations on the list:
  1. Print the largest number: "Largest: {result}"
  2. Print the smallest number: "Smallest: {result}"
  3. Print the sum of all numbers: "Sum: {result}"
  4. Sort the list in ascending order and print: "Sorted List: {result}"

Example:
Input: 5 3 8 1 2
Output:
Largest: 8
Smallest: 1
Sum: 19
Sorted List: [1, 2, 3, 5, 8]
numbers = input()`,
    questionFa: `اولین خط برنامه پایتون شما:
\`numbers = input()\`
بقیه برنامه را زیر این خط بنویسید:
- رشته ورودی \`numbers\` را به لیستی از اعداد صحیح جداشده با فاصله تبدیل کنید.
- عملیات زیر را انجام دهید:
  1. بزرگترین عدد: "Largest: {result}"
  2. کوچکترین عدد: "Smallest: {result}"
  3. مجموع: "Sum: {result}"
  4. مرتب‌سازی صعودی: "Sorted List: {result}"

مثال:
ورودی: 5 3 8 1 2
خروجی:
Largest: 8
Smallest: 1
Sum: 19
Sorted List: [1, 2, 3, 5, 8]
numbers = input()`,
    hint: "Use list(map(int, input().split())) to parse, then max(), min(), sum(), sorted().",
    hintFa: "از list(map(int, input().split())) برای تجزیه، سپس max()، min()، sum()، sorted() استفاده کنید.",
    validateCode: (code, callback) => {
        let score = 0;

        const testCases = [
            {
                input: '5 3 8 1 2\n',
                expectedOutput: `Largest: 8\nSmallest: 1\nSum: 19\nSorted List: [1, 2, 3, 5, 8]`,
                weight: 25,
            },
            {
                input: '10 20 30 40 50\n',
                expectedOutput: `Largest: 50\nSmallest: 10\nSum: 150\nSorted List: [10, 20, 30, 40, 50]`,
                weight: 25,
            },
            {
                input: '-1 -5 -3 -4 -2\n',
                expectedOutput: `Largest: -1\nSmallest: -5\nSum: -15\nSorted List: [-5, -4, -3, -2, -1]`,
                weight: 25,
            },
            {
                input: '7\n',
                expectedOutput: `Largest: 7\nSmallest: 7\nSum: 7\nSorted List: [7]`,
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
            question: "Read a list of integers and print only the even numbers.",
            questionFa: "لیستی از اعداد صحیح بخوانید و فقط اعداد زوج را چاپ کنید.",
            hint: "Use a loop with the modulo operator to filter even numbers.",
            hintFa: "از حلقه با عملگر باقیمانده برای فیلتر اعداد زوج استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCodeWi(code, '1 2 3 4 5 6\n', (status, output) => {
                    if (status === 0) {
                        if (code.includes('%') && code.includes('2')) score += 40;
                        if (output.includes('2') && output.includes('4') && output.includes('6')) score += 60;
                    }
                    callback(score);
                });
            },
        },
        {
            question: "Read a list of integers and print the average as a float.",
            questionFa: "لیستی از اعداد صحیح بخوانید و میانگین آن‌ها را به صورت اعشاری چاپ کنید.",
            hint: "Use sum() and len() to compute the average.",
            hintFa: "از sum() و len() برای محاسبه میانگین استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                const tests = [
                    { input: '10 20 30\n', expected: '20.0' },
                    { input: '5 5\n', expected: '5.0' },
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
