import {
    textField,
    intField,
    radioField,
    formActions,
} from './simple/formFields.js';
import { addPreguntaCookie } from '../controladores/cookies.js';

function onSubmitPregunta() {
    const username = sessionStorage.getItem('user');
    const preguntaId = Date.now();
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

    const pregunta = {
        id: preguntaId,
        pregunta: preguntaValor,
        respuesta: respuestaValor,
        puntuacion: parseInt(puntuacionValor),
    };

    // Eventos para la tabla
    const eventoPregunta = new CustomEvent('addPregunta', {
        detail: { pregunta: pregunta },
    });
    const eventoCola = new CustomEvent('addCola', {
        detail: { preguntaId: preguntaId },
    });
    const eventoRemoveCola = new CustomEvent('removeCola', {
        detail: { preguntaId: preguntaId },
    });
    const eventoErrores = new CustomEvent('addErrores', {
        detail: { preguntaId: preguntaId },
    });

    const contLista = document.getElementById('container_lista');
    contLista.dispatchEvent(eventoCola);
    contLista.dispatchEvent(eventoPregunta);
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject("Error simulado");
            resolve();
        }, 5000);
    });
    promise
        .then(() => {
            contLista.dispatchEvent(eventoRemoveCola);
            addPreguntaCookie(username, pregunta);
        })
        .catch((error) => {
            contLista.dispatchEvent(eventoRemoveCola);
            contLista.dispatchEvent(eventoErrores);
            console.error('Error al guardar la pregunta:', error);
        });
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
