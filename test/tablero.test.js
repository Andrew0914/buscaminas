// imports 
const { leerTableroDeArchivo, validarTablero } = require('../components/tablero');

/**
 * Prueba 1: Leer el tablero desde un archivo de texto plano
 */
describe('Leer el tablero desde un archivo de texto plano', () => {
    it('Lectura de archivo correcto .txt', () => {
        const resultadoActual = leerTableroDeArchivo('tablero.txt');
        expect(typeof resultadoActual).toBe('string');
    });

    it('No leer archivo si no es de texto plano', () => {
        const resultadoActual = leerTableroDeArchivo('tablero.js');
        expect(resultadoActual).toBeFalsy();
    });
});