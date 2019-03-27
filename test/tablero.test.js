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

    it('No leer tableros con caracteres distintos a * y . ', () => {
        // given
        const tablero = [
            '4 4',
            '*.0.',
            '..p.',
            '.*..',
            '+...'
        ];
        // when
        const aceptacion = validarTablero(tablero);
        // then
        expect(aceptacion).toBeFalsy();
    });

    it('No leer archivos con cabeceras en formato incorrecto', () => {
        // given
        const tablero = [
            '1 p',
            '*...',
            '....',
            '.*..',
            '....'
        ];
        // when
        const aceptacion = validarTablero(tablero);
        // then
        expect(aceptacion).toBeFalsy();
    });

    it('No aceptacion de tableros si no  coinciden con sus dimensiones dadas', () => {
        // given
        const tablero = [
            '4 4',
            '*',
            '....',
            '.*..',
        ];
        // when
        const aceptacion = validarTablero(tablero);
        // then
        expect(aceptacion).toBeFalsy();
    });

    it('No aceptar tableros vacios', () => {
        // given
        const tablero = [];
        // when
        const aceptacion = validarTablero(tablero);
        // then
        expect(aceptacion).toBeFalsy();
    });
});