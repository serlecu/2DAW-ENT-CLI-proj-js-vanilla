import { 
    textField,
    intField,
    radioField,
    formActions } from "./simple/formFields.js";

function onSubmitPregunta() {
    const preguntaValor = document.getElementById('pregunta').value;
    const respuestas = [...document.getElementsByName('respuesta')];
    let respuestaValor = null;
    for (let i = 0; i < respuestas.length; i++) {
        if (respuestas[i].checked) {
            respuestaValor = respuestas[i].value;
            break;
        }
    }
    const puntuacionValor = document.getElementById('puntuacion').value;
    console.log(
        `Pregunta: ${preguntaValor}, Respuesta: ${respuestaValor}, Puntuación: ${puntuacionValor}`
    );
}

function onAtrasClick() {
    window.location.href = 'pantalla2.html';
}

export function renderFormPregunta(ele) {
    // Pregunta
    let pregunta = textField('pregunta', 'Pregunta');

    // Respuesta (V/F)
    let respuesta = radioField(
        'respuesta',
        ['verdadero', 'falso'],
        ['Verdadero', 'Falso']
    );

    // Puntuación con validación
    let puntuacion = intField('puntuacion', 'Puntuación', 0, 9);
    let input = puntuacion.getElementsByTagName('input')[0];
    input.addEventListener('change', (e) => {
        if (e.target.value < 0) {
            e.target.value = 0;
        } else if (e.target.value > 9) {
            e.target.value = 9;
        }
        e.target.value = Math.floor(e.target.value);
    });

    // Acciones (botones)
    let acciones = formActions(
        ['button', 'submit'],
        ['Atrás', 'Grabar'],
        [onAtrasClick, onSubmitPregunta]
    );

    ele.appendChild(pregunta);
    ele.appendChild(respuesta);
    ele.appendChild(puntuacion);
    ele.appendChild(acciones);
}