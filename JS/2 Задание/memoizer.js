// memoizer.js
function memoize(fn) {
    const cache = {};
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (key in cache) {
            logMessage(`Возвращаем результат из кэша для аргументов: ${args}`);
            return cache[key];
        } else {
            logMessage(`Вычисляем результат для аргументов: ${args}`);
            const result = fn.apply(this, args);
            cache[key] = result;
            return result;
        }
    };
}

// Функция для вычисления квадрата
function expensiveCalculation(n) {
    logMessage(`Выполняются сложные вычисления для ${n}...`);
    // Имитация задержки для наглядности
    let result = 0;
    for (let i = 0; i < 100000000; i++) {
        result = n * n;
    }
    return result;
}

// Создаем мемоизированную версию функции
const memoizedCalculation = memoize(expensiveCalculation);

// Функция для логирования в интерфейс
function logMessage(message) {
    const logElement = document.getElementById('log');
    const timestamp = new Date().toLocaleTimeString();
    logElement.innerHTML += `[${timestamp}] ${message}<br>`;
    logElement.scrollTop = logElement.scrollHeight;
}

// Функция для тестирования мемоизации
function testMemoization() {
    const input = parseInt(document.getElementById('numberInput').value);
    const result = memoizedCalculation(input);
    document.getElementById('result').textContent = `Квадрат числа ${input} = ${result}`;
}

// Функция для очистки лога
function clearLog() {
    document.getElementById('log').innerHTML = '';
    document.getElementById('result').textContent = '';
}