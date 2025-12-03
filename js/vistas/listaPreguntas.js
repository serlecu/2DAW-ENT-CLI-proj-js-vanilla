import { createTabla } from "./simple/tabla.js";

export class ListaPreguntas {
    constructor(ele) {
        this.container = ele;
        this.tabla = null;
        this.preguntas = [];
        this.cola = new Set();
        this.render();
    }

    clear() {
        this.tabla = null;
        this.container.innerHTML = '';
    }

    render() {
        this.clear()

        if (this.preguntas.length > 0){
            let header = ['Pregunta', 'Respuesta', 'Puntuación', 'Estado'];
            let data = [];
            for(let i = 0; i < this.preguntas.length; i++) {
                const p = this.preguntas[i];
                let estado = this.cola.has(p.id) ? 'Guardando...' : 'OK';
                data.push([
                    p.pregunta,
                    p.respuesta,
                    p.puntuacion,
                    estado
                ])
            }
            this.tabla = createTabla(header, data);
            this.container.appendChild(this.tabla);

        } else {
            const cargando = document.createElement('p');
            cargando.innerHTML = "Cargando preguntas...";
            this.container.appendChild(cargando);
        }
    }

    addPregunta(pregunta) {
        this.preguntas.push(pregunta);
        this.render();
    }

    addPreguntas(preguntas) {
        this.preguntas = this.preguntas.concat(preguntas);
        this.render();
    }

    appendCola(id) {
        this.cola.add(id);
        this.render();
    }

    removeCola(id) {
        this.cola.delete(id);
        this.render();
    }
    
}
