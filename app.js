/* jshint esversion:6 */
const { argv } = require('./config/comando');
const { leerTableroDeArchivo, parseTablero, validarTablero } = require('./components/tablero');
const { generaTablero } = require('./components/buscaminas');

const pathArgumento = argv._[0];
const contenidoArchivo = leerTableroDeArchivo(pathArgumento);
// se obtuvo contenido
if (contenidoArchivo) {
    const tablero = parseTablero(contenidoArchivo);
    // es un tablero valido
    if (validarTablero(tablero)) {
        // generamos el tablero de minas
        let tableroCalculado = generaTablero(tablero);
        // print tablero
        console.log('***** RESULTADO BUSCAMINAS ***** \n');
        tableroCalculado.forEach(fila => {
            console.log(fila);
        });
    } else {
        console.log('No se pudo calcular el tablero');
    }
} else {
    console.log('No se pudo extraer el tablero del archivo');
}