var display = document.getElementById('display');
var currentNumber = '0';
var currentOperator = null;
var previousNumber = null;

function updateDisplay() {
  display.textContent = currentNumber;
}

function appendNumber(number) {
  if (currentNumber === '0') {
    currentNumber = number.toString();
  } else {
    currentNumber += number.toString();
  }
  updateDisplay();
}

function appendDecimal(decimal) {
  if (!currentNumber.includes(decimal)) {
    currentNumber += decimal;
    updateDisplay();
  }
}

function operation(operator) {
  if (currentOperator !== null) {
    calculate();
  }
  currentOperator = operator;
  previousNumber = currentNumber;
  currentNumber = '0';
}

function calculate() {
  var result;
  var previous = parseFloat(previousNumber);
  var current = parseFloat(currentNumber);

  if (isNaN(previous) || isNaN(current)) {
    return;
  }

  switch (currentOperator) {
    case '+':
      result = previous + current;
      break;
    case '-':
      result = previous - current;
      break;
    case '*':
      result = previous * current;
      break;
    case '/':
      result = previous / current;
      break;
    default:
      return;
  }

  currentNumber = roundNumber(result, 2).toString();
  currentOperator = null;
  previousNumber = null;
  updateDisplay();
}

function reset() {
  currentNumber = '0';
  currentOperator = null;
  previousNumber = null;
  updateDisplay();
}

function backspace() {
  if (currentNumber.length === 1) {
    currentNumber = '0';
  } else {
    currentNumber = currentNumber.slice(0, -1);
  }
  updateDisplay();
}

function percentage() {
  var value = parseFloat(currentNumber);
  if (!isNaN(value)) {
    currentNumber = roundNumber(value / 100, 2).toString();
    updateDisplay();
  }
}

function roundNumber(number, decimalPlaces) {
  var factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
}
