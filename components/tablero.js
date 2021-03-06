/* IMPORTS */
const path = require('path');
const files = require('fs');
var mime = require('mime-types');
const os = require('os');
EOL = os.EOL;

/**
 * Recibe el path del archivo para determinar si existe y es un archivo txt valido
 * @param {string} pathArchivo 
 */
const leerTableroDeArchivo = (pathArchivo) => {
    const pathReal = path.resolve(pathArchivo);
    // validamos el formato del archivo
    const mimeType = mime.lookup(pathReal);
    if (mimeType !== 'text/plain') {
        console.log('El archivo no tiene formato permitido debe ser .txt');
        return false;
    }
    let dataTablero = files.readFileSync(pathReal);
    let tablero = dataTablero.toString();
    return tablero;
};

/**
 * Parsea sl string del tablero proveniente del txt
 * @param {string} contenido 
 */
const parseTablero = (contenido) => {
    let tablero = [];
    if (contenido.includes('\r\n')) {
        tablero = contenido.split('\r\n');
    } else if (contenido.includes('\n')) {
        tablero = contenido.split('\n');
    } else if (contenido.includes('\r')) {
        tablero = contenido.split('\r');
    } else if (contenido.includes(EOL)) {
        tablero = contenido.split(EOL);
    }
    return tablero;
};

/**
 * Validal a estructura correcta del tablero de minas
 * @param {array} tablero
 */
const validarTablero = (tablero) => {
    if (tablero.length <= 0) {
        console.log('No hay tablero para calcular');
        return false;
    }
    const cabecera = tablero[0].split(' ');
    // validamos que sean solo 2 dimensiones
    if (cabecera.length !== 2) {
        console.log('La cabeca del tablero deben ser dos numeros enteros separados por un espacio, ej: 4 4');
        return false;
    }
    // validamos que los valores de las dimensiones sean numericos enteros
    const xDimension = Number(cabecera[0]);
    const yDimension = Number(cabecera[1]);
    if (!Number.isInteger(xDimension) || !Number.isInteger(yDimension) || xDimension <= 0 || yDimension <= 0) {
        console.log(`Las dimensiones del tablero deben ser numeros enteros mayores que 0 ej: 4 4, su entrada: ${tablero[0]}`);
        return false;
    }

    // validamos la dimesion x o filas  que sea correcta con la dada
    if (xDimension !== (tablero.length - 1)) {
        console.log(`Las filas no coinciden con la dimension dada, cantidad de filas ${ tablero.length - 1} dimension dada: ${xDimension} sin saltos de linea`);
        return false;
    }
    // validamos la dimension y o culumnas que sea correcta
    for (let i = 1; i < tablero.length; i++) {
        if (tablero[i].length !== yDimension) {
            console.log(`Las columnas de la fila ${i} no coinciden con la dimension dada, cantidad de columnas ${tablero[i].length} dimension dada: ${yDimension}`);
            return false;
        }
    }

    // validamos solo caracteres permitidos para minas y casillas
    for (let i = 1; i < tablero.length; i++) {
        let fila = tablero[i].split('');
        for (let f = 0; f < fila.length; f++) {
            if (fila[f] !== '*' && fila[f] !== '.') {
                console.log('Los caracteres para las casilas son * -> minas . -> casilla vacia, sin espacion, ejemplo ..*.');
                return false;
            }
        }
    }
    return true;

};

module.exports = {
    leerTableroDeArchivo,
    parseTablero,
    validarTablero
};