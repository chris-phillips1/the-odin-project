const palindromes = function (originalString) {
  let cleanOriginal = originalString.toLowerCase().replace(/[\s\W]/g, "");
  let reverseClean = cleanOriginal.split("").reverse().join("");

  return reverseClean === cleanOriginal;
};

// Do not edit below this line
module.exports = palindromes;
