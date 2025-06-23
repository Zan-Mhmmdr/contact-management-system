type dataContact = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

export const contactCreate = async (token: any, contact: dataContact) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/contacts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({ contact })
    }
    )
}