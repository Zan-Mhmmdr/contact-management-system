type dataContact = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

type contactListData = {
    name: string;
    phone: string;
    email: string;
    page: number;
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

export const contactList = async (token: any, contact: contactListData) => {
    const url = new URL(`${import.meta.env.VITE_API_PATH}/contacts`);

    if (name) url.searchParams.append('name', contact.name)
    if (phone) url.searchParams.append('phone', contact.phone)
    if (email) url.searchParams.append('email', contact.email)
    if (page) url.searchParams.append('page', contact.page.toString())

    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    }
    )
}