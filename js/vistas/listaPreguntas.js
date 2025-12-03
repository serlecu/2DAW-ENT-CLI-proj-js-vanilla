import { createTabla } from './simple/tabla.js';

export class ListaPreguntas {
    constructor(ele) {
        this.container = ele;
        this.tabla = null;
        this.preguntas = [];
        this.cola = new Set();
        this.errores = new Set();
        this.eventos = {};
        this.setupEventos();
        this.render();
    }

    clear() {
        this.clearListeners();
        this.tabla = null;
        this.container.innerHTML = '';
    }

    render() {
        this.clear();
        if (this.preguntas.length > 0) {
            let header = ['Pregunta', 'Respuesta', 'Puntuación', 'Estado'];
            let data = [];
            for (let i = 0; i < this.preguntas.length; i++) {
                const p = this.preguntas[i];
                let estado = 'OK';
                if (this.errores.has(p.id)) {
                    estado = 'ERROR';
                } else if (this.cola.has(p.id)) {
                    estado = 'Guardando...';
                }
                data.push([p.pregunta, p.respuesta, p.puntuacion, estado]);
            }
            this.tabla = createTabla(header, data);
            this.container.appendChild(this.tabla);
        } else {
            const cargando = document.createElement('p');
            cargando.innerHTML = 'Cargando preguntas...';
            this.container.appendChild(cargando);
        }
        this.addListeners();
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

    appendErrores(id) {
        this.errores.add(id);
        this.render();
    }

    setupEventos() {
        this.eventos = {
            addPregunta: (e) => this.addPregunta(e.detail.pregunta),
            addCola: (e) => this.appendCola(e.detail.preguntaId),
            removeCola: (e) => this.removeCola(e.detail.preguntaId),
            addErrores: (e) => this.appendErrores(e.detail.preguntaId),
        };
    }

    addListeners() {
        this.container.addEventListener(
            'addPregunta',
            this.eventos.addPregunta
        );
        this.container.addEventListener(
            'addCola',
            this.eventos.addCola
        );
        this.container.addEventListener(
            'removeCola',
            this.eventos.removeCola
        );
        this.container.addEventListener(
            'addErrores',
            this.eventos.addErrores
        );
    }

    clearListeners() {
        this.container.removeEventListener(
            'addPregunta',
            this.eventos.addPregunta
        );
        this.container.removeEventListener(
            'addCola',
            this.eventos.addCola
        );
        this.container.removeEventListener(
            'removeCola',
            this.eventos.removeCola
        );
        this.container.removeEventListener(
            'addErrores',
            this.eventos.addErrores
        );
    }
}
