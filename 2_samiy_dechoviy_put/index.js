const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    output: fs.createWriteStream("output.txt")
});

let arrStr = [];
let line_number = 0
let x, y

rl.on('line', (line) => {
    if (line_number === 0) {
        [x, y] = line.split(' ')
    } else if (false) {
        n = line
    } else {
        arrStr.push(line.split(' ').map(Number))
    }
    line_number++
});

rl.on('close', function () {
    let res = minFoodToReachBottomRight(arrStr)
    console.log(res)

})

function minFoodToReachBottomRight(table) {
    const rows = table.length;
    const cols = table[0].length;
    // Проверка на корректность входных данных
    if (rows === 0 || cols === 0) {
        return 0; // Пустая таблица
    }
    // Создаем таблицу для хранения минимального веса еды,
    // необходимой для достижения данной клетки.
    const dp = Array(rows).fill(null).map(() => Array(cols).fill(Infinity));
    // Инициализируем первую клетку.
    dp[0][0] = table[0][0];
    // Заполняем таблицу dp динамическим программированием.
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (i === 0 && j === 0) continue; // Первая клетка уже инициализирована


            //  Находим минимальное значение из двух возможных путей.
            if (i > 0) {
                dp[i][j] = Math.min(dp[i][j], dp[i - 1][j] + table[i][j]);
            }
            if (j > 0) {
                dp[i][j] = Math.min(dp[i][j], dp[i][j - 1] + table[i][j]);
            }
        }
    }
    // Возвращаем минимальный вес еды, необходимой для достижения правой нижней клетки.
    let result = dp[rows - 1][cols - 1];
    // Проверяем, что результат не Infinity, если путь невозможен.
    if (result === Infinity) {
        return -1; // Невозможно добраться до правой нижней клетки
    }
    return result;
}