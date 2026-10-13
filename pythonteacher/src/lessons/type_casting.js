const runPythonCode = require('../../src/pythonRunner');

module.exports = {
    id: 'typeCasting',
    titleKey: 'lessons.typeCasting.title',
    descriptionKey: 'lessons.typeCasting.description',
    question: `Define the following variables:
- 'initial_num' as an integer with a value of 10.
- 'num_str' as a string representation of 'initial_num'.
- 'flt_num' as the float value of 'num_str'.
- 'sum_val' as the sum of 'initial_num' and 'flt_num', but cast it to an integer.`,
    questionFa: `متغیرهای زیر را تعریف کنید:
- 'initial_num' به عنوان عدد صحیح با مقدار 10.
- 'num_str' به عنوان نمایش رشته‌ای 'initial_num'.
- 'flt_num' به مقدار اعشاری 'num_str'.
- 'sum_val' به عنوان مجموع 'initial_num' و 'flt_num'، اما به عدد صحیح تبدیل شده.`,
    hint: "Use str(), float(), and int() for type casting.",
    hintFa: "از str()، float() و int() برای تبدیل نوع استفاده کنید.",
    validateCode: (code, callback) => {
        let score = 0;

        const promises = [
            new Promise((resolve) => {
                let extraCode = `\nif not (isinstance(initial_num, int) and initial_num == 10):\n    raise ValueError()`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 25;
                    resolve();
                });
            }),
            new Promise((resolve) => {
                let extraCode = `\nif not (isinstance(num_str, str) and num_str == str(initial_num)):\n    raise ValueError()`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 25;
                    resolve();
                });
            }),
            new Promise((resolve) => {
                let extraCode = `\nif not (isinstance(flt_num, float) and flt_num == float(num_str)):\n    raise ValueError()`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 25;
                    resolve();
                });
            }),
            new Promise((resolve) => {
                let extraCode = `\nif not (isinstance(sum_val, int) and sum_val == int(initial_num + flt_num)):\n    raise ValueError()`;
                runPythonCode(code + extraCode, (status) => {
                    if (status === 0) score += 25;
                    resolve();
                });
            }),
        ];

        Promise.all(promises)
            .then(() => callback(score))
            .catch(() => callback(0));
    },
    practice: [
        {
            question: "Convert the string '42' to an integer and print it.",
            questionFa: "رشته '42' را به عدد صحیح تبدیل کنید و چاپ کنید.",
            hint: "Use int('42')",
            hintFa: "از int('42') استفاده کنید",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCode(code, (status, output) => {
                    if (status === 0 && output.trim() === '42') score = 100;
                    callback(score);
                });
            },
        },
        {
            question: "Convert the float 3.14 to an integer and print the result.",
            questionFa: "عدد اعشاری 3.14 را به عدد صحیح تبدیل کنید و نتیجه را چاپ کنید.",
            hint: "Use int(3.14) — this truncates the decimal.",
            hintFa: "از int(3.14) استفاده کنید — این اعشار را حذف می‌کند.",
            validateCode: (code, callback) => {
                let score = 0;
                runPythonCode(code, (status, output) => {
                    if (status === 0 && output.trim() === '3') score = 100;
                    callback(score);
                });
            },
        },
    ],
};
