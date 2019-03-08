/* jshint esversion:6 */
/* IMPORTS */
const { argv } = require('./config/comando');
const path = require('path');
const files = require('fs');
const os = require('os');
EOL = os.EOL;

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
 * @param {string} contenido 
 */
const validarTablero = (contenido) => {
    let tablero = parseTablero(contenido);
    const cabecera = tablero[0].split(' ');
    // validamos que sean solo 2 dimensiones
    if (cabecera.length !== 2) {
        console.log('La cabeca del tablero deben ser dos numeros enteros separados por un espacio, ej: 4 4');
        return false;
    }
    // validamos que los valores de las dimensiones sean numericos enteros
    const xDimension = Number(cabecera[0].trim());
    const yDimension = Number(cabecera[1].trim());
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

/**
 * Recibe el arreglo de las casillas adyacentes a una casilla data
 * y devuelve la cantidad de minas encontradas en ellas.
 * @param {array} casillas 
 */
const detectaMinas = (casillas) => {
    let minas = 0;
    for (let casilla of casillas) {
        minas += (casilla && casilla === '*') ? 1 : 0;
    }
    return minas;
};

/**
 * Calcula las posicioens de los casillas y las minas
 * @param {string} contenido 
 */
const generaTablero = (contenido) => {
    let tablero = parseTablero(contenido);
    tablero = tablero.splice(1, (tablero.length - 1));
    let result = '';
    for (let i = 0; i < tablero.length; i++) {
        let casillas = [];
        let fila = tablero[i].split('');
        for (let c = 0; c < fila.length; c++) {
            if (fila[c] === '.') {
                // colocamos las casillas en un arreglo para que las valide en un ciclo
                // colocamos las casillas de los lados
                casillas = [fila[c + 1], fila[c - 1]];
                //colocamos las casillas superiores 
                if (tablero[i - 1]) {
                    casillas.push.apply(casillas, [
                        tablero[i - 1][c - 1] ? tablero[i - 1][c - 1] : false,
                        tablero[i - 1][c + 1] ? tablero[i - 1][c + 1] : false,
                        tablero[i - 1][c] ? tablero[i - 1][c] : false
                    ]);
                }
                //colocamos las casillas inferiores
                if (tablero[i + 1]) {
                    casillas.push.apply(casillas, [
                        tablero[i + 1][c - 1] ? tablero[i + 1][c - 1] : false,
                        tablero[i + 1][c + 1] ? tablero[i + 1][c + 1] : false,
                        tablero[i + 1][c] ? tablero[i + 1][c] : false
                    ]);
                }
                // detectamos las minas
                result += detectaMinas(casillas);
            } else {
                result += '*';
            }
        }
        result += '\n';
    }
    return result;
};


/**
 * Recibe el path del archivo para determinar si existe y es un archivo txt valido
 * @param {string} pathArchivo 
 */
const calcularMinas = (pathArchivo) => {
    const pathReal = path.resolve(pathArchivo);
    // validamos el formato del archivo
    const archivo = path.extname(pathReal);
    if (archivo !== '.txt') {
        console.log('El archivo no tiene formato permitido debe ser .txt');
        return;
    }
    // leer el archvio
    files.readFile(pathReal, (err, data) => {
        if (err) {
            console.log(`No se puedele leer el archivo`, err.code);
            return;
        }
        // obtenemos y validamos el contenido que sea correcto para ser usado en el programa
        let contenido = data.toString();
        if (!validarTablero(contenido)) {
            console.log('No se pudo calcular');
            return false;
        }

        let tablero = generaTablero(contenido);

        console.log(tablero);
    });
};

calcularMinas(argv._[0]);