export function button(tipo, etiqueta) {
    let btn = document.createElement('button');
    btn.type = tipo;
    btn.innerHTML = etiqueta;
    return btn;
}