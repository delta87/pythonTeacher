const runPythonCodeWi = require('../../src/pythonRunnerWI');
const compareStrings = require('../../src/compareStrings');

module.exports = {
    id: 'sets',
    titleKey: 'lessons.sets.title',
    descriptionKey: 'lessons.sets.description',
    question: `Below is the first line of your Python program:
\`numbers = input()\`
Write the rest of the program below this line to:
- Parse the input string \`numbers\` into a set of integers separated by spaces.
- Perform the following operations:
  1. Print the unique elements sorted: "Unique Elements: {result}"
  2. Print the largest and smallest: "Largest: {largest}" and "Smallest: {smallest}"
  3. Add 100 to the set, print: "Updated Set: {result}" (sorted)
  4. Remove the smallest element, print: "After Removal: {result}" (sorted)

Example:
Input: 5 3 8 1 2 5 3
Output:
Unique Elements: [1, 2, 3, 5, 8]
Largest: 8
Smallest: 1
Updated Set: [1, 2, 3, 5, 8, 100]
After Removal: [2, 3, 5, 8, 100]
numbers = input()`,
    questionFa: `اولین خط برنامه پایتون شما:
\`numbers = input()\`
بقیه برنامه را زیر این خط بنویسید:
- رشته ورودی \`numbers\` را به مجموعه‌ای از اعداد صحیح جداشده با فاصله تبدیل کنید.
- عملیات زیر را انجام دهید:
  1. عناصر یکتا مرتب شده: "Unique Elements: {result}"
  2. بزرگترین و کوچکترین: "Largest: {largest}" و "Smallest: {smallest}"
  3. افزودن 100: "Updated Set: {result}" (مرتب)
  4. حذف کوچکترین عنصر: "After Removal: {result}" (مرتب)

مثال:
ورودی: 5 3 8 1 2 5 3
خروجی:
Unique Elements: [1, 2, 3, 5, 8]
Largest: 8
Smallest: 1
Updated Set: [1, 2, 3, 5, 8, 100]
After Removal: [2, 3, 5, 8, 100]
numbers = input()`,
    hint: "Use set(map(int, input().split())) and sorted() for ordered output.",
    hintFa: "از set(map(int, input().split())) و sorted() برای خروجی مرتب استفاده کنید.",
    validateCode: (code, callback) => {
        let score = 0;

        const testCases = [
            {
                input: '5 3 8 1 2 5 3\n',
                expectedOutput: `Unique Elements: [1, 2, 3, 5, 8]\nLargest: 8\nSmallest: 1\nUpdated Set: [1, 2, 3, 5, 8, 100]\nAfter Removal: [2, 3, 5, 8, 100]`,
                weight: 25,
            },
            {
                input: '10 20 10 30\n',
                expectedOutput: `Unique Elements: [10, 20, 30]\nLargest: 30\nSmallest: 10\nUpdated Set: [10, 20, 30, 100]\nAfter Removal: [20, 30, 100]`,
                weight: 25,
            },
            {
                input: '50 50 50\n',
                expectedOutput: `Unique Elements: [50]\nLargest: 50\nSmallest: 50\nUpdated Set: [50, 100]\nAfter Removal: [100]`,
                weight: 25,
            },
            {
                input: '7 3 1 4 6\n',
                expectedOutput: `Unique Elements: [1, 3, 4, 6, 7]\nLargest: 7\nSmallest: 1\nUpdated Set: [1, 3, 4, 6, 7, 100]\nAfter Removal: [3, 4, 6, 7, 100]`,
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
            question: "Read a list of integers and print the count of unique elements.",
            questionFa: "لیستی از اعداد صحیح بخوانید و تعداد عناصر یکتا را چاپ کنید.",
            hint: "Convert to a set and use len().",
            hintFa: "به مجموعه تبدیل کنید و از len() استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCodeWi(code, '1 2 2 3 3 3\n', (status, output) => {
                    if (status === 0 && output.trim() === '3') score = 100;
                    callback(score);
                });
            },
        },
        {
            question: "Read two lines of integers (two sets) and print their intersection sorted.",
            questionFa: "دو خط از اعداد صحیح (دو مجموعه) بخوانید و اشتراک آن‌ها را مرتب چاپ کنید.",
            hint: "Use set1 & set2 or set1.intersection(set2).",
            hintFa: "از set1 & set2 یا set1.intersection(set2) استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCodeWi(code, '1 2 3 4\n3 4 5 6\n', (status, output) => {
                    if (status === 0) {
                        if (output.includes('3') && output.includes('4') && !output.includes('1') && !output.includes('5')) score = 100;
                    }
                    callback(score);
                });
            },
        },
    ],
};
