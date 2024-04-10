const regexPhoneNumber = /^0[1-9][0-9]{8}$/
const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const regexName = /^[^\d!@#$%^&*()_+={}[\]|\\;:'",<.>\?]{6,40}$/

export {
    regexPhoneNumber,
    regexPassword,
    regexName
}