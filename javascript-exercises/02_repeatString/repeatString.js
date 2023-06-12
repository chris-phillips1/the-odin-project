const repeatString = function(string, occurences) {
    let returnString = '';
    for (let i = 0; i < occurences; i++) {
        returnString += string;
    }
    return occurences >= 0 ? returnString : 'ERROR';
};

// Do not edit below this line
module.exports = repeatString;
