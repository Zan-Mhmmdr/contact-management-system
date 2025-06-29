type dataContact = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

type contactListData = {
    name?: string;
    phone?: string;
    email?: string;
    page?: number;
};


export const contactCreate = async (token: any, contact: dataContact) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/contacts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(contact)
    }
    )
}

export const contactList = async (token: any, contact: contactListData) => {
    const url = new URL(`${import.meta.env.VITE_API_PATH}/contacts`);

    if (contact.name) url.searchParams.append('name', contact.name);
    if (contact.phone) url.searchParams.append('phone', contact.phone);
    if (contact.email) url.searchParams.append('email', contact.email);
    if (contact.page) url.searchParams.append('page', contact.page.toString());

    return await fetch(url.toString(), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    });
};

export const contactDelete = async (token: any, contactId: number) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}