const sumAll = function(first, second) {
    if (checkParameters(first, second)) {
        let sum = 0;
        let minValue = Math.min(first, second);
        let maxValue = Math.max(first, second);
        for (let i = minValue; i < maxValue + 1; i++) {
            sum += i;
        }
        
        return sum;
    } else {
        return 'ERROR';
    }
};

function checkParameters(first, second) {
    return typeof(first) === 'number' && typeof(second) === 'number' && first >= 0 && second >= 0;
}

// Do not edit below this line
module.exports = sumAll;
