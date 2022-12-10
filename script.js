class Calculator{
    constructor(){
        this.firstOperand = '';
        this.secondOperand = '';
        this.operation = undefined;
    }

    addNumber(number){
        if (number === '.' && this.firstOperand.includes('.')) return
        this.firstOperand = this.firstOperand.toString() + number.toString();
    }
    operate(){
        let result;
        const first = parseFloat(this.firstOperand);
        const second = parseFloat(this.secondOperand);
        if(isNaN(first) || isNaN(second)) return
        switch(this.operation){
            case '+':
                result = second + first;
                break;
            case '-':
                result = second - first;
                break;
            case 'x':
                result = second * first;
                break;
            case '÷':
                result = second / first;
                break;
            default: return; 
        }
        this.firstOperand = result;
        this.operation = undefined;
        this.secondOperand = '';
    }

    addOperation(operation){
        if(this.firstOperand === '') return;
        this.operation = operation;
        this.secondOperand = this.firstOperand;
        this.firstOperand = '';
    }

    clear(){
        this.firstOperand = '';
        this.secondOperand = '';
        this.operation = undefined;
        previousOperand.innerHTML = '';
        currentOperand.innerHTML = '';
        currentOperand.style.fontSize = "2.5rem";
        previousOperand.style.fontSize = "1.5rem"
    }

    delete(){
        this.firstOperand = this.firstOperand.toString().slice(0,-1);
    }

    updateFontSize(){
        if(this.firstOperand.length > 15){
            currentOperand.style.fontSize = "1.5rem";
        }else if(this.secondOperand.length > 20){
            previousOperand.style.fontSize = "1rem"
        }
    }

    updateDisplay(){
        this.updateFontSize();
        currentOperand.innerHTML = this.firstOperand;
        if(this.operation !== undefined){
            previousOperand.innerHTML = `${this.secondOperand} ${this.operation} ${this.firstOperand}`;
            currentOperand.innerHTML = '';
        }
    }
}

const numbers = document.querySelectorAll('.number-btn');
const operands = document.querySelectorAll('.operands-btn');
const previousOperand = document.querySelector('.previous');
const currentOperand = document.querySelector('.current');
const AcBtn = document.querySelector('.AC-btn');
const equalBtn = document.querySelector('.equal-btn');
const delBtn = document.querySelector('.del-btn');

const calculator = new Calculator();

numbers.forEach(button => {
    button.addEventListener('click',() => {
        calculator.addNumber(button.innerHTML);
        calculator.updateDisplay();
    })
})

operands.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addOperation(button.innerHTML);
        calculator.updateDisplay();
    })
})

equalBtn.addEventListener('click', () => {
    calculator.operate();
    calculator.updateDisplay();
})

AcBtn.addEventListener('click', () => {
    calculator.clear();
})

delBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})