const screen = document.querySelector(".screen");

let operands = {};

let tempValue = "";
let operator = "";
let firstOperand = "";
let secondOperand = "";
let activeOperand = "first";

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "ERROR";
  return a / b;
}

function operate(firstNumber, secondNumber, operator) {
  firstNumber = Number(firstNumber);
  secondNumber = Number(secondNumber);

  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "*":
      return multiply(firstNumber, secondNumber);
    case "/":
      return divide(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
  }
}

function toggleActiveOperand() {
  activeOperand = activeOperand === "first" ? "second" : "first";
}

// populate screen
function populateScreen(text) {
  screen.textContent = text;
}

// reset
function reset() {
  operands = {};
  tempValue = "";
  operator = "";
  firstOperand = "";
  secondOperand = "";
  activeOperand = "first";
  populateScreen(0);
}

const buttons = document.querySelector(".buttons");

buttons.addEventListener("click", (e) => {
  const targetClassName = e.target.className;
  const targetValue = e.target.textContent;
  const targetID = e.target.id;

  // get first operand-- Done
  if (targetClassName.includes("num")) {
    tempValue += targetValue;
    // operands[activeOperand] = targetValue;
    populateScreen(Number(tempValue));
  }

  if (targetClassName.includes("operator")) {
    const newOperator = targetValue;

    // do this if operator is not "="
    if (newOperator !== "=") {
      // set operator and firstOperand
      operator = newOperator;
      operands[activeOperand] = tempValue;

      // switch activeOperand
      toggleActiveOperand();

      // reset tempValue
      tempValue = "";
    } else {
      operands[activeOperand] = tempValue;

      const firstOperand = operands["first"];
      const secondOperand = operands["second"];
      // operator is "=", so do the following:
      // get result
      result = operate(operands["first"], operands["second"], operator);
      populateScreen(result);
    }
  }

  if (targetClassName.includes("special")) {
    console.log(targetValue);
    if (targetID === "ac") {
      reset();
    } else if (targetID === "percent") {
      result = screen.textContent / 100;
      populateScreen(result);
    } else {
      const num = Number(screen.textContent);
      result = -1 * num;
      populateScreen(result);
    }
  }
});
