/* jshint esversion:6 */
/* IMPORTS */
const { argv } = require('./config/comando');
const path = require('path');
const files = require('fs');


const validarTablero = (contenido) => {
    const tablero = contenido.split('\r\n');
    const cabecera = tablero[0].split(' ');
    // validamos que sean solo 2 dimensiones
    if (cabecera.length !== 2) {
        console.log('La cabeca del tablero deben ser dos numeros enteros separados por un espacio, ej: 4 4');
        return false;
    }
    // validamos que los valores de las dimensiones sean numericos enteros
    const xDimension = Number(cabecera[0]);
    const yDimension = Number(cabecera[1]);
    if (!Number.isInteger(xDimension) || !Number.isInteger(yDimension)) {
        console.log('Las dimensiones del tablero deben ser numeros enteros ej: 4 4, su entrada: ' + tablero[0]);
        return false;
    }
};

/**
 * Recibe el path del archivo para determinar si existe y es un archivo txt valido
 * @param {string} pathArchivo 
 */
const calcularMinas = (pathArchivo) => {
    // validamos el formato del archivo
    const archivo = path.extname(pathArchivo);
    if (archivo !== '.txt') {
        console.log('El archivo no tiene formato permitido debe ser .txt');
        return;
    }
    // leer el archvio
    files.readFile(pathArchivo, (err, data) => {
        if (err) {
            console.log(`No se puedele leer el archivo`, err.code);
            return;
        }
        // obtenemos y validamos el contenido que sea correcto para ser usado en el programa
        let contenido = data.toString();
        validarTablero(contenido);
    });
};

calcularMinas(argv._[0]);