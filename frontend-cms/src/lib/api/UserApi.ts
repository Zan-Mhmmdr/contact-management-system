const userRegister = async (user: { username: string, name: string, password: string }) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}`, {
        headers: {
            'content-type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(user),
    })

}

export default userRegister; 