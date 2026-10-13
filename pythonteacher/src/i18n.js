const vscode = require('vscode');

// All UI strings for both locales. Add new keys here to support both languages.
const translations = {
    en: {
        sidebarTitle: 'Python Teacher',
        progress: 'Progress',
        completed: 'Completed',
        notStarted: 'Not started',
        inProgress: 'In progress',
        practice: 'Practice',
        lesson: 'Lesson',
        of: 'of',
        exercises: 'exercises',
        startLesson: 'Start Lesson',
        language: 'Language',
        english: 'English',
        persian: 'Persian',
        resetProgress: 'Reset Progress',
        resetConfirm: 'Are you sure you want to reset all progress?',
        yes: 'Yes',
        no: 'No',
        score: 'Score',
        perfect: 'Perfect!',
        someIssues: 'Some issues found.',
        failed: 'Validation failed.',
        clickToValidate: 'Click to validate your code',
        lessonComplete: 'Lesson Complete!',
        nextLesson: 'Next Lesson',
        backToLessons: 'Back to Lessons',
        showHint: 'Show Hint',
        hideHint: 'Hide Hint',
        runCode: 'Run Code',
        output: 'Output',
        noOutput: 'No output',
        lessonLocked: 'Complete previous lessons to unlock',
        category: {
            basics: 'Basics',
            dataStructures: 'Data Structures',
            controlFlow: 'Control Flow',
            functions: 'Functions',
            advanced: 'Advanced',
        },
        sections: {
            lessons: 'Lessons',
            practiceExercises: 'Practice Exercises',
        },
        validation: {
            correct: 'Correct!',
            incorrect: 'Not quite right. Try again.',
            syntaxError: 'Syntax error in your code.',
            timeout: 'Code execution timed out.',
        }
    },
    fa: {
        sidebarTitle: 'معلم پایتون',
        progress: 'پیشرفت',
        completed: 'تکمیل شده',
        notStarted: 'شروع نشده',
        inProgress: 'در حال انجام',
        practice: 'تمرین',
        lesson: 'درس',
        of: 'از',
        exercises: 'تمرین',
        startLesson: 'شروع درس',
        language: 'زبان',
        english: 'انگلیسی',
        persian: 'فارسی',
        resetProgress: 'بازنشانی پیشرفت',
        resetConfirm: 'آیا از بازنشانی تمام پیشرفت اطمینان دارید؟',
        yes: 'بله',
        no: 'خیر',
        score: 'امتیاز',
        perfect: 'عالی!',
        someIssues: 'مشکلاتی یافت شد.',
        failed: 'اعتبارسنجی ناموفق بود.',
        clickToValidate: 'برای اعتبارسنجی کد کلیک کنید',
        lessonComplete: 'درس تکمیل شد!',
        nextLesson: 'درس بعدی',
        backToLessons: 'بازگشت به درس‌ها',
        showHint: 'نمایش راهنما',
        hideHint: 'پنهان کردن راهنما',
        runCode: 'اجرای کد',
        output: 'خروجی',
        noOutput: 'خروجی وجود ندارد',
        lessonLocked: 'برای باز کردن، درس‌های قبلی را تکمیل کنید',
        category: {
            basics: 'مبانی',
            dataStructures: 'ساختارهای داده',
            controlFlow: 'کنترل جریان',
            functions: 'توابع',
            advanced: 'پیشرفته',
        },
        sections: {
            lessons: 'درس‌ها',
            practiceExercises: 'تمرین‌های عملی',
        },
        validation: {
            correct: 'درست!',
            incorrect: 'درست نیست. دوباره تلاش کنید.',
            syntaxError: 'خطای نحوی در کد شما.',
            timeout: 'زمان اجرای کد به پایان رسید.',
        }
    }
};

let currentLocale = 'en';

function getLocale() {
    const config = vscode.workspace.getConfiguration('pythonteacher');
    const saved = config.get('language');
    if (saved && translations[saved]) {
        return saved;
    }
    return currentLocale;
}

function setLocale(locale) {
    currentLocale = locale;
    const config = vscode.workspace.getConfiguration('pythonteacher');
    config.update('language', locale, true);
}

function t(key) {
    const locale = getLocale();
    const keys = key.split('.');
    let value = translations[locale];
    for (const k of keys) {
        value = value?.[k];
    }
    if (typeof value !== 'string') {
        let fallback = translations.en;
        for (const k of keys) {
            fallback = fallback?.[k];
        }
        value = fallback || key;
    }
    return value;
}

function isRTL() {
    return getLocale() === 'fa';
}

module.exports = { t, getLocale, setLocale, isRTL, translations };
