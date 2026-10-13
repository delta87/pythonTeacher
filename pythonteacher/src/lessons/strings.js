const runPythonCodeWi = require('../../src/pythonRunnerWI');

module.exports = {
    id: 'strings',
    titleKey: 'lessons.strings.strings.title',
    descriptionKey: 'lessons.strings.description',
    question: `Below is the first line of your Python program:
\`input_string = input()\`
Write the rest of the program below this line to:
- Check if the string in the variable \`input_string\`:
  - Starts with the word "Hello" (case-sensitive): Print "Greeting detected."
  - Ends with an exclamation mark: Print "Excited tone detected."
  - Contains the substring "Python": Print "Python mentioned!"
- Otherwise, print "No special patterns detected."

Handle the cases in the order mentioned above, and ensure only one message is printed for each input.
input_string = input()`,
    questionFa: `اولین خط برنامه پایتون شما:
\`input_string = input()\`
بقیه برنامه را زیر این خط بنویسید:
- اگر رشته در متغیر \`input_string\`:
  - با کلمه "Hello" شروع شود: "Greeting detected."
  - با علامت تعجب تمام شود: "Excited tone detected."
  - شامل زیررشته "Python" باشد: "Python mentioned!"
- در غیر این صورت: "No special patterns detected."

input_string = input()`,
    hint: "Use .startswith(), .endswith(), and the `in` keyword.",
    hintFa: "از .startswith()، .endswith() و کلیدواژه `in` استفاده کنید.",
    validateCode: (code, callback) => {
        let score = 0;

        const testCases = [
            { input: 'Hello there!\n', expectedOutput: "Greeting detected.", weight: 25 },
            { input: 'Wow, this is fun!\n', expectedOutput: "Excited tone detected.", weight: 25 },
            { input: 'I love Python programming.\n', expectedOutput: "Python mentioned!", weight: 25 },
            { input: 'Just a regular sentence.\n', expectedOutput: "No special patterns detected.", weight: 25 },
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
            question: "Read a string and print its length.",
            questionFa: "یک رشته بخوانید و طول آن را چاپ کنید.",
            hint: "Use the len() function.",
            hintFa: "از تابع len() استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCodeWi(code, 'hello\n', (status, output) => {
                    if (status === 0 && output.trim() === '5') score = 100;
                    callback(score);
                });
            },
        },
        {
            question: "Read a string and print it in uppercase.",
            questionFa: "یک رشته بخوانید و آن را با حروف بزرگ چاپ کنید.",
            hint: "Use the .upper() method.",
            hintFa: "از متد .upper() استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCodeWi(code, 'hello world\n', (status, output) => {
                    if (status === 0 && output.trim() === 'HELLO WORLD') score = 100;
                    callback(score);
                });
            },
        },
        {
            question: "Read a string and reverse it, then print the result.",
            questionFa: "یک رشته بخوانید و آن را معکوس کنید، سپس نتیجه را چاپ کنید.",
            hint: "Use slicing: string[::-1]",
            hintFa: "از برش: string[::-1] استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCodeWi(code, 'python\n', (status, output) => {
                    if (status === 0 && output.trim() === 'nohtyp') score = 100;
                    callback(score);
                });
            },
        },
    ],
};
