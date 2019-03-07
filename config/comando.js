/* jshint esversion:6 */
/* IMPORTS */
//confuguracion para el comando de ejecucion
const argv = require('yargs').command('$0', 'Archivo de texto con el tablero a calcular').argv;

// exports
module.exports = { argv };