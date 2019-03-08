/* jshint esversion:6 */
const { argv } = require('./config/comando');
const buscaminas = require('./buscaminas');
buscaminas.calcularMinas(argv._[0]);