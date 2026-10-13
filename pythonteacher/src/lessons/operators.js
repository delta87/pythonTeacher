const runPythonCodeWi = require('../../src/pythonRunnerWI');
const compareStrings = require('../../src/compareStrings');

module.exports = {
    id: 'operators',
    titleKey: 'lessons.operators.title',
    descriptionKey: 'lessons.operators.description',
    question: `Below is the first line of your Python program:
\`numbers = input()\`
Write the rest of the program below this line to:
- Parse the input string \`numbers\` into two integers separated by a space.
- Perform the following operations on the two integers:
  - Add them and print: "Sum: {result}"
  - Subtract the second from the first and print: "Difference: {result}"
  - Multiply them and print: "Multiplication Result: {result}"
  - If the second number is not zero, divide and print: "Quotient: {result:.2f}"
  - If the second number is zero, print: "Division by zero is not allowed."

Example:
Input: 10 5
Output:
Sum: 15
Difference: 5
Multiplication Result: 50
Quotient: 2.00
numbers = input()`,
    questionFa: `اولین خط برنامه پایتون شما:
\`numbers = input()\`
بقیه برنامه را زیر این خط بنویسید:
- رشته ورودی \`numbers\` را به دو عدد صحیح جداشده با فاصله تبدیل کنید.
- عملیات زیر را انجام دهید:
  - جمع: "Sum: {result}"
  - تفریق: "Difference: {result}"
  - ضرب: "Multiplication Result: {result}"
  - اگر عدد دوم صفر نباشد، تقسیم: "Quotient: {result:.2f}"
  - اگر عدد دوم صفر باشد: "Division by zero is not allowed."

مثال:
ورودی: 10 5
خروجی:
Sum: 15
Difference: 5
Multiplication Result: 50
Quotient: 2.00
numbers = input()`,
    hint: "Use a, b = map(int, input().split()) to parse two integers.",
    hintFa: "از a, b = map(int, input().split()) برای تجزیه دو عدد صحیح استفاده کنید.",
    validateCode: (code, callback) => {
        let score = 0;

        const testCases = [
            {
                input: '10 5\n',
                expectedOutput: `Sum: 15\nDifference: 5\nMultiplication Result: 50\nQuotient: 2.00`,
                weight: 25,
            },
            {
                input: '7 -3\n',
                expectedOutput: `Sum: 4\nDifference: 10\nMultiplication Result: -21\nQuotient: -2.33`,
                weight: 25,
            },
            {
                input: '8 0\n',
                expectedOutput: `Sum: 8\nDifference: 8\nMultiplication Result: 0\nDivision by zero is not allowed.`,
                weight: 25,
            },
            {
                input: '-4 -6\n',
                expectedOutput: `Sum: -10\nDifference: 2\nMultiplication Result: 24\nQuotient: 0.67`,
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
            question: "Read two integers and print their product.",
            questionFa: "دو عدد صحیح بخوانید و حاصل ضرب آن‌ها را چاپ کنید.",
            hint: "a, b = map(int, input().split()); print(a * b)",
            hintFa: "a, b = map(int, input().split()); print(a * b)",
            validateCode: (code, callback) => {
                let score = 0;
                const tests = [
                    { input: '3 4\n', expected: '12' },
                    { input: '10 10\n', expected: '100' },
                    { input: '-5 6\n', expected: '-30' },
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
            question: "Read a number and print its square.",
            questionFa: "یک عدد بخوانید و مربع آن را چاپ کنید.",
            hint: "print(int(input()) ** 2)",
            hintFa: "print(int(input()) ** 2)",
            validateCode: (code, callback) => {
                let score = 0;
                const tests = [
                    { input: '5\n', expected: '25' },
                    { input: '12\n', expected: '144' },
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
