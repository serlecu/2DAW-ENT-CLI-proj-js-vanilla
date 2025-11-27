export function esperar(tiempo, cbk, args = []) {
    let crono;
    const promise = new Promise(
        (resolve) => {
            crono = setTimeout(() =>{
                cbk(...args);
                resolve();
            }, tiempo);
        });
    
    promise.stop = () => {
        if(crono){
            clearTimeout(crono);
            cbk(...args);
            crono = null;
        }
        return promise;
    };

    return promise;
}