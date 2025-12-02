import { button } from "./button.js";

export function textField(id, etiqueta) {
    let campo = document.createElement('div');
    campo.className = 'formField';
    
    let label = document.createElement('label');
    label.htmlFor = id;
    label.innerHTML = etiqueta;
    
    let input = document.createElement('input');
    input.type = 'text';
    input.id = id;
    input.name = id;

    campo.appendChild(label);
    campo.appendChild(input);

    return campo
}

export function intField(id, etiqueta, min = 0, max = 100) {
    let campo = document.createElement('div');
    campo.className = 'formField';
    
    let label = document.createElement('label');
    label.htmlFor = id;
    label.innerHTML = etiqueta;
    
    let input = document.createElement('input');
    input.type = 'number';
    input.id = id;
    input.name = id;
    input.min = min;
    input.max = max;
    input.step = '1';

    campo.appendChild(label);
    campo.appendChild(input);

    return campo
}

export function radioField(id, idLista, etiquetaLista) {
    let campo = document.createElement('div');
    campo.className = 'formField';

    if (idLista.length == etiquetaLista.length && idLista.length > 0) {
        for (let i = 0; i < idLista.length; i++) {
            let radioContainer = document.createElement('div');
            radioContainer.id = id;
            radioContainer.className = 'radioContainer';

            let label = document.createElement('label');
            label.htmlFor = idLista[i];
            label.innerHTML = etiquetaLista[i];
            radioContainer.appendChild(label);

            let input = document.createElement('input');
            input.type = 'radio';
            input.id = idLista[i];
            input.name = id;
            input.value = idLista[i];
            radioContainer.appendChild(input);

            campo.appendChild(radioContainer);
        }
    } else {
        return null;
    }
    
    return campo;
}

export function formActions(tipoLista, etiquetaLista, onClickLista) {
    let acciones = document.createElement('div');
    acciones.className = 'formActions';

    if (
        tipoLista.length == etiquetaLista.length &&
        tipoLista.length == onClickLista.length &&
        tipoLista.length > 0
    ) {
        for (let i = 0; i < tipoLista.length; i++) {
            let btn = button(tipoLista[i], etiquetaLista[i]);
            btn.addEventListener('click', onClickLista[i]);
            acciones.appendChild(btn);
        }
    } else {
        return null;
    }

    return acciones;
}