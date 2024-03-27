
const url = 'https://66038c222393662c31cf2aed.mockapi.io/api/v1/account';

async function createAccount(account) {
    try {
        const rep = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        })
        return rep
    } catch (error) {
        console.log(error)
    }
}

async function getAccounts() {
    try {
        const response = await fetch(url, {
            method: "GET"
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

async function updateNameAccount(accountId, name) {
    try {
        const rep = await fetch(url + `/${accountId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profile: {
                    name
                }
            }),
        })

        return rep
    } catch (error) {
        console.log(error)
    }
}

async function updateSexAnhBirthday(accountId, sex, birthday) {
    try {
        const rep = await fetch(url + `/${accountId}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profile: {
                    sex,
                    birthday
                }
            }),
        })

        return rep
    } catch (error) {
        console.log(error)
    }
}

async function updateAccountInformation(account) {
    try {
        const rep = await fetch(url + `/${account.id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(account),
        })

        return rep
    } catch (error) {
        console.log(error)
    }
}

export { createAccount, getAccounts, updateNameAccount, updateAccountInformation }