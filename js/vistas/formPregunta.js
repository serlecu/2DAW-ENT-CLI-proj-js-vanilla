import {
    textField,
    intField,
    radioField,
    formActions,
} from './simple/formFields.js';
import { addPreguntaCookie } from '../controladores/cookies.js';

export class FormPregunta {
    constructor(ele, listTarget = null) {
        this.container = ele;
        this.listTarget = listTarget;
        this.preguntaEle = null;
        this.respuestaEle = null;
        this.puntuacionEle = null;
        this.acciones = [];

        this.username = sessionStorage.getItem('user');
        this.preguntaVal = null;
        this.respuestaVal = null;
        this.puntuacionVal = null;

        this.render();
    }

    render() {
        // Pregunta
        this.preguntaEle = textField('pregunta', 'Pregunta');

        // Respuesta (V/F)
        this.respuestaEle = radioField(
            'respuesta',
            ['verdadero', 'falso'],
            ['Verdadero', 'Falso']
        );

        // Puntuación con validación
        this.puntuacionEle = intField('puntuacion', 'Puntuación', 0, 9);
        let input = this.puntuacionEle.getElementsByTagName('input')[0];
        input.addEventListener('change', (e) => {
            if (e.target.value < 0) {
                e.target.value = 0;
            } else if (e.target.value > 9) {
                e.target.value = 9;
            }
            e.target.value = Math.floor(e.target.value);
        });

        // Acciones (botones)
        let accionesEle = formActions(
            ['button', 'submit'],
            ['Atrás', 'Grabar'],
            [this.onAtrasClick.bind(this), this.onSubmitPregunta.bind(this)]
        );
        this.acciones = accionesEle.getElementsByTagName('button');

        this.container.appendChild(this.preguntaEle);
        this.container.appendChild(this.respuestaEle);
        this.container.appendChild(this.puntuacionEle);
        this.container.appendChild(accionesEle);
        this.setActiveGuardar(false);

        this.addListeners();
    }

    clearValues() {
        this.preguntaVal = null;
        this.respuestaVal = null;
        this.puntuacionVal = null;
    }

    clearForm() {
        this.clearValues();
        this.setActiveGuardar(false);
        this.preguntaEle.getElementsByTagName('input')[0].value = null;
        let inputs = this.respuestaEle.getElementsByTagName('input');
        [...inputs].forEach((e) => {
            if (e.type === 'radio') {
                e.checked = false;
            }
        });
        this.puntuacionEle.getElementsByTagName('input')[0].value = null;
    }

    setActiveAtras(status = true) {
        const btnAtras = this.acciones[0];
        btnAtras.disabled = !status;
    }

    setActiveGuardar(status = true) {
        const btnGuardar = this.acciones[1];
        btnGuardar.disabled = !status;
    }

    onAtrasClick() {
        window.location.href = 'pantalla2.html';
    }

    onSubmitPregunta() {
        const preguntaId = Date.now();
        const pregunta = {
            id: preguntaId,
            pregunta: this.preguntaVal,
            respuesta: this.respuestaVal,
            puntuacion: parseInt(this.puntuacionVal),
        };

        this.setActiveAtras(false);
        this.clearForm();

        if (this.listTarget) {
            this.listTarget.container.dispatchEvent(
                new CustomEvent('addCola', {
                    detail: { preguntaId: preguntaId },
                })
            );
            this.listTarget.container.dispatchEvent(
                new CustomEvent('addPregunta', {
                    detail: { pregunta: pregunta },
                })
            );
        }
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                // reject("Error simulado");
                resolve();
            }, 5000);
        });
        promise
            .then(() => {
                console.log('Pregunta guardada correctamente');
                if (this.listTarget) {
                    this.listTarget.container.dispatchEvent(
                        new CustomEvent('removeCola', {
                            detail: { preguntaId: preguntaId },
                        })
                    );
                    if (!this.listTarget.hasCola()) {
                        this.setActiveAtras(true);
                    }
                }
                addPreguntaCookie(this.username, pregunta);
            })
            .catch((error) => {
                if (this.listTarget) {
                    this.listTarget.container.dispatchEvent(
                        new CustomEvent('removeCola', {
                            detail: { preguntaId: preguntaId },
                        })
                    );
                    this.listTarget.container.dispatchEvent(
                        new CustomEvent('addErrores', {
                            detail: { preguntaId: preguntaId },
                        })
                    );
                }
                console.error('Error al guardar la pregunta:', error);
            });
    }

    addListeners() {
        this.container.addEventListener('change', (e) => {
            switch (e.target.id) {
                case 'pregunta':
                    this.preguntaVal = e.target.value;
                    break;
                case 'puntuacion':
                    this.puntuacionVal = e.target.value;
                    break;
                case 'verdadero':
                    this.respuestaVal = e.target.value;
                    break;
                case 'falso':
                    this.respuestaVal = e.target.value;
                    break;
                default:
                    break;
            }

            if (this.preguntaVal && this.respuestaVal && this.puntuacionVal) {
                this.setActiveGuardar(true);
            } else {
                this.setActiveGuardar(false);
            }
        });
    }
}
