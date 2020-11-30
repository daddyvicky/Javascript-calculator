class Calculator{
    constructor(previousOperand,currentOperand){
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand;
        this.clear();
    }
    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !==''){
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute(){
        let compute
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                compute = prev + current
                break
            case '-':
                compute = prev - current
                break
            case '*':
                compute = prev * current
                break
            case '÷':
                compute = prev / current
                break
            default:
                return            
        }
        this.currentOperand = compute
        this.operation = undefined
        this.previousOperand = ''
    }
    getcom(number){
        const stringNumb = number.toString()
        const intnum = parseFloat(stringNumb.split('.')[0])
        const decnum = stringNumb.split('.')[1]
        let intdiplay
        if(isNaN(intnum)){
            intdiplay = ''
        }else{
            intdiplay = intnum.toLocaleString('em',{
                maximumFractionDigits : 0
            })
        }
        if(decnum != null){
            return `${intdiplay}.${decnum}`
        }else{
            return intdiplay
        }
    }
    updateDisplay(){
        currentOperand.innerText = this.getcom(this.currentOperand);
        if(this.operation != null){
            previousOperand.innerText = `${this.previousOperand} ${this.operation}`;
        }else{
            previousOperand.innerText = this.previousOperand;
        }
    }
}
const numberButtons = document.querySelectorAll("[d-n]");
const operationButtons = document.querySelectorAll('[d-o]');
const equalsButton = document.querySelector('[d-e]');
const deleteButton = document.querySelector('[d-d]');
const allClearButton = document.querySelector('[d-a]');
const previousOperand = document.querySelector('[d-p]');
const currentOperand = document.querySelector('[d-c]');

const calc = new Calculator(previousOperand,currentOperand);

numberButtons.forEach(btn =>{
    btn.addEventListener("click" , () =>{
        calc.appendNumber(btn.innerText)
        calc.updateDisplay()
    })
})
operationButtons.forEach(btn =>{
    btn.addEventListener("click" , () =>{
        calc.chooseOperation(btn.innerText)
        calc.updateDisplay()
    })
})

equalsButton.addEventListener("click",button=>{
    calc.compute()
    calc.updateDisplay()
})

allClearButton.addEventListener("click",button=>{
    calc.clear()
    calc.updateDisplay()
})
deleteButton.addEventListener("click",button=>{
    calc.delete()
    calc.updateDisplay()
})