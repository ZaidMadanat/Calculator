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
        return NaN; 
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

// Interface work 
let num1 = null;
let num2 = null; 
let operand = null; 
let result = null; 
let current = null;

function updateDisplay(value) { 
    displayBox.textContent = value.toString();
} 

function clearDisplay() { 
    displayBox.textContent = ""
}

function buttonClick(value) { 
    if (!isNaN(value) || (value === '.' && !current.includes('.'))) { 
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
                clearDisplay(); 
            case 'x^y': 
                operand = 'exponent';
                result = calculate(operand);
                clearDisplay();
            case 'x!': 
                operand = 'factorial';
                result = calculate(operand)
                clearDisplay();
            case '/': 
                operand = 'divide'; 
                result = calculate(operand);
                clearDisplay(result);
            case '*': 
                operand = 'multiply'; 
                result = calculate(operand);
                clearDisplay(result);
            case '+': 
                operand = 'plus';
                result = calculate(operand); 
                clearDisplay(result);
            case '-': 
                operand = 'minus'; 
                result = calculate(operand);
                clearDisplay(result);
            case '+/-':
                operand = 'flip';
                result = calculate(operand);
                clearDisplay(result);
            case '=': 
                updateDisplay(result);
                num1 = result; 
                num2 = null; 
                operand = null; 
                result = null;  
        }
    }
}

function calculate(operand) { 
    if (num1 === null) { 
        num1 = current; 
    }
    else if (num2 === null) { 
        num2 = current; 
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
        case 'flip': 
            if (num1 === null) { 
                return num1 *= -1;
            }
            else { 
                return num2 *= -1;
            }
    }
}

const backspaceButton = document.querySelector('.backspace');
backspaceButton.addEventListener('click', function() {
    if (num1 != null) { 
        num1 = num1.slice(0, -1) || '0';
        updateDisplay(num1);
    }
    else { 
        num2 = num2.slice(0, -1) || '0';
        updateDisplay(num2);
    }
});

createButtons();
