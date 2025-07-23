type dataContact = {
    id?: number
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

// [POST] Create a new contact
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

// [PUT] Update an existing contact
export const contactUpdate = async( token: any, contact: dataContact) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${contact.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(contact)
    }
    )
}

// [GET] Retrieve list of contacts (with optional filters)
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

// [DELETE] Delete a contact by ID
export const contactDelete = async (token: any, contactId: number) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${contactId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}

// [GET] Get contact details by ID
export const contactDetail = async (token: any, contactId: number) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${contactId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}