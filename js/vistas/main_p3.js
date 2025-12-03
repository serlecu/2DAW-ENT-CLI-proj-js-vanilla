import { renderFormPregunta } from './formPregunta.js';
import { ListaPreguntas } from './listaPreguntas.js';
import { getPreguntasCookie } from '../controladores/cookies.js';

function loadPreguntasFromCookie(user, conRetraso = false) {
    return new Promise((resolve) => {
        const preguntas = getPreguntasCookie(user);
        if (conRetraso) {
            setTimeout(() => {
                resolve(preguntas);
            }, 5000);
        } else {
            resolve(preguntas);
        }
    });
}

function main() {
    console.log('Pantalla 3');
    console.log(sessionStorage);
    const user = sessionStorage.getItem('user');

    const contForm = document.getElementById('container_form');
    renderFormPregunta(contForm);

    const contLista = document.getElementById('container_lista');
    const tablaPreguntas = new ListaPreguntas(contLista);

    loadPreguntasFromCookie(user, true)
        .then((preguntas) => {
            console.log('Añadiendo preguntas a la tabla desde la cookie');
            tablaPreguntas.addPreguntas(preguntas);
        })
        .catch((error) => {
            console.error(
                'Error al cargar las preguntas desde la cookie:',
                error
            );
        });
}

document.addEventListener('DOMContentLoaded', main);
