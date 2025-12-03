export function createTabla(header, data) {
    let tabla = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');

    // Crear encabezado
    let filaHeader = document.createElement('tr');
    header.forEach(col => {
        let th = document.createElement('th');
        th.textContent = col;
        filaHeader.appendChild(th);
    });
    thead.appendChild(filaHeader);
    tabla.appendChild(thead);   

    // Crear filas de datos
    console.log(data);
    data.forEach(row => {
        let fila = document.createElement('tr');
        row.forEach(cell => {
            let td = document.createElement('td');
            td.textContent = cell;
            fila.appendChild(td);
        });
        tbody.appendChild(fila);
    });
    tabla.appendChild(tbody);
    return tabla;
}