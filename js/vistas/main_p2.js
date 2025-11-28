import { getUsuarioCookie } from '../controladores/cookies.js';

function main()  {
    console.log("Pantalla 2");
    console.log(sessionStorage);

    const contMain = document.getElementById("container_main");
    const userData = getUsuarioCookie(sessionStorage.getItem('user'));

    let pHola = document.createElement('p');
    pHola.innerHTML = `Hola ${userData.username}`;
    contMain.appendChild(pHola);

    let lastLogin = new Date(userData.last_login);
    let dateString = `${lastLogin.getUTCDate()}-`;
    dateString += `${lastLogin.getUTCMonth() + 1}-`;
    dateString += `${lastLogin.getUTCFullYear()}`;
    let timeString = lastLogin.toLocaleTimeString();

    let pConexion = document.createElement('p');
    pConexion.innerHTML = `Tu última vez que entraste fue el ${dateString}`;
    pConexion.innerHTML += ` a las ${timeString}`;
    contMain.appendChild(pConexion);

    let btnPreguntas = document.createElement('button');
    btnPreguntas.innerHTML = 'Preguntas';
    btnPreguntas.addEventListener('click', () => {
        window.location.href = 'pantalla3.html';
    });
    contMain.appendChild(btnPreguntas);
}

document.addEventListener('DOMContentLoaded', main);