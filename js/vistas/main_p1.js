import { renderBienvenida } from './bienvenida.js';

function main()  {
    const containerMain = document.getElementById("container_main");
    console.log(containerMain);
    renderBienvenida(containerMain);
}

document.addEventListener('DOMContentLoaded', main);