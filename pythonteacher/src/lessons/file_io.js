module.exports = {
    id: 'fileIO',
    titleKey: 'lessons.fileIO.title',
    descriptionKey: 'lessons.fileIO.description',
    question: `Write a Python program that:
1. Creates a file called 'output.txt'
2. Writes the numbers 1 through 5, each on a new line, into the file.
3. Reads the file back and prints its contents.
4. Then appends the number 6 to the file.
5. Reads the file again and prints its contents.

Expected Output:
1
2
3
4
5
1
2
3
4
5
6`,
    questionFa: `برنامه پایتونی بنویسید که:
1. فایلی به نام 'output.txt' ایجاد کند.
2. اعداد 1 تا 5 را هر کدام در یک خط در فایل بنویسد.
3. فایل را بخواند و محتوای آن را چاپ کند.
4. سپس عدد 6 را به فایل اضافه کند.
5. فایل را دوباره بخواند و محتوا را چاپ کند.

خروجی مورد انتظار:
1
2
3
4
5
1
2
3
4
5
6`,
    hint: "Use open('output.txt', 'w') for writing and open('output.txt', 'a') for appending.",
    hintFa: "از open('output.txt', 'w') برای نوشتن و open('output.txt', 'a') برای افزودن استفاده کنید.",
    validateCode: (code, callback) => {
        let score = 0;

        if (code.includes('output.txt') || code.includes('open')) {
            score += 30;
        }
        if (code.includes("'w'") || code.includes('"w"')) {
            score += 20;
        }
        if (code.includes("'a'") || code.includes('"a"')) {
            score += 20;
        }
        if (code.includes('write') || code.includes('writelines')) {
            score += 30;
        }

        callback(score);
    },
    practice: [
        {
            question: "Write a program that reads a file 'data.txt' and counts the number of lines in it. Print the count.",
            questionFa: "برنامه‌ای بنویسید که فایل 'data.txt' را بخواند و تعداد خطوط آن را بشمارد. تعداد را چاپ کنید.",
            hint: "Use with open('data.txt') as f: lines = f.readlines()",
            hintFa: "از with open('data.txt') as f: lines = f.readlines() استفاده کنید",
            validateCode: (code, callback) => {
                let score = 0;
                if (code.includes('open') && code.includes('read')) score += 50;
                if (code.includes('len') || code.includes('count')) score += 50;
                callback(score);
            },
        },
        {
            question: "Write a program that reads a file 'numbers.txt' (one number per line) and prints the sum of all numbers.",
            questionFa: "برنامه‌ای بنویسید که فایل 'numbers.txt' را بخواند (یک عدد در هر خط) و مجموع اعداد را چاپ کنید.",
            hint: "Read each line, convert to int, and accumulate the sum.",
            hintFa: "هر خط را بخوانید، به int تبدیل کنید و مجموع را جمع کنید.",
            validateCode: (code, callback) => {
                let score = 0;
                if (code.includes('open') && code.includes('read')) score += 40;
                if (code.includes('sum') || code.includes('int')) score += 60;
                callback(score);
            },
        },
    ],
};
