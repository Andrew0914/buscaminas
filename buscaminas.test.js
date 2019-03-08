/* jshint esversion:6 */
const buscaminas = require('./buscaminas');

test('No leer el archivo txt con formato no valido', () => {
    expect(buscaminas.calcularMinas('tablero.css')).toBe(false);
});

test('La cabecera del tablero son dos numeros enteros seprados por 1 espacio', () => {
    expect(buscaminas.validarTablero(`4 3\n*..\n...\n.*.\n...`)).toBe(true);
});

test('Las dimensiones corresponde con el tablero dado', () => {
    expect(buscaminas.validarTablero(`4 3\n*..\n...\n.*.\n...`)).toBe(true);
});

test('Detectar la cantidad de minas en una arreglo mixto de string y boolean', () => {
    expect(buscaminas.detectaMinas(['*', false, '.'])).toBe(1);
});

test('Valores no válidos en las casillas', () => {
    expect(buscaminas.detectaMinas(['*', 50, '.'])).toBe(1);
});