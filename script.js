/* var operant1;
var operant2 = 0;
var operator = "";
var value;
var currentOperand = "0";

var previousOperand1 = 0;
var previousOperand2 = 0;
var previousOperation = null;

var states = {
  start: 0,
  operant1: 1,
  operator: 2,
  operant2: 3,
  complete: 4,
};
var state = states.start;

function setTheme() {
  const themeInput = document.querySelector("#theme-slider");
  const theme = themeInput.value;
  console.log(theme);

  if (theme === "2") {
    document.body.setAttribute("data-theme", "theme-2");
  } else if (theme === "3") {
    document.body.setAttribute("data-theme", "theme-3");
  } else {
    document.body.removeAttribute("data-theme");
  }
}

function getValue() {
  return value;
}

function setValue() {
  var displayValue = value;
  document.querySelector(".result").innerHTML = displayValue;
}

function updateDisplay() {
  let displayStr;
  if (state === states.start || state === states.complete) {
    displayStr = currentOperand;
  } else if (state === states.operant1) {
    displayStr = currentOperand;
  } else if (state === states.operator) {
    displayStr = `${operant1} ${operator}`;
  } else if (state === states.operant2) {
    displayStr = `${operant1} ${operator} ${currentOperand}`;
  }
  document.querySelector(".result").innerHTML = displayStr;
}

function clearPressed() {
  operant1 = 0;
  operant2 = 0;
  operator = "";
  value = 0;
  state = states.start;
  setValue(value);
}

function delPressed() {
  if (state === states.start || state === states.complete) {
    clearPressed();
  } else if (state === states.operant1 || state === states.operant2) {
    currentOperand = currentOperand.slice(0, -1);
    if (currentOperand === "" || currentOperand === "-") {
      currentOperand = "0";
      state = states.start;
    }
    updateDisplay();
  } else if (state === states.operator) {
    operator = "";
    state = states.operant1;
    currentOperand = operant1.toString();
    updateDisplay();
  }
}

function numberPressed(num) {
  if (state === states.start || state === states.complete) {
    currentOperand = num;
    state = num === "0" ? states.start : states.operant1;
  } else if (state === states.operator) {
    currentOperand = num;
    state = states.operant2;
  } else if (state === states.operant1 || state === states.operant2) {
    if (currentOperand.replace(/[-.]/g, "").length < 8) {
      currentOperand += num;
      if (currentOperand.startsWith("0") && !currentOperand.includes(".")) {
        currentOperand = currentOperand.substring(1);
      }
    }
  }

  updateDisplay();
}

function numberPressed(num) {
  if (state === states.start || state === states.complete) {
    currentOperand = num; // num is a string (from event.key)
    state = num === "0" ? states.start : states.operant1;
  } else if (state === states.operator) {
    currentOperand = num; // Reset for operant2
    state = states.operant2;
  } else if (state === states.operant1 || state === states.operant2) {
    // Add this check to ensure we're working with a string
    if (typeof currentOperand !== "string") {
      currentOperand = currentOperand.toString();
    }
    
    // Fix: Check length using string operations
    if (currentOperand.replace(/[-.]/g, "").length < 8) {
      currentOperand += num;
      // Remove leading zeros
      if (currentOperand.startsWith("0") && !currentOperand.includes(".")) {
        currentOperand = currentOperand.slice(1);
      }
    }
  }

  updateDisplay();
}

function operationPressed(op) {
  if (state === states.operant1) {
    operant1 = parseFloat(currentOperand);
    operator = op;
    state = states.operator;
  } else if (state === states.operant2) {
    operant2 = parseFloat(currentOperand);
    operator = op;
    operant1 = calculateResult();
    currentOperand = operant1.toString();
    state = states.operator;
  } else if (state === states.operator) {
    operator = op;
  } else if (state === states.complete) {
    operant1 = parseFloat(currentOperand);
    operator = op;
    state = states.operator;
  }

  updateDisplay();
}

function calculateResult() {
  let result;
  const a = operant1;
  const b = parseFloat(currentOperand);
  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a / b;
      break;
    default:
      return a;
  }
  return result;
}

function equalPressed() {
  if (state === states.operant2) {
    const result = calculateResult();
    currentOperand = result.toString();
    state = states.complete;
    updateDisplay();
  }
}

document.addEventListener("keypress", (event) => {
  if (event.key.match(/^\d+$/)) {
    numberPressed(event.key);
  } else if (event.key == ".") {
    decimalPressed();
  } else if (event.key.match(/^[-*+/]$/)) {
    operationPressed(event.key);
  } else if (event.key == "=" || event.key == "Enter") {
    equalPressed();
  }
});

updateDisplay(); */

// Variables to store operands, operator, and current state
let operant1 = null;
let operant2 = null;
let operator = null;
let currentOperand = "0"; // Holds the current operand being entered as a string

// Calculator states
const states = {
  start: 0,
  operant1: 1,
  operator: 2,
  operant2: 3,
  complete: 4,
};
let state = states.start;

// Theme switching logic
function setTheme() {
  const themeInput = document.querySelector("#theme-slider");
  const theme = themeInput.value;
  document.body.setAttribute("data-theme", `theme-${theme}`);
}

// Update the display with the current value
function updateDisplay() {
  const displayElement = document.querySelector(".result");
  let displayStr;

  if (state === states.start || state === states.complete) {
    displayStr = currentOperand;
  } else if (state === states.operant1) {
    displayStr = currentOperand;
  } else if (state === states.operator) {
    displayStr = `${operant1} ${operator}`;
  } else if (state === states.operant2) {
    displayStr = `${operant1} ${operator} ${currentOperand}`;
  }

  displayElement.textContent = displayStr;
}

// Clear the calculator
function clearPressed() {
  operant1 = null;
  operant2 = null;
  operator = null;
  currentOperand = "0";
  state = states.start;
  updateDisplay();
}

// Delete the last digit
function delPressed() {
  if (state === states.start || state === states.complete) {
    clearPressed();
  } else if (state === states.operant1 || state === states.operant2) {
    currentOperand = currentOperand.slice(0, -1); // Remove the last character
    if (currentOperand === "" || currentOperand === "-") {
      currentOperand = "0";
      state = states.start;
    }
    updateDisplay();
  } else if (state === states.operator) {
    operator = null;
    state = states.operant1;
    currentOperand = operant1.toString();
    updateDisplay();
  }
}

// Handle number button presses
function numberPressed(num) {
  if (state === states.start || state === states.complete) {
    currentOperand = num.toString(); // Start fresh with a new number
    state = num === "0" ? states.start : states.operant1;
  } else if (state === states.operator) {
    currentOperand = num.toString(); // Start entering the second operand
    state = states.operant2;
  } else if (state === states.operant1 || state === states.operant2) {
    if (currentOperand.replace(/[-.]/g, "").length < 8) {
      // Limit to 8 digits
      currentOperand += num;
      if (currentOperand.startsWith("0") && !currentOperand.includes(".")) {
        currentOperand = currentOperand.slice(1); // Remove leading zeros
      }
    }
  }

  updateDisplay();
}

// Handle decimal button press
function decimalPressed() {
  if (!currentOperand.includes(".")) {
    currentOperand += ".";
    updateDisplay();
  }
}

// Handle operation button presses
function operationPressed(op) {
  if (state === states.operant1) {
    operant1 = parseFloat(currentOperand);
    operator = op;
    state = states.operator;
  } else if (state === states.operant2) {
    operant2 = parseFloat(currentOperand);
    const result = calculateResult();
    operant1 = result;
    operator = op;
    currentOperand = "0";
    state = states.operator;
  } else if (state === states.operator) {
    operator = op; // Update the operator
  } else if (state === states.complete) {
    operant1 = parseFloat(currentOperand);
    operator = op;
    state = states.operator;
  }

  updateDisplay();
}

// Calculate the result
function calculateResult() {
  const a = operant1;
  const b = parseFloat(currentOperand);
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return b;
  }
}

// Handle equals button press
function equalPressed() {
  if (state === states.operant2) {
    operant2 = parseFloat(currentOperand);
    const result = calculateResult();
    currentOperand = result.toString();
    state = states.complete;
    updateDisplay();
  }
}

// Initialize the calculator display
updateDisplay();

// Keyboard support
document.addEventListener("keydown", (event) => {
  if (event.key.match(/^\d+$/)) {
    numberPressed(event.key);
  } else if (event.key === ".") {
    decimalPressed();
  } else if (event.key.match(/^[-+*/]$/)) {
    operationPressed(event.key);
  } else if (event.key === "Enter" || event.key === "=") {
    equalPressed();
  } else if (event.key === "Backspace") {
    delPressed();
  } else if (event.key === "Escape") {
    clearPressed();
  }
});
