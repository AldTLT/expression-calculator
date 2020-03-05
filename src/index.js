function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let reg = /\d+|\D/g;
    expr = expr.replace(/\s/g, '').match(reg);

    if (expr.filter(x => x == '(').length != expr.filter(x => x == ')').length) {
        throw Error("ExpressionError: Brackets must be paired");
    }

    return getSubExpr(expr);
}

function getSubExpr(expr) {

    if (expr.length == 1) {
        return expr.pop();
    }

    let openedBracket = 0;
    let closedBracket = expr.length;

    for (let i = 0; i < expr.length; i++) {
        openedBracket = expr[i] == '(' ?
            i : openedBracket;

        if (expr[i] == ')') {
            closedBracket = i;
            break;
        };
    };

    let subExpr = expr.slice(openedBracket, closedBracket + 1);
    let length = subExpr.length;
    let subResult = calculateBracket(subExpr);
    expr.splice(openedBracket, length, subResult);

    return getSubExpr(expr);
}

function calculateBracket(expr) {
    let result;
    expr = expr.filter(x => x != '(' && x != ')');

    while (expr.length > 1) {
        let index = expr.findIndex(x => x == '*' || x == '/');

        index = index == -1 ? 1 : index;

        result = toOperation(expr[index - 1], expr[index + 1], expr[index]);
        expr.splice(index - 1, 3, result);
    }

    return expr.pop();
}

function toOperation(value1, value2, operator) {
    value1 = parseFloat(value1);
    value2 = parseFloat(value2);

    switch (operator) {
        case '+':
            {
                return value1 + value2;
            }
        case '-':
            {
                return value1 - value2;
            }
        case '/':
            {
                if (value2 === 0) {
                    throw Error("TypeError: Division by zero.")
                }
                return value1 / value2;
            }
        case '*':
            {
                return value1 * value2;
            }
        default:
            {
                return NaN;
            }
    }
}

module.exports = {
    expressionCalculator
}