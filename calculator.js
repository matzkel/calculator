;(() => {
    "use strict";

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
})();
