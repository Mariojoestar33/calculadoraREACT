import { useState } from 'react'
import { crearManejadorEntrada } from '../services/calculadora'

function Calculadora() {

    const [numero, setNumero] = useState('');
    const [operacion, setOperacion] = useState('');
    const [resultado, setResultado] = useState(0);
    const [tokens, setTokens] = useState([]);
    const [terminoCalculo, setTerminoCalculo] = useState(false);

    const manejarEntrada = crearManejadorEntrada(
        { numero, resultado, tokens, terminoCalculo },
        { setNumero, setOperacion, setResultado, setTokens, setTerminoCalculo }
    );

    const pantalla = numero !== '' ? numero : resultado;

    return(
        <div className="contenedor-calculadora">
            <div className="cabecera-calculadora">
                <h3 className="titulo-calculadora">FX-991</h3>
            </div>
            <div className="centro-operaciones">
                {operacion ? (<p className="datos-operacionPasada">{operacion}</p>) : (<p className="datos-operacionPasada">0</p>)}
                <p className="resultado">{pantalla}</p>
            </div>
            <div className="centro-teclado">
                <button className="entradas-teclado" onClick={() => manejarEntrada('AC')}>AC</button>
                <button className="entradas-teclado" onClick={() => manejarEntrada('/')}>/</button>
                <button className="entradas-teclado" onClick={() => manejarEntrada('*')}>*</button>
                <button className="entradas-teclado" onClick={() => manejarEntrada('-')}>-</button>
                <button className="entradas-teclado" onClick={() => manejarEntrada('7')}>7</button>
                <button className="entradas-teclado" onClick={() => manejarEntrada('8')}>8</button>
                <button className="entradas-teclado" onClick={() => manejarEntrada('9')}>9</button>
                <button className="entradas-teclado" id='plus' onClick={() => manejarEntrada('+')}>+</button>
                <button className="entradas-teclado" onClick={() => manejarEntrada('4')}>4</button>
                <button className="entradas-teclado" onClick={() => manejarEntrada('5')}>5</button>
                <button className="entradas-teclado" onClick={() => manejarEntrada('6')}>6</button>
                <button className="entradas-teclado" onClick={() => manejarEntrada('1')}>1</button>
                <button className="entradas-teclado" onClick={() => manejarEntrada('2')}>2</button>
                <button className="entradas-teclado" onClick={() => manejarEntrada('3')}>3</button>
                <button className="entradas-teclado" id='enter' onClick={() => manejarEntrada('Enter')}>Enter</button>
                <button className="entradas-teclado" id='zero' onClick={() => manejarEntrada('0')}>0</button>
                <button className="entradas-teclado" onClick={() => manejarEntrada('.')}>.</button> 
            </div>
        </div>
    );
}

export default Calculadora;