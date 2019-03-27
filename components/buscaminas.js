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
const generaTablero = (tablero) => {
    tablero = tablero.splice(1, (tablero.length - 1));
    let result = '';
    let matrizCalculada = [];
    for (let i = 0; i < tablero.length; i++) {
        let casillas = [];
        let fila = tablero[i].split('');
        for (let c = 0; c < fila.length; c++) {
            if (fila[c] === '.') {
                // colocamos las casillas en un arreglo para que las valide en un ciclo
                // colocamos las casillas de los lados
                casillas = [fila[c - 1], fila[c + 1]];
                //colocamos las casillas superiores 
                if (tablero[i - 1]) {
                    casillas.push.apply(casillas, [
                        tablero[i - 1][c - 1] ? tablero[i - 1][c - 1] : false,
                        tablero[i - 1][c] ? tablero[i - 1][c] : false,
                        tablero[i - 1][c + 1] ? tablero[i - 1][c + 1] : false
                    ]);
                }
                //colocamos las casillas inferiores
                if (tablero[i + 1]) {
                    casillas.push.apply(casillas, [
                        tablero[i + 1][c - 1] ? tablero[i + 1][c - 1] : false,
                        tablero[i + 1][c] ? tablero[i + 1][c] : false,
                        tablero[i + 1][c + 1] ? tablero[i + 1][c + 1] : false
                    ]);
                }
                // detectamos las minas
                result += detectaMinas(casillas);
            } else {
                result += '*';
            }
        }
        matrizCalculada.push(result);
        result = '';
    }
    return matrizCalculada;
};

module.exports = {
    detectaMinas,
    generaTablero
};