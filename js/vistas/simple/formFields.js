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