;(() => {
    "use strict";

    let expression = "";

    const methods = {
        '+': ((a, b) => a + b),
        '-': ((a, b) => a - b),
        '*': ((a, b) => a * b),
        '/': ((a, b) => a / b),
    };

    function calculate(string) {
        const expression = string.split(" "),
            leftOperand = +expression[0],
            operator = expression[1],
            rightOperand = +expression[2];

        if (!methods[operator] || isNaN(leftOperand) || isNaN(rightOperand)) {
            return null;
        }
        return methods[operator](leftOperand, rightOperand);
    }

    /* Event handlers */

    const display = document.querySelector(".display");

    const btnContainer = document.querySelector(".btn-container");
    btnContainer.addEventListener("click", (event) => {
        const target = event.target;
        if (target.tagName !== "BUTTON") return;

        switch (target.className) {
            case "clear":
                display.textContent = "";
                expression = display.textContent;
                break;
            default:
                display.textContent += target.textContent;
                expression = display.textContent;
                break;
        }
    });

})();
