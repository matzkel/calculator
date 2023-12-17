;(() => {
    "use strict";

    let expression = "";
    let operatorExists = false;

    const methods = {
        '+': ((a, b) => a + b),
        '-': ((a, b) => a - b),
        '*': ((a, b) => a * b),
        '/': ((a, b) => a / b),
    };

    function calculate(string) {
        const expression = string.split(" "),
            leftOperand = expression[0],
            operator = expression[1],
            rightOperand = expression[2];

        if ((!methods[operator] || isNaN(+leftOperand) || isNaN(+rightOperand)) ||
            (leftOperand === "" || rightOperand === "")) {
            return null;
        }
        return methods[operator](+leftOperand, +rightOperand);
    }

    function changeOperator(string, desiredOperator) {
        const expression = string.split(" "),
            leftOperand = expression[0];
        return `${leftOperand} ${desiredOperator} `;
    }

    /* Event handlers */

    const display = document.querySelector(".display");

    const btnContainer = document.querySelector(".btn-container");
    btnContainer.addEventListener("click", (event) => {
        const target = event.target;
        if (target.tagName !== "BUTTON") return;

        if (display.textContent === "Can't divide by 0") display.textContent = "";

        switch (target.className) {
            case "clear":
                display.textContent = "";
                expression = display.textContent;
                break;
            case "operator":
                if (!expression) return;

                if (!operatorExists) {
                    display.textContent += ` ${target.textContent} `;
                    expression = display.textContent;
                    return operatorExists = true;
                }

                const calculatedExpression = calculate(expression);
                if (calculatedExpression === null) {
                    display.textContent = changeOperator(expression, target.textContent);
                    return expression = display.textContent;
                }

                if (!isFinite(calculatedExpression)) {
                    display.textContent = "Can't divide by 0";
                    expression = "";
                    return operatorExists = false;
                }

                display.textContent = `${calculatedExpression} ${target.textContent} `;
                expression = display.textContent;
                break;
            case "equals":
                const calculated = calculate(expression);
                if (calculated === null) return;

                if (!isFinite(calculated)) {
                    display.textContent = "Can't divide by 0";
                    expression = "";
                    return operatorExists = false;
                }

                display.textContent = calculated;
                expression = display.textContent;
                operatorExists = false;
                break;
            default:
                display.textContent += target.textContent;
                expression = display.textContent;
                break;
        }
    });

})();
