var expression = ""; // Expression to be calculated
var display = document.querySelector('input#display');
function add_no(key) {
    expression += key;
    if (display) {
        display.value = expression;
    }
}
function clear_disp() {
    expression = "";
    if (display) {
        display.value = "0";
    }
}
function calculate() {
    if (expression === "") {
        alert("Please enter a valid expression.");
        return;
    }
    var result = calc_expr(expression);
    if (display) {
        display.value = result.toString();
    }
    expression = result.toString();
}
function calc_expr(expr) {
    var optr = ["+", "-", "*", "/", "%"];
    var values = [];
    var num = "";
    for (var _i = 0, expr_1 = expr; _i < expr_1.length; _i++) {
        var char = expr_1[_i];
        if (optr.indexOf(char) !== -1) {
            values.push(parseFloat(num));
            values.push(char);
            num = "";
        }
        else {
            num += char;
        }
    }
    if (num) {
        values.push(parseFloat(num));
    }
    for (var i = 0; i < values.length; i++) {
        if (values[i] === "*" || values[i] === "/") {
            var left = values[i - 1];
            var right = values[i + 1];
            var result_1 = values[i] === "*" ? left * right : left / right;
            values.splice(i - 1, 3, result_1);
            i -= 2;
        }
    }
    var result = values[0];
    for (var i = 1; i < values.length; i += 2) {
        var operator = values[i];
        var next_num = values[i + 1];
        result = operator === "+" ? result + next_num : result - next_num;
    }
    return result;
}
document.addEventListener("keydown", function (e) {
    var key = e.key;
    console.log(key);
    if (!isNaN(Number(key)) || "+-*/.".indexOf(key) !== -1) {
        add_no(key);
    }
    else if (key === "Enter") {
        calculate();
    }
    else if (key === "Backspace") {
        expression = expression.slice(0, -1);
        if (display) {
            display.value = expression;
        }
    }
    else if (key === "Escape") {
        clear_disp();
    }
});
