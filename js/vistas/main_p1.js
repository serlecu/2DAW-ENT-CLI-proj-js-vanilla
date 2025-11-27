import { renderBienvenida } from './bienvenida.js';
import { renderFormUsuario } from './formUsuario.js';
import { esperar } from '../controladores/espera.js'; 
import { controllerTeclas } from '../controladores/teclas.js';  

function clearContainer(ele) {
    ele.innerHTML = '';
}

function replaceContent(ele, renderClbk) {
    console.log("Replacing content");
    clearContainer(ele);
    renderClbk(ele);
}

function handleF10Ctrl(ctrl, promesa) {
    if (ctrl.tiene('Control') && ctrl.tiene('F10')) {
        promesa.stop();
    }    
    // quizás eliminar los listeners
}

function main()  {
    const contMain = document.getElementById("container_main");
    const ctrlTeclas = new controllerTeclas();
    renderBienvenida(contMain);
    let promesa = esperar(5000, 
        () => {
            replaceContent(contMain, renderFormUsuario);
        }
    );
    document.addEventListener('keydown', (e) => {
        ctrlTeclas.anyadir(e.key);
        handleF10Ctrl(ctrlTeclas, promesa);
    });
    document.addEventListener('keyup', (e) => {
        ctrlTeclas.eliminar(e.key);
    });
}

document.addEventListener('DOMContentLoaded', main);