function round(num) {
    return Math.round(num * 10000) / 10000;
}

function add(num1, num2) {
    return round(num1 + num2);
}

function subtract(num1, num2) {
    return round(num1 - num2);
}

function multiply(num1, num2) {
    return round(num1 * num2);
}

function divide(num1, num2) {
    return num2 === 0 ? 'No division by zero allowed' : round(num1 / num2);
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return `${operator} is not a valid operator`;
    }
}

function updateDisplay(displayDiv, itemToAdd) {
    if (displayDiv.textContent === '0') {
        displayDiv.textContent = itemToAdd;
    } else {
        displayDiv.textContent += itemToAdd;
    }
    currentDisplayValue = displayDiv.textContent;
    return displayDiv;
}

function clearDisplay(displayDiv) {
    displayDiv.textContent = '0';
    currentDisplayValue = '';
}

function saveFirstValues(operator) {
    firstDisplayValue = currentDisplayValue;
    operatorValue = operator;
}

function resetFirstValues() {
    firstDisplayValue = null;
    operatorValue = null;
}

function convertStringsToNumber(arr) {
    return arr.map((item) => Number(item));
}

function performOperation() {
    [firstDisplayValue, currentDisplayValue] = convertStringsToNumber([firstDisplayValue, currentDisplayValue]);

    if (firstDisplayValue && currentDisplayValue) {
        let result = operate(operatorValue, firstDisplayValue, currentDisplayValue);
        clearDisplay(calculatorDisplay);
        updateDisplay(calculatorDisplay, result);
        resetFirstValues();
    }
}


/* Global variables */
const calculatorDisplay = document.querySelector('.calculator > .display');
let currentDisplayValue = calculatorDisplay.textContent;
let firstDisplayValue = null;
let operatorValue = null;
let resetOperator = true;


/* Button event handlers */
const numberButtons = document.querySelectorAll('.calculator > .number');
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (operatorValue && resetOperator) {
            clearDisplay(calculatorDisplay);
            resetOperator = false;
        }

        updateDisplay(calculatorDisplay, button.textContent);
    });
});

const operatorButtons = document.querySelectorAll('.calculator > .operator');
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (operatorValue) {
            performOperation();
        }

        resetOperator = true;
        saveFirstValues(button.textContent);
    });
});

const equalsButton = document.querySelector('.calculator > .equals');
equalsButton.addEventListener('click', () => {
    performOperation();
});

const clearButton = document.querySelector('.calculator > .clear');
clearButton.addEventListener('click', () => {
    clearDisplay(calculatorDisplay);
    resetFirstValues();
});