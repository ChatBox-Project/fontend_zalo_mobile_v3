import axios from "axios";

const register = "http://localhost:3333/api/auth/register"
const login = "http://localhost:3333/api/auth/login"

async function Register(account) {
    await axios.post(register, account)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { Register }