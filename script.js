
const formulario = document.querySelector('form');
const lista = document.createElement('ul');
lista.className = 'lista';
formulario.appendChild(lista);

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const ingreso = document.querySelector('#ingreso').value;
    const gasto = document.querySelector('#gasto').value;
    const nuevoElemento = document.createElement('li');
    nuevoElemento.textContent =Ingreso: ${ingreso} - Gasto: ${gasto}`;
    lista.appendChild(nuevoElemento);
    document.querySelector('#ingreso').value = '';
    document.querySelector('#gasto').value = '';
});
