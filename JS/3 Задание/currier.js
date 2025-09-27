// currier.js
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

// Функция для умножения трех чисел
function multiplyThreeNumbers(a, b, c) {
    return a * b * c;
}

// Функция для сложения четырех чисел (дополнительный пример)
function addFourNumbers(a, b, c, d) {
    return a + b + c + d;
}

// Создаем каррированные версии функций
const curriedMultiply = curry(multiplyThreeNumbers);
const curriedAdd = curry(addFourNumbers);

// Функция для тестирования каррирования
function testCurrying() {
    const a = parseInt(document.getElementById('num1').value);
    const b = parseInt(document.getElementById('num2').value);
    const c = parseInt(document.getElementById('num3').value);
    
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = '';
    
    // Различные способы вызова каррированной функции
    const result1 = curriedMultiply(a)(b)(c);
    resultsElement.innerHTML += `<p><code>curriedMultiply(${a})(${b})(${c}) = ${result1}</code></p>`;
    
    const result2 = curriedMultiply(a, b)(c);
    resultsElement.innerHTML += `<p><code>curriedMultiply(${a}, ${b})(${c}) = ${result2}</code></p>`;
    
    const result3 = curriedMultiply(a)(b, c);
    resultsElement.innerHTML += `<p><code>curriedMultiply(${a})(${b}, ${c}) = ${result3}</code></p>`;
    
    const result4 = curriedMultiply(a, b, c);
    resultsElement.innerHTML += `<p><code>curriedMultiply(${a}, ${b}, ${c}) = ${result4}</code></p>`;
    
    // Демонстрация частичного применения
    resultsElement.innerHTML += `<hr><p><strong>Частичное применение:</strong></p>`;
    
    const multiplyByTwo = curriedMultiply(a);
    resultsElement.innerHTML += `<p><code>const multiplyByTwo = curriedMultiply(${a});</code></p>`;
    
    const multiplyByTwoAndThree = multiplyByTwo(b);
    resultsElement.innerHTML += `<p><code>const multiplyByTwoAndThree = multiplyByTwo(${b});</code></p>`;
    
    const finalResult = multiplyByTwoAndThree(c);
    resultsElement.innerHTML += `<p><code>const result = multiplyByTwoAndThree(${c}) = ${finalResult};</code></p>`;
    
    // Дополнительный пример с сложением
    resultsElement.innerHTML += `<hr><p><strong>Дополнительный пример (сложение 4 чисел):</strong></p>`;
    const addResult = curriedAdd(1)(2)(3)(4);
    resultsElement.innerHTML += `<p><code>curriedAdd(1)(2)(3)(4) = ${addResult}</code></p>`;
}

// Функция для очистки результатов
function clearResults() {
    document.getElementById('results').innerHTML = '';
}