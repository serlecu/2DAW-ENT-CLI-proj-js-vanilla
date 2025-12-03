import { FormPregunta } from './formPregunta.js';
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
    const user = sessionStorage.getItem('user');

    const contForm = document.getElementById('container_form');
    const contLista = document.getElementById('container_lista');
    
    const tablaPreguntas = new ListaPreguntas(contLista);
    const formPregunta = new FormPregunta(contForm, tablaPreguntas);

    loadPreguntasFromCookie(user, true)
        .then((preguntas) => {
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
