import { textField } from "./simple/formFields.js";
import { validateEmail } from "../controladores/validaciones.js";
import { hasUsuarioCookie,
        getUsuarioCookie,
        addUsuarioCookie } from "../controladores/cookies.js";

function onSubmitUsuario(e) {
    console.log(`Usuario: ${e.target.value}`);
    const userName = e.target.value;

    if (validateEmail(userName)) {
        if (!hasUsuarioCookie(userName)) {
            console.log("Nuevo usuario");
            addUsuarioCookie(userName);
        } else {
            console.log("Usuario existente");
        }
        
        sessionStorage.setItem('user', userName);
        window.location.href = 'pantalla2.html';
        
    } else {
        alert("Correo no válido");
        e.target.select();
        return;
    }
}

export function renderFormUsuario(ele) {
    let usuario = textField("user", "Usuario");

    let input = usuario.getElementsByTagName("input")[0];
    input.addEventListener('blur', (e) => { onSubmitUsuario(e); });
    
    ele.appendChild(usuario);
}