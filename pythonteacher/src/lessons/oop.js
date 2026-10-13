const runPythonCodeWi = require('../../src/pythonRunnerWI');

module.exports = {
    id: 'oop',
    titleKey: 'lessons.oop.title',
    descriptionKey: 'lessons.oop.description',
    question: `Write a Python program that defines a class called \`Rectangle\` with:
- An \`__init__\` method that takes \`width\` and \`height\` as parameters.
- An \`area\` method that returns the area of the rectangle.
- A \`perimeter\` method that returns the perimeter of the rectangle.

Then, create an instance of \`Rectangle\` with width=5 and height=3.
Print the area and perimeter in the format:
"Area: {area}"
"Perimeter: {perimeter}"

Expected Output:
Area: 15
Perimeter: 16`,
    questionFa: `برنامه پایتونی بنویسید که کلاسی به نام \`Rectangle\` تعریف کند با:
- متد \`__init__\` که \`width\` و \`height\` را به عنوان پارامتر می‌گیرد.
- متد \`area\` که مساحت مستطیل را برمی‌گرداند.
- متد \`perimeter\` که محیط مستطیل را برمی‌گرداند.

سپس یک نمونه از \`Rectangle\` با width=5 و height=3 ایجاد کنید.
مساحت و محیط را با فرمت زیر چاپ کنید:
"Area: {area}"
"Perimeter: {perimeter}"

خروجی مورد انتظار:
Area: 15
Perimeter: 16`,
    hint: "Use class Rectangle: with def __init__(self, width, height): and methods.",
    hintFa: "از class Rectangle: با def __init__(self, width, height): و متدها استفاده کنید.",
    validateCode: (code, callback) => {
        let score = 0;

        if (code.includes('class Rectangle')) score += 30;
        if (code.includes('def __init__')) score += 20;
        if (code.includes('def area')) score += 15;
        if (code.includes('def perimeter')) score += 15;

        runPythonCodeWi(code, '', (status, output) => {
            if (status === 0) {
                if (output.includes('Area: 15') || output.includes('15')) score += 10;
                if (output.includes('Perimeter: 16') || output.includes('16')) score += 10;
            }
            callback(score);
        });
    },
    practice: [
        {
            question: "Create a class called 'Circle' with an __init__ that takes radius. Add a method 'area' that returns the area (use 3.14 as pi). Create a circle with radius 5 and print its area.",
            questionFa: "کلاسی به نام 'Circle' ایجاد کنید با __init__ که radius می‌گیرد. متد 'area' که مساحت را برمی‌گرداند اضافه کنید (از 3.14 به عنوان pi استفاده کنید). دایره‌ای با شعاع 5 ایجاد کنید و مساحت آن را چاپ کنید.",
            hint: "area = 3.14 * self.radius ** 2",
            hintFa: "area = 3.14 * self.radius ** 2",
            validateCode: (code, callback) => {
                let score = 0;
                if (code.includes('class Circle')) score += 40;
                if (code.includes('def area')) score += 30;
                if (code.includes('radius')) score += 30;
                callback(score);
            },
        },
        {
            question: "Create a class 'Person' with __init__ taking name and age. Add a method 'introduce' that prints 'My name is {name} and I am {age} years old.'",
            questionFa: "کلاس 'Person' با __init__ که name و age می‌گیرد ایجاد کنید. متد 'introduce' که 'My name is {name} and I am {age} years old.' چاپ می‌کند اضافه کنید.",
            hint: "Use self.name and self.age inside the method.",
            hintFa: "از self.name و self.age داخل متد استفاده کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                if (code.includes('class Person')) score += 40;
                if (code.includes('def introduce') || code.includes('def __str__')) score += 30;
                if (code.includes('self.name') && code.includes('self.age')) score += 30;
                callback(score);
            },
        },
    ],
};
