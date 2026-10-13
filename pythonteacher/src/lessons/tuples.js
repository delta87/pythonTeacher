const runPythonCodeWi = require('../../src/pythonRunnerWI');
const compareStrings = require('../../src/compareStrings');

module.exports = {
    id: 'tuples',
    titleKey: 'lessons.tuples.title',
    descriptionKey: 'lessons.tuples.description',
    question: `Below is the first line of your Python program:
\`numbers = input()\`
Write the rest of the program below this line to:
- Parse the input string \`numbers\` into a tuple of integers separated by spaces.
- Perform the following operations:
  1. Print the length: "Length: {result}"
  2. Print the first and last elements: "First Element: {first}" and "Last Element: {last}"
  3. Check if 5 exists in the tuple. If yes, print: "5 is in the tuple." Otherwise: "5 is not in the tuple."
  4. Print the reversed tuple: "Reversed Tuple: {result}"

Example:
Input: 10 20 5 40
Output:
Length: 4
First Element: 10
Last Element: 40
5 is in the tuple.
Reversed Tuple: (40, 5, 20, 10)
numbers = input()`,
    questionFa: `اولین خط برنامه پایتون شما:
\`numbers = input()\`
بقیه برنامه را زیر این خط بنویسید:
- رشته ورودی \`numbers\` را به تاپلی از اعداد صحیح جداشده با فاصله تبدیل کنید.
- عملیات زیر را انجام دهید:
  1. طول: "Length: {result}"
  2. اولین و آخرین عنصر: "First Element: {first}" و "Last Element: {last}"
  3. بررسی وجود 5 در تاپل: "5 is in the tuple." یا "5 is not in the tuple."
  4. تاپل معکوس: "Reversed Tuple: {result}"

مثال:
ورودی: 10 20 5 40
خروجی:
Length: 4
First Element: 10
Last Element: 40
5 is in the tuple.
Reversed Tuple: (40, 5, 20, 10)
numbers = input()`,
    hint: "Use tuple(map(int, input().split())) and slicing [::-1] to reverse.",
    hintFa: "از tuple(map(int, input().split())) و برش [::-1] برای معکوس کردن استفاده کنید.",
    validateCode: (code, callback) => {
        let score = 0;

        const testCases = [
            {
                input: '10 20 5 40\n',
                expectedOutput: `Length: 4\nFirst Element: 10\nLast Element: 40\n5 is in the tuple.\nReversed Tuple: (40, 5, 20, 10)`,
                weight: 25,
            },
            {
                input: '1 2 3 4\n',
                expectedOutput: `Length: 4\nFirst Element: 1\nLast Element: 4\n5 is not in the tuple.\nReversed Tuple: (4, 3, 2, 1)`,
                weight: 25,
            },
            {
                input: '5\n',
                expectedOutput: `Length: 1\nFirst Element: 5\nLast Element: 5\n5 is in the tuple.\nReversed Tuple: (5,)`,
                weight: 25,
            },
            {
                input: '100 -50 25\n',
                expectedOutput: `Length: 3\nFirst Element: 100\nLast Element: 25\n5 is not in the tuple.\nReversed Tuple: (25, -50, 100)`,
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
            question: "Read a tuple of integers and print the sum of all elements.",
            questionFa: "تاپلی از اعداد صحیح بخوانید و مجموع عناصر آن را چاپ کنید.",
            hint: "Use sum() on the tuple.",
            hintFa: "از sum() روی تاپل استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                const tests = [
                    { input: '1 2 3\n', expected: '6' },
                    { input: '10 20 30\n', expected: '60' },
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
            question: "Read a tuple of integers and find the maximum value.",
            questionFa: "تاپلی از اعداد صحیح بخوانید و بزرگترین مقدار را بیابید.",
            hint: "Use max() on the tuple.",
            hintFa: "از max() روی تاپل استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                const tests = [
                    { input: '3 7 2 9 1\n', expected: '9' },
                    { input: '-5 -2 -10\n', expected: '-2' },
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
