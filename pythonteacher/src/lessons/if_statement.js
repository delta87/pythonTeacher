const runPythonCodeWi = require('../../src/pythonRunnerWI');

module.exports = {
    id: 'ifStatement',
    titleKey: 'lessons.ifStatement.title',
    descriptionKey: 'lessons.ifStatement.description',
    question: `Below is the first line of your Python program:
\`weather = input()\`
Write the rest of the program below this line to:
- Check the value of the variable \`weather\`:
  - If the value is "sunny", print "It's a sunny day!"
  - If the value is "rainy", print "It's raining today!"
  - If the value is "cloudy", print "It's cloudy today!"
  - Otherwise, print "Weather unknown."

Do not modify the first line.
weather = input()`,
    questionFa: `اولین خط برنامه پایتون شما:
\`weather = input()\`
بقیه برنامه را زیر این خط بنویسید:
- مقدار متغیر \`weather\` را بررسی کنید:
  - اگر "sunny" باشد: "It's a sunny day!"
  - اگر "rainy" باشد: "It's raining today!"
  - اگر "cloudy" باشد: "It's cloudy today!"
  - در غیر این صورت: "Weather unknown."

اولین خط را تغییر ندهید.
weather = input()`,
    hint: "Use if, elif, and else statements.",
    hintFa: "از عبارات if، elif و else استفاده کنید.",
    validateCode: (code, callback) => {
        let score = 0;

        const testCases = [
            { input: 'sunny\n', expectedOutput: "It's a sunny day!", weight: 25 },
            { input: 'rainy\n', expectedOutput: "It's raining today!", weight: 25 },
            { input: 'cloudy\n', expectedOutput: "It's cloudy today!", weight: 25 },
            { input: 'snowy\n', expectedOutput: "Weather unknown.", weight: 25 },
        ];

        const promises = testCases.map((testCase) => {
            return new Promise((resolve) => {
                runPythonCodeWi(code, testCase.input, (status, output) => {
                    if (status === 0 && output === testCase.expectedOutput) {
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
            question: "Read an integer and print 'Positive' if it's greater than 0, 'Negative' if less than 0, and 'Zero' if it's 0.",
            questionFa: "یک عدد صحیح بخوانید و اگر بزرگتر از 0 باشد 'Positive'، اگر کوچکتر باشد 'Negative' و اگر 0 باشد 'Zero' چاپ کنید.",
            hint: "Use if, elif, else with comparison operators.",
            hintFa: "از if، elif، else با عملگرهای مقایسه‌ای استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                const tests = [
                    { input: '5\n', expected: 'Positive' },
                    { input: '-3\n', expected: 'Negative' },
                    { input: '0\n', expected: 'Zero' },
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
            question: "Read a number and print 'Even' if it's even, 'Odd' if it's odd.",
            questionFa: "یک عدد بخوانید و اگر زوج باشد 'Even'، اگر فرد باشد 'Odd' چاپ کنید.",
            hint: "Use the modulo operator % to check divisibility.",
            hintFa: "از عملگر باقیمانده % برای بررسی بخش‌پذیری استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                const tests = [
                    { input: '4\n', expected: 'Even' },
                    { input: '7\n', expected: 'Odd' },
                    { input: '0\n', expected: 'Even' },
                ];
                Promise.all(tests.map(tc => new Promise(res => {
                    runPythonCodeWi(code, tc.input, (status, output) => {
                        if (status === 0 && output.trim() === tc.expected) score += 34;
                        res();
                    });
                }))).then(() => callback(Math.min(score, 100)));
            },
        },
    ],
};
