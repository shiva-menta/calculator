let lowerDisplayContent = '';
let upperDisplayContent = '';
let firstNum = null;
let secondNum = null;
let operand = null;
let isDecimalFirstNum = false;
let isDecimalSecondNum = false;
const lowerCalcDisplay = document.querySelector('.lower-display');
const upperCalcDisplay = document.querySelector('.upper-display');

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    let cleanedNum1 = parseInt(num1);
    let cleanedNum2 = parseInt(num2);
    let output;
    if (operator === '+') {
        output = add(cleanedNum1, cleanedNum2);
    } else if (operator === '-') {
        output = subtract(cleanedNum1, cleanedNum2);
    } else if (operator === '*') {
        output = multiply(cleanedNum1, cleanedNum2);
    } else {
        if (cleanedNum2 === 0) {
            return 'undefined';
        }
        output = divide(cleanedNum1, cleanedNum2);
    }
    return parseFloat(output.toFixed(4));
}

function isOperand(char) {
    return (char === '+' || char === '-' || char === '*' || char === '/')
}

const allNumberButtons = document.querySelectorAll('.number');
allNumberButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        lowerDisplayContent += btn.textContent;
        lowerCalcDisplay.textContent = lowerDisplayContent;
    });
});

const allOperandButtons = document.querySelectorAll('.operand');
allOperandButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (!operand) {
            firstNum = lowerDisplayContent;
            operand = btn.textContent;

            upperDisplayContent= lowerDisplayContent += btn.textContent;
            lowerDisplayContent = '';

            upperCalcDisplay.textContent = upperDisplayContent;
            lowerCalcDisplay.textContent = lowerDisplayContent;
        } 
    });
});

const equalsButton = document.querySelector('.equals');
equalsButton.addEventListener('click', () => {
    if (firstNum) {
        secondNum = lowerDisplayContent;
    }
    if (firstNum && secondNum && operand) {
        upperDisplayContent = upperDisplayContent + lowerDisplayContent + ' =';
        lowerDisplayContent = operate(operand, firstNum, secondNum);

        upperCalcDisplay.textContent = upperDisplayContent;
        lowerCalcDisplay.textContent = lowerDisplayContent;
        
        firstNum = null;
        secondNum = null;
        operand = null;
    } else if (!firstNum && !secondNum && !operand) {
        firstNum = lowerDisplayContent;
        upperDisplayContent = upperDisplayContent + lowerDisplayContent + ' =';
        lowerDisplayContent = firstNum;

        upperCalcDisplay.textContent = upperDisplayContent;
        lowerCalcDisplay.textContent = lowerDisplayContent;
        
        firstNum = null;
        secondNum = null;
        operand = null;
    }
})

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    firstNum = null;
    secondNum = null;
    operand = null;
    lowerDisplayContent = '';
    upperDisplayContent = '';
    upperCalcDisplay.textContent = upperDisplayContent;
    lowerCalcDisplay.textContent = lowerDisplayContent;
})

const deleteButton = document.querySelector('.delete');
deleteButton.addEventListener('click', () => {
    lowerDisplayContent = lowerDisplayContent.split('');
    if (isOperand(lowerDisplayContent.pop())) {
        operand=null;
    }
    lowerDisplayContent = lowerDisplayContent.join('');
    lowerCalcDisplay.textContent = lowerDisplayContent;
})

const decimalButton = document.querySelector('.decimal');
decimalButton.addEventListener('click', () => {
    if (!isDecimalFirstNum && !firstNum) {
        lowerDisplayContent += decimalButton.textContent;
        lowerCalcDisplay.textContent = lowerDisplayContent;
        isDecimalFirstNum = true;
    } else if (!isDecimalSecondNum && !secondNum && firstNum) {
        lowerDisplayContent += decimalButton.textContent;
        lowerCalcDisplay.textContent = lowerDisplayContent;
        isDecimalSecondNum = true;
    }
})