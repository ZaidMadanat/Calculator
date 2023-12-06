function add(a, b) { 
    return a + b; 
}
function subtract(a, b) { 
    return a - b;
}
function multiply(a, b) { 
    return a * b
}
function divide(a, b) { 
    return a / b;
}
function exponent(a, b) { 
    return a**b;
}
function factorial(a) { 
    if (a < 0) { 
        return "Math Error"; 
    }
    if ( a === 0 ) { 
        return 1;
    }
    let total = 1;
    for (let i = 0; i < a; i++) { 
        total *= (a - i);
    }
    return total;
}
// functions needed to do the math 

const calculator = document.getElementById('calc'); 
const rows = document.querySelector('.rows');
const display = document.querySelector('.display');
const displayBox = document.querySelector('.box');

//Create the buttons by looping through the array and adding event listeners to each button 
// Each button will call buttonclick function which will update the display and do the math
function createButtons() { 
    const buttonValues = [ 
        ['AC', 'x^y', 'x!', '/'],
        ['7', '8', '9', '*'], 
        ['4', '5', '6', '+'],
        ['1', '2', '3', '-'], 
        ['0', '.', '+/-', '=']
    ];
    buttonValues.forEach(function (rowValues) {
        const buttonRow = document.createElement('div');
        buttonRow.classList.add('button-row');
        rowValues.forEach(function (value) {
            const button = document.createElement('button');
            button.textContent = value;
            button.classList.add('calc-button'); 
            
            button.addEventListener('click', () => {
                buttonClick(value);
            });

            buttonRow.appendChild(button);
        });

        rows.appendChild(buttonRow);
    });
}

// Variables needed
let num1 = null;
let num2 = null; 
let operand = null; 
let result = null; 
let current = "";

function updateDisplay(value) { 
    displayBox.textContent = value.toString();
} 

function clearDisplay() { 
    displayBox.textContent = ""
}

//buttonClick function either adds the number to the current string or does a switch statement 
//determining what operand it is, and what is the suitable way to deal with that operand.
function buttonClick(value) { 
    if (!isNaN(value) || (value === '.' && !current.includes('.'))) { 
        if (num1 !== null && num2 === null && operand === null) {
            num1 = null;
        }
        current += value;
        updateDisplay(current);
    } 
    else { 
        switch(value) { 
            case 'AC': 
                result = null;
                operand = null;
                num1 = null; 
                num2 = null; 
                current = "";
                clearDisplay(); 
                break;
            case 'x^y': 
                operand = 'exponent';
                setNum();
                clearDisplay();
                break;
            case 'x!': 
                operand = 'factorial';
                updateDisplay(calculate(operand));
                clearDisplay();
                break;
            case '/': 
                operand = 'divide'; 
                setNum();
                clearDisplay();
                break;
            case '*': 
                operand = 'multiply';
                setNum(); 
                clearDisplay();
                break;
            case '+': 
                operand = 'plus';
                setNum(); 
                clearDisplay();
                break;
            case '-': 
                operand = 'minus';
                setNum(); 
                clearDisplay();
                break;
            case '+/-':
                flip();
                updateDisplay(current);
                break;
            case '=': 
                setNum();
                result = calculate(operand)
                updateDisplay(result);
                num1 = result; 
                num2 = null; 
                operand = null; 
                result = null;  
                current = "";
                break;
        }
    }
}

//setNum function sets the numbers to the current string and resets the current string
function setNum() { 
    if (current !== "") {
        if (num1 === null) { 
            num1 = parseFloat(current);
            current = "";
        }
        else if (num2 === null) { 
            num2 = parseFloat(current);
            current = "";
        }
    }
}

//flip function flips the current number to a negative or positive number
function flip() { 
    if (current !== "") { 
        current = (parseFloat(current) * -1).toString();
}
}

//calculate function does the math required based on the operand
function calculate(operand) { 
    if (operand !== "flip" && operand !== "factorial") {
        current = ""; // reset current for the next input
    }
    switch(operand) { 
        case 'exponent': 
            return exponent(num1, num2);
        case 'factorial': 
            return factorial(num1);
        case 'divide': 
            return divide(num1, num2); 
        case 'multiply': 
            return multiply(num1, num2); 
        case 'plus': 
            return add(num1, num2);
        case 'minus': 
            return subtract(num1, num2);
    }
}

//backspace function to reduce the displayed number by one 
const backspaceButton = document.querySelector('.backspace');
backspaceButton.addEventListener('click', function() {
    if (current != null) { 
        current = current.slice(0, -1) || '0';
        updateDisplay(current);
    }
});

createButtons();
