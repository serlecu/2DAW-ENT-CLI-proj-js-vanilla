import { textField } from "./simple/formFields.js";
import { validateEmail } from "../controladores/validaciones.js";

function onSubmitUsuario(e) {
    console.log(`Usuario: ${e.target.value}`);

    if (validateEmail(e.target.value)) {
        // crear o cargar usuario desde cookies
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