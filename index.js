const calculator = document.querySelector(".calculator")
const keys = calculator.querySelector(".keys")
const display = calculator.querySelector(".display")


// burada return keywordu kullanmanin onemi ne?
keys.addEventListener('click', event => {
    if(!event.target.closest('button')) return
        const key = event.target
        const keyValue = key.textContent
        const displayValue = display.textContent
//burada bi onceki basilan tusun hangi tus oldugunu anlamak icin dataset kullanmak istedi neden?
        const type = key.dataset.type
        const previousKeyType = calculator.dataset.previousKeyType

        if(type === 'number'){
            if(displayValue === '0') {
                display.textContent = keyValue
            } else if(previousKeyType === 'operator') {
                display.textContent = keyValue
            }else{
                display.textContent = displayValue + keyValue
            }
            calculator.dataset.previousKeyType = 'number'
        }

        if(type === 'operator'){

            const operatorKeys = keys.querySelectorAll('[data-type= "operator"]');
            operatorKeys.forEach(e => {e.dataset.state = ''})
            key.dataset.state = "selected"
            
            calculator.dataset.previousKeyType = 'operator'

            calculator.dataset.firstNumber = displayValue
            calculator.dataset.operator = key.dataset.key
        }
        if(keyValue == "C"){
            display.textContent = 0
        }
        if(type === 'equal'){
            //do the calculation
            //firstNumber  - operator - secondNumber
            const firstNumber = calculator.dataset.firstNumber
            const operator = calculator.dataset.operator
            const secondNumber = displayValue

            
            display.textContent = calculate(firstNumber, operator, secondNumber)
            
        }
        
        console.log(keyValue)
})

function calculate(firstNumber, operator, secondNumber) {
    firstNumber = parseInt(firstNumber)
    secondNumber = parseInt(secondNumber)
    
    if(operator === "plus") return firstNumber + secondNumber
    if(operator === "minus") return firstNumber - secondNumber
    if(operator === "times") return firstNumber * secondNumber
    if(operator === "divide") return firstNumber / secondNumber
    
}