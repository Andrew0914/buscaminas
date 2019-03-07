/* jshint esversion:6 */
/* IMPORTS */
const { argv } = require('./config/comando');
const path = require('path');
const files = require('fs');


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

        let contenido = data.toString();
    });
};

calcularMinas(argv._[0]);