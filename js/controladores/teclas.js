export class controllerTeclas {
    constructor() {
        if (!controllerTeclas.instancia) {
            controllerTeclas.instancia = this;
            this.teclas = new Set();
        }
        return controllerTeclas.instancia;
    }

    anyadir(tecla) {
        this.teclas.add(tecla.toLowerCase());
    }

    eliminar(tecla) {
        this.teclas.delete(tecla.toLowerCase());
    }

    tiene(tecla) {
        return this.teclas.has(tecla.toLowerCase());
    }

    toString() {
        return [...this.teclas].toString();
    }
}