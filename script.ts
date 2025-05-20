let expression: string = ""; // Expression to be calculated
const display = document.querySelector('input#display') as HTMLInputElement | null;

function add_no(key: string): void {
    expression += key;
    if (display) {
        display.value = expression;
    }
}
function clear_disp(): void {
    expression = "";
    if (display) {
        display.value = "0";
    }
}

function calculate(): void {
    if (expression === "") {
        alert("Please enter a valid expression.");
        return;
    }
    const result = calc_expr(expression);
    if (display) {
        display.value = result.toString();
    }
    expression = result.toString();
}

function calc_expr(expr: string): number {
    const optr: string[] = ["+", "-", "*", "/", "%"];
    const values: (number | string)[] = [];
    let num: string = "";

    for (let char of expr) {
        if (optr.indexOf(char) !== -1) {
            values.push(parseFloat(num));
            values.push(char);
            num = "";
        } else {
            num += char;
        }
    }

    if (num) {
        values.push(parseFloat(num));
    }

    for (let i = 0; i < values.length; i++) {
        if (values[i] === "*" || values[i] === "/") {
            const left: number = values[i - 1] as number;
            const right: number = values[i + 1] as number;

            const result: number = values[i] === "*" ? left * right : left / right;

            values.splice(i - 1, 3, result);
            i -= 2;
        }
    }

    let result: number = values[0] as number;
    for (let i = 1; i < values.length; i += 2) {
        const operator: string = values[i] as string;
        const next_num: number = values[i + 1] as number;
        result = operator === "+" ? result + next_num : result - next_num;
    }
    return result;
}

document.addEventListener("keydown", (e: KeyboardEvent) => {
    const key = e.key;
    console.log(key);

    if (!isNaN(Number(key)) || "+-*/.".indexOf(key) !== -1) {
        add_no(key);
    } else if (key === "Enter") {
        calculate();
    } else if (key === "Backspace") {
        expression = expression.slice(0, -1);
        if (display) {
            display.value = expression;
        }
    } else if (key === "Escape") {
        clear_disp();
    }
});