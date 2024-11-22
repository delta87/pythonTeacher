const outputs = [
    `Sum: 15
Difference: 5
Multiplication Result: 50
Quotient: 2.00`, 

`Sum: 4
Difference: 10
Multiplication Result: -21
Quotient: -2.33`,

`Sum: 8
Difference: 8
Multiplication Result: 0
Division by zero is not allowed.`,

`Sum: -10
Difference: 2
Multiplication Result: 24
Quotient: 0.67`

]

const Goals = [
    "Sum: 15\nDifference: 5\nMultiplication Result: 50\nQuotient: 2.00",
    `Sum: 4\nDifference: 10\nMultiplication Result: -21\nQuotient: -2.33`, 
    `Sum: 8\nDifference: 8\nMultiplication Result: 0\nDivision by zero is not allowed.`,
    `Sum: -10\nDifference: 2\nMultiplication Result: 24\nQuotient: 0.67`
]

function toRawString(str) {
    return str.replace(/\\/g, '\\\\')
              .replace(/\n/g, '\\n')
              .replace(/\t/g, '\\t')
              .replace(/\r/g, '\\r')
              .replace(/'/g, '\\\'')
              .replace(/"/g, '\\"');
}

function cleanString(sss){
    const rawString = toRawString(sss);
    console.log(rawString); // خروجی: Hello\nWorld\t!
    console.log(Goals[0])
}

cleanString(outputs[0])


// حذف نقل‌قول‌های اضافی و escape sequences
// const cleanedRaw = normalString;

// مقایسه و پیدا کردن تفاوت‌ها



