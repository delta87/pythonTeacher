const runPythonCodeWi = require('../../src/pythonRunnerWI');
const compareStrings = require('../../src/compareStrings');

module.exports = {
    id: 'dictionaries',
    titleKey: 'lessons.dictionaries.title',
    descriptionKey: 'lessons.dictionaries.description',
    question: `Below is the first line of your Python program:
\`entries = input()\`
Write the rest of the program below this line to:
- Parse the input string \`entries\` into a dictionary. The input format is:
  "key1:value1, key2:value2, key3:value3" (keys and values are separated by colons and pairs by commas).
- Perform the following operations:
  1. Print the dictionary: "Dictionary: {result}"
  2. Find and print the key with the largest value: "Key with Largest Value: {key}"
  3. Remove the key with the smallest value: "After Removal: {result}"
  4. Add a new key-value pair ("new_key": 100): "Final Dictionary: {result}"

Example:
Input: a:10, b:20, c:5
Output:
Dictionary: {'a': 10, 'b': 20, 'c': 5}
Key with Largest Value: b
After Removal: {'a': 10, 'b': 20}
Final Dictionary: {'a': 10, 'b': 20, 'new_key': 100}
entries = input()`,
    questionFa: `اولین خط برنامه پایتون شما:
\`entries = input()\`
بقیه برنامه را زیر این خط بنویسید:
- رشته ورودی \`entries\` را به دیکشنری تبدیل کنید. فرمت ورودی:
  "key1:value1, key2:value2, key3:value3" (کلیدها و مقادیر با دو نقطه و جفت‌ها با کاما جدا شده‌اند).
- عملیات زیر را انجام دهید:
  1. چاپ دیکشنری: "Dictionary: {result}"
  2. کلید با بزرگترین مقدار: "Key with Largest Value: {key}"
  3. حذف کلید با کوچکترین مقدار: "After Removal: {result}"
  4. افزودن جفت جدید ("new_key": 100): "Final Dictionary: {result}"

مثال:
ورودی: a:10, b:20, c:5
خروجی:
Dictionary: {'a': 10, 'b': 20, 'c': 5}
Key with Largest Value: b
After Removal: {'a': 10, 'b': 20}
Final Dictionary: {'a': 10, 'b': 20, 'new_key': 100}
entries = input()`,
    hint: "Parse using split(',') then split(':') for each pair.",
    hintFa: "با split(',') و سپس split(':') برای هر جفت تجزیه کنید.",
    validateCode: (code, callback) => {
        let score = 0;

        const testCases = [
            {
                input: 'a:10, b:20, c:5\n',
                expectedOutput: `Dictionary: {'a': 10, 'b': 20, 'c': 5}\nKey with Largest Value: b\nAfter Removal: {'a': 10, 'b': 20}\nFinal Dictionary: {'a': 10, 'b': 20, 'new_key': 100}`,
                weight: 25,
            },
            {
                input: 'apple:40, banana:15, cherry:25\n',
                expectedOutput: `Dictionary: {'apple': 40, 'banana': 15, 'cherry': 25}\nKey with Largest Value: apple\nAfter Removal: {'apple': 40, 'cherry': 25}\nFinal Dictionary: {'apple': 40, 'cherry': 25, 'new_key': 100}`,
                weight: 25,
            },
            {
                input: 'x:50, y:100, z:1\n',
                expectedOutput: `Dictionary: {'x': 50, 'y': 100, 'z': 1}\nKey with Largest Value: y\nAfter Removal: {'x': 50, 'y': 100}\nFinal Dictionary: {'x': 50, 'y': 100, 'new_key': 100}`,
                weight: 25,
            },
            {
                input: 'key1:200, key2:50, key3:300\n',
                expectedOutput: `Dictionary: {'key1': 200, 'key2': 50, 'key3': 300}\nKey with Largest Value: key3\nAfter Removal: {'key1': 200, 'key3': 300}\nFinal Dictionary: {'key1': 200, 'key3': 300, 'new_key': 100}`,
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
            question: "Read key:value pairs and print all keys.",
            questionFa: "جفت‌های key:value را بخوانید و تمام کلیدها را چاپ کنید.",
            hint: "Use .keys() method on the dictionary.",
            hintFa: "از متد .keys() روی دیکشنری استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCodeWi(code, 'a:1, b:2, c:3\n', (status, output) => {
                    if (status === 0) {
                        if (output.includes('a') && output.includes('b') && output.includes('c')) score = 100;
                    }
                    callback(score);
                });
            },
        },
        {
            question: "Read key:value pairs and print all values sorted in ascending order.",
            questionFa: "جفت‌های key:value را بخوانید و تمام مقادیر را به صورت صعودی چاپ کنید.",
            hint: "Use sorted(d.values()).",
            hintFa: "از sorted(d.values()) استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCodeWi(code, 'x:30, y:10, z:20\n', (status, output) => {
                    if (status === 0) {
                        if (output.includes('10') && output.includes('20') && output.includes('30')) score = 100;
                    }
                    callback(score);
                });
            },
        },
    ],
};
