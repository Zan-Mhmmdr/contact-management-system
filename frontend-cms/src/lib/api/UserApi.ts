export const userRegister = async (user: { username: string, name: string, password: string }) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(user),
    })
}

export const userLogin = async (user: { username: string, password: string }) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/users/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(user),
    })
}

export const userDetail = async (token: any) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': token,
        },
    })
}

export const userUpdateProfile = async (token: any, username: string) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(username),
    })
}

export const userUpdatePassword = async (token: any, password: string) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/users/current`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(password),
    })
}
