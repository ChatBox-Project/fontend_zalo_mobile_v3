const regexPhoneNumber = /^0[1-9][0-9]{8}$/
const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const regexName = /^[^\d!@#$%^&*()_+={}[\]|\\;:'",<.>\?]{6,40}$/
const regexEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/

export {
    regexPhoneNumber,
    regexPassword,
    regexName,
    regexEmail
}