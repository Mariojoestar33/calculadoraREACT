const OPERADORES = ['+', '-', '*', '/'];

function aritmetica(expresion) {
    const valores = [];
    const operadores = [];
    const prioridades = { '+': 1, '-': 1, '*': 2, '/': 2 };

    function resolverOperacion() {
        const operador = operadores.pop();
        const segundoNumero = valores.pop();
        const primerNumero = valores.pop();

        if (operador === '/' && segundoNumero === 0) {
            throw new Error('err div 0');
        }

        if (operador === '+') valores.push(primerNumero + segundoNumero);
        if (operador === '-') valores.push(primerNumero - segundoNumero);
        if (operador === '*') valores.push(primerNumero * segundoNumero);
        if (operador === '/') valores.push(primerNumero / segundoNumero);
    }

    expresion.forEach(function (elemento) {
        if (!Number.isNaN(Number(elemento))) {
            valores.push(Number(elemento));
            return;
        }

        while (
            operadores.length > 0 &&
            prioridades[operadores[operadores.length - 1]] >= prioridades[elemento]
        ) {
            resolverOperacion();
        }

        operadores.push(elemento);
    });

    while (operadores.length > 0) {
        resolverOperacion();
    }

    return valores[0];
}

function crearManejadorEntrada(estado, acciones) {
    function manejarEntrada(entrada) {
        const { numero, resultado, tokens, terminoCalculo } = estado;
        const {
            setNumero,
            setOperacion,
            setResultado,
            setTokens,
            setTerminoCalculo
        } = acciones;

        console.log('Botón presionado:', entrada);

        if (entrada === 'AC') {
            setNumero('');
            setOperacion('');
            setResultado(0);
            setTokens([]);
            setTerminoCalculo(false);
            return;
        }

        if (entrada === 'Enter') {
            if (numero === '') return;

            const expresion = [...tokens, numero];

            try {
                const nuevoResultado = aritmetica(expresion);
                console.log('Expresión:', expresion.join(' '), 'Resultado:', nuevoResultado);
                setResultado(nuevoResultado);
                setOperacion(expresion.join(' '));
                setNumero('');
                setTokens([]);
                setTerminoCalculo(true);
            } catch (error) {
                console.error('Error al calcular:', error);
                setResultado(error.message);
                setNumero('');
                setTokens([]);
                setTerminoCalculo(true);
            }
            return;
        }

        if (OPERADORES.includes(entrada)) {
            if (terminoCalculo) {
                setTokens([String(resultado), entrada]);
                setOperacion(`${resultado} ${entrada}`);
                setNumero('');
                setTerminoCalculo(false);
                return;
            }

            if (numero === '' && tokens.length === 0) return;

            if (numero !== '') {
                const nuevosTokens = [...tokens, numero, entrada];
                setTokens(nuevosTokens);
                setOperacion(nuevosTokens.join(' '));
                setNumero('');
                return;
            }

            if (tokens.length > 0 && OPERADORES.includes(tokens[tokens.length - 1])) {
                const nuevosTokens = [...tokens.slice(0, -1), entrada];
                setTokens(nuevosTokens);
                setOperacion(nuevosTokens.join(' '));
            }
            return;
        }

        if (entrada === '.') {
            if (!numero.includes('.')) {
                const nuevoNumero = numero === '' ? '0.' : `${numero}.`;
                setNumero(nuevoNumero);
                setResultado(nuevoNumero);
            }
            return;
        }

        if (terminoCalculo) {
            setNumero(entrada);
            setResultado(entrada);
            setOperacion('');
            setTokens([]);
            setTerminoCalculo(false);
            return;
        }

        const nuevoNumero = `${numero}${entrada}`;
        setNumero(nuevoNumero);
        setResultado(nuevoNumero);
    }

    return manejarEntrada;
}

function crearBoton(valor, manejarEntrada) {
    return {
        type: 'button',
        onClick: function () {
            manejarEntrada(valor);
        }
    };
}

export { crearBoton, crearManejadorEntrada };