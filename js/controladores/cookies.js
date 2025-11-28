function setCookie(cname, cvalue, exdays) {
    // `userData=${userDataJSON}; max-age=${7 * 24 * 60 * 60}; path=/`
    let expires = "max-age="+ (exdays*24*60*60);
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return null;
}

function deleteCookie(cname) {
    document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const defUsuarioCookie =  {
    // id: 1,
    username: "john_doe",
    created_at: null,
    last_login: null,
    preferences: {
        theme: "dark",
        language: "en",
    },
};

export function addUsuarioCookie(username) {
    setCookie(
        username,
        JSON.stringify({
            ...defUsuarioCookie,
            username: username,
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
        }),
        7
    );
}

export function deleteUsuarioCookie(username) {
    deleteCookie(username);
}

export function getUsuarioCookie(username) {
    let data = getCookie(username);
    if (data) {
        updateUsuarioCookie(username); // solo actualizar fecha de expiración
        return JSON.parse(data);
    } else {
        return null;
    }
}

export function updateUsuarioCookie(username, atributos = {}) {
    let data = getCookie(username);
    data = { ...data, ...atributos };
    setCookie(username, JSON.stringify(data), 7); 
}

export function hasUsuarioCookie(username) {
    return getCookie(username) === null ? false : true;
}