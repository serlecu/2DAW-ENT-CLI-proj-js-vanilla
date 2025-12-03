import { renderFormPregunta } from "./formPregunta.js";
import { ListaPreguntas } from "./listaPreguntas.js";
import { getPreguntasCookie } from "../controladores/cookies.js";
// import { renderListaPreguntas } from "./listaPreguntas.js";

function main() {
    console.log("Pantalla 3");
    console.log(sessionStorage);
    const user = sessionStorage.getItem('user');

    const contForm = document.getElementById("container_form");
    renderFormPregunta(contForm);

    const contLista = document.getElementById("container_lista");
    const tablaPreguntas = new ListaPreguntas(contLista);
    tablaPreguntas.addPreguntas(getPreguntasCookie(user));

    contLista.addEventListener('addPregunta', (e) => {
        console.log(e);
        tablaPreguntas.addPregunta(e.detail.pregunta);
    });
    contLista.addEventListener('addCola', (e) => {
        tablaPreguntas.appendCola(e.detail.preguntaId);
        // tras 5 secundos, eliminar de la cola
        setTimeout(() => {
            const eventoRemoveCola = new CustomEvent('removeCola', {
                detail: { id: e.detail.preguntaId }
            });
            contLista.dispatchEvent(eventoRemoveCola);
        }, 5000);
    });
    contLista.addEventListener('removeCola', (e) => {
        tablaPreguntas.removeCola(e.detail.preguntaId);
    });
}

document.addEventListener('DOMContentLoaded', main);