function compareStrings(str1, str2) {
    const cleanedStr1 = str1.replace(/\s+/g, '').trim();
    const cleanedStr2 = str2.replace(/\s+/g, '').trim();

    return cleanedStr1 === cleanedStr2;
}

module.exports = compareStrings;
