
const formulario = document.querySelector('form');
const lista = document.createElement('ul');
lista.className = 'lista';
formulario.appendChild(lista);

const balanceEl = document.createElement('p');
balanceEl.className = 'balance';
formulario.appendChild(balanceEl);

const STORAGE_KEY = 'appfinanciera.movimientos';

function cargarMovimientos() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

function guardarMovimientos(movimientos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movimientos));
}

function calcularBalance(movimientos) {
    return movimientos.reduce((total, m) => total + m.ingreso - m.gasto, 0);
}

function renderMovimiento(movimiento) {
    const nuevoElemento = document.createElement('li');
    nuevoElemento.textContent = `Ingreso: ${movimiento.ingreso} - Gasto: ${movimiento.gasto}`;
    lista.appendChild(nuevoElemento);
}

function renderBalance(movimientos) {
    const balance = calcularBalance(movimientos);
    balanceEl.textContent = `Balance total: ${balance.toFixed(2)}`;
}

function renderTodo(movimientos) {
    lista.innerHTML = '';
    movimientos.forEach(renderMovimiento);
    renderBalance(movimientos);
}

let movimientos = cargarMovimientos();
renderTodo(movimientos);

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const ingresoInput = document.querySelector('#ingreso');
    const gastoInput = document.querySelector('#gasto');
    const ingreso = parseFloat(ingresoInput.value);
    const gasto = parseFloat(gastoInput.value);

    if (Number.isNaN(ingreso) || Number.isNaN(gasto) || ingreso < 0 || gasto < 0) {
        alert('Ingresa valores numéricos válidos (sin negativos) para ingreso y gasto.');
        return;
    }

    const movimiento = { ingreso, gasto };
    movimientos.push(movimiento);
    guardarMovimientos(movimientos);
    renderMovimiento(movimiento);
    renderBalance(movimientos);

    ingresoInput.value = '';
    gastoInput.value = '';
});
