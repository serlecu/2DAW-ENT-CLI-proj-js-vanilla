import { textField } from "./simple/formFields.js";
import { validateEmail } from "../controladores/validaciones.js";
import { hasUsuarioCookie,
        getUsuarioCookie,
        addUsuarioCookie } from "../controladores/cookies.js";

function onSubmitUsuario(e) {
    console.log(`Usuario: ${e.target.value}`);
    const userName = e.target.value;

    if (validateEmail(userName)) {
        if (hasUsuarioCookie(userName)) {
            console.log("Usuario existente");
            alert(`Bienvenido, ${userName}. Tu última conexión fue el ${getUsuarioCookie(userName).last_login}`);
        } else {
            console.log("Nuevo usuario");
            addUsuarioCookie(userName);
            alert(`Bienvenido, ${userName}. Tu última conexión fue el ${getUsuarioCookie(userName).last_login}`);
        }
        
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