const removeFromArray = function(originArray, ...itemsToRemove) {
    let modifiedArray = originArray;
    itemsToRemove.forEach(item => {
        let itemIndex = modifiedArray.indexOf(item);
        if (itemIndex !== -1) {
            modifiedArray.splice(itemIndex, 1);
        }
    });
    return modifiedArray;
};

// Do not edit below this line
module.exports = removeFromArray;
