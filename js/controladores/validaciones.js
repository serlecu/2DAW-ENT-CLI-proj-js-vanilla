export function validateEmail(mail) {
    const emailRegex = /^[^\s@]+@[^\s@]+(\.[^\s@]+)+$/;
    return emailRegex.test(mail);
}