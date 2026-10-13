const variables = require('./variables');
const dataTypes = require('./data_types');
const typeCasting = require('./type_casting');
const operators = require('./operators');
const ifStatement = require('./if_statement');
const strings = require('./strings');
const lists = require('./lists');
const tuples = require('./tuples');
const sets = require('./sets');
const dictionaries = require('./dictionaries');
const loops = require('./loops');
const functions = require('./functions');
const listComprehensions = require('./list_comprehensions');
const errorHandling = require('./error_handling');
const fileIO = require('./file_io');
const oop = require('./oop');
const modules = require('./modules');

// Lesson categories: lessons unlock sequentially per category
const categories = [
    {
        id: 'basics',
        order: 1,
        lessons: [variables, dataTypes, typeCasting, operators],
    },
    {
        id: 'controlFlow',
        order: 2,
        lessons: [ifStatement, loops],
    },
    {
        id: 'dataStructures',
        order: 3,
        lessons: [strings, lists, tuples, sets, dictionaries],
    },
    {
        id: 'functions',
        order: 4,
        lessons: [functions, listComprehensions],
    },
    {
        id: 'advanced',
        order: 5,
        lessons: [errorHandling, fileIO, oop, modules],
    },
];

const lessonMap = new Map();
for (const cat of categories) {
    for (const lesson of cat.lessons) {
        lesson.category = cat.id;
        lessonMap.set(lesson.id, lesson);
    }
}

function getAllLessons() {
    const result = [];
    for (const cat of categories) {
        for (const lesson of cat.lessons) {
            result.push(lesson);
        }
    }
    return result;
}

function getLesson(id) {
    return lessonMap.get(id);
}

function getCategories() {
    return categories;
}

function getLessonIndex(id) {
    const all = getAllLessons();
    return all.findIndex(l => l.id === id);
}

function getNextLesson(id) {
    const all = getAllLessons();
    const idx = getLessonIndex(id);
    return idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;
}

function getPreviousLesson(id) {
    const all = getAllLessons();
    const idx = getLessonIndex(id);
    return idx > 0 ? all[idx - 1] : null;
}

function isLessonUnlocked(lessonId, completedLessons) {
    const all = getAllLessons();
    const idx = getLessonIndex(lessonId);
    if (idx <= 0) return true;
    const prev = all[idx - 1];
    return !!completedLessons[prev.id];
}

module.exports = {
    getAllLessons,
    getLesson,
    getCategories,
    getNextLesson,
    getPreviousLesson,
    isLessonUnlocked,
    categories,
};
