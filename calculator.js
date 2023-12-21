;(() => {
    "use strict";

    const expression = {
        leftOperand: "0",
        rightOperand: null,
        operator: null,
        operatorElement: null,
    };

    const methods = {
        '+': ((a, b) => a + b),
        '-': ((a, b) => a - b),
        '*': ((a, b) => a * b),
        '/': ((a, b) => a / b),
    };

    function calculateExpression(expression) {
        const calculatedNumber = methods[expression.operator](+expression.leftOperand, +expression.rightOperand);
        if (isFinite(calculatedNumber)) return calculatedNumber.toString();
        return null;
    }

    function updateExpression(expression, number, operator = null, operatorElement = null) {
        expression.leftOperand = number;
        expression.rightOperand = null;
        expression.operator = operator;

        expression.operatorElement.classList.remove("current-operator");
        if (operatorElement) {
            expression.operatorElement = operatorElement;
            expression.operatorElement.classList.add("current-operator");
        }
        else {
            expression.operatorElement = null;
        }
    }

    function clearExpression(expression) {
        expression.leftOperand = "0";
        expression.rightOperand = null;
        expression.operator = null;

        if (expression.operatorElement) {
            expression.operatorElement.classList.remove("current-operator");
        }
        expression.operatorElement = null;
    }

    /* Event handlers */

    const display = document.querySelector(".display");
    const btnContainer = document.querySelector(".btn-container");
    btnContainer.addEventListener("click", event => {
        const target = event.target;
        if (target.tagName !== "BUTTON") return;

        const MAX_LENGTH = 8;
        switch (target.className) {
            case "clear":
                clearExpression(expression);
                break;

            case "backspace":
                if (expression.rightOperand === null) {
                    if (expression.leftOperand.length === 1 ||
                        (expression.leftOperand.length === 2 && expression.leftOperand[0] === '-')) {
                        expression.leftOperand = "0";
                        break;
                    }
                    expression.leftOperand = expression.leftOperand.slice(0, -1);
                    break;
                }

                if (expression.rightOperand.length === 1 ||
                    (expression.rightOperand.length === 2 && expression.rightOperand[0] === '-')) {
                    expression.rightOperand = "0";
                    break;
                }
                expression.rightOperand = expression.rightOperand.slice(0, -1);
                break;

            case "sign":
                if (expression.leftOperand === "0") break;
                if (expression.rightOperand === null) {
                    if (expression.leftOperand[0] === "-") {
                        expression.leftOperand = expression.leftOperand.slice(1);
                        break;
                    }
                    expression.leftOperand = `-${expression.leftOperand}`;
                    break;
                }

                if (expression.rightOperand === "0") break;
                if (expression.rightOperand[0] === "-") {
                    expression.rightOperand = expression.rightOperand.slice(1);
                    break;
                }
                expression.rightOperand = `-${expression.rightOperand}`;
                break;

            case "percent":
                if (expression.rightOperand === null) {
                    if (expression.leftOperand === "0") break;
                    const dividedOperand = (+expression.leftOperand / 100).toString();
                    expression.leftOperand = dividedOperand;
                    break;
                }

                if (expression.rightOperand === "0") break;
                const dividedOperand = (+expression.rightOperand / 100).toString();
                expression.rightOperand = dividedOperand;
                break;

            case "operator":
                if (expression.operator === null ||
                    expression.rightOperand === null) {
                    if (expression.operatorElement) {
                        expression.operatorElement.classList.remove("current-operator");
                    }
                    expression.operatorElement = target;
                    expression.operatorElement.classList.add("current-operator");
                    expression.operator = target.textContent;
                    break;
                }
                const temporary = calculateExpression(expression);
                if (temporary === null) {
                    alert("Can't divide by 0");
                    clearExpression(expression);
                    break;
                }
                updateExpression(expression, temporary, target.textContent, target);
                break;

            case "dot":
                if (expression.operator === null) {
                    if (expression.leftOperand.includes(".")) break;
                    expression.leftOperand += target.textContent;
                    break;
                }
                if (expression.rightOperand.includes(".")) break;
                expression.rightOperand += target.textContent;
                break;

            case "equals":
                if (expression.rightOperand === null) break;
                const temporaryTwo = calculateExpression(expression);
                if (temporaryTwo === null) {
                    alert("Can't divide by 0");
                    clearExpression(expression);
                    break;
                }
                updateExpression(expression, temporaryTwo);
                break;

            default:
                if (expression.operator === null) {
                    if (expression.leftOperand === "0") {
                        expression.leftOperand = target.textContent;
                        break;
                    }
                    if (expression.leftOperand.length >= MAX_LENGTH) break;
                    expression.leftOperand += target.textContent;
                    break;
                }

                if (expression.rightOperand === "0" ||
                    expression.rightOperand === null) {
                    expression.rightOperand = target.textContent;
                    break;
                }
                if (expression.rightOperand.length >= MAX_LENGTH) break;
                expression.rightOperand += target.textContent;
                break;
        }

        if (expression.rightOperand === null) {
            if (expression.leftOperand.length > MAX_LENGTH + 1) {
                return display.textContent = (+expression.leftOperand).toExponential(2);
            }
            return display.textContent = expression.leftOperand;
        }

        if (expression.rightOperand.length > MAX_LENGTH + 1) {
            return display.textContent = (+expression.rightOperand).toExponential(2);
        }
        display.textContent = expression.rightOperand;
    });
})();
