/* jshint esversion:6 */
const { generaTablero } = require('../components/buscaminas');

describe('Obtener tablero de minas resueltos', () => {

    it('Tablero de una dimension sin minas', () => {
        //given
        const tablero1dSinMinas = [
            '1 1',
            '.'
        ];
        const tableroEsperado = ['0'];
        // when : calculamos tablero
        const tableroCalculado = generaTablero(tablero1dSinMinas);
        //then
        expect(tableroCalculado).toEqual(tableroEsperado);
    });


    it('Tablero de 2x2 con 1 mina', () => {
        //given: stubs
        const tablero2x2 = [
            '2 2',
            '*.',
            '..'
        ];
        const tableroEsperado = [
            '*1',
            '11'
        ];
        //when
        const tableroCalculado = generaTablero(tablero2x2);
        //then
        expect(tableroCalculado).toEqual(tableroEsperado);
    });

    it('Resolviendo tablero 3x3 sin ninguna mina ', () => {
        // given: stubs double test
        const tablero3x3SinMinas = [
            '3 3',
            '...',
            '...',
            '...'
        ];

        const tableroEsperado = [
            '000',
            '000',
            '000'
        ];

        // when : calculamos el tablero 
        const tableroCalculado = generaTablero(tablero3x3SinMinas);

        //then
        expect(tableroCalculado).toEqual(tableroEsperado);
    });

    it('Resolviendo tablero 3x3 solo minas', () => {
        // given: stubs double test
        const tablero3x3SoloMinas = [
            '3 3',
            '***',
            '***',
            '***'
        ];

        const tableroEsperado = [
            '***',
            '***',
            '***'
        ];

        // when : calculamos el tablero 
        const tableroCalculado = generaTablero(tablero3x3SoloMinas);

        //then
        expect(tableroCalculado).toEqual(tableroEsperado);
    });

    it('Caso practico objetivo tablero 4x4  con minas y casillas sin minas', () => {
        // given: stubs double test
        const tablero4x4 = [
            '4 4',
            '*...',
            '....',
            '.*..',
            '....'
        ];

        const tableroEsperado = [
            '*100',
            '2210',
            '1*10',
            '1110'
        ];

        // when : calculamos el tablero 
        const tableroCalculado = generaTablero(tablero4x4);

        //then
        expect(tableroCalculado).toEqual(tableroEsperado);

    });

    it('Matriz de tablero vacia deuelve tablero vacio', () => {
        // given: stubs double test
        const tableroVacio = [];

        const tableroEsperado = [];

        // when : calculamos el tablero 
        const tableroCalculado = generaTablero(tableroVacio);

        //then
        expect(tableroCalculado).toEqual(tableroEsperado);

    });

});