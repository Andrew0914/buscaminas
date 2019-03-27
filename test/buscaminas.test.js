/* jshint esversion:6 */
const { generaTablero } = require('../components/buscaminas');

describe('Obtener tablero de minas resueltos', () => {

    it('Tablero de una dimension sin minas', () => {
        const tablero1dSinMinas = ['1 1', '.'];
        const tableroEsperado = '0\n';
        expect(generaTablero(tablero1dSinMinas)).toBe(tableroEsperado);
    });


    it('Tablero de 2x2 con 1 mina \n1*\n11\n', () => {
        const tablero2x2 = [
            '2 2',
            '*.',
            '..'
        ];
        const tableroEsperado = '*1\n11\n';
        const tableroResuelto = generaTablero(tablero2x2);
        expect(tableroResuelto).toBe(tableroEsperado);
    });

});