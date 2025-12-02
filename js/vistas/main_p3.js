import { renderFormPregunta } from "./formPregunta.js";
// import { renderListaPreguntas } from "./listaPreguntas.js";

function main() {
    console.log("Pantalla 3");
    console.log(sessionStorage);

    const contForm = document.getElementById("container_form");
    // contForm.innerHTML = "<p>Formulario Placeholder</p>";
    renderFormPregunta(contForm);

    const contLista = document.getElementById("container_lista");
    contLista.innerHTML = "<p>Cargando preguntas...</p>";
    // renderListaPreguntas(contLista);
}

document.addEventListener('DOMContentLoaded', main);