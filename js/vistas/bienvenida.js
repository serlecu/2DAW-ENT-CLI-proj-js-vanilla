export function renderBienvenida(ele) {
    let p = document.createElement('p');
    p.innerHTML = "Bienveni@, pulsa Control + F10 o espera 5 segundos";
    ele.appendChild(p);
}