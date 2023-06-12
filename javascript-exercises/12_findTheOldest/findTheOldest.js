const findTheOldest = function(arrayOfPeople) {
    return arrayOfPeople.sort((a, b) => {
        let aAge = a.yearOfDeath ? a.yearOfDeath - a.yearOfBirth : new Date().getFullYear() - a.yearOfBirth;
        let bAge = b.yearOfDeath ? b.yearOfDeath - b.yearOfBirth : new Date().getFullYear() - b.yearOfBirth;

        return aAge > bAge ? -1 : 1;
    })[0];
};

// Do not edit below this line
module.exports = findTheOldest;
