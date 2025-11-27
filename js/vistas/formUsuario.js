import { textField } from "./simple/formFields.js";

export function renderFormUsuario(ele) {
    let usuario = textField("user", "Usuario");
    ele.appendChild(usuario);
}