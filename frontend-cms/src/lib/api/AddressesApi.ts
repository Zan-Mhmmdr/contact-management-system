type AddressCreate = {
    street: string;
    city: string;
    province: string;
    postal_code: string;
    country: string;
}

type AddressUpdate = {
    id: string;
    street?: string;
    city?: string;
    province?: string;
    postal_code?: string;
    country?: string;
}

// [POST] Create a new address for a contact
export const addressesCreate = async (token: any, id: any, Address: AddressCreate) => {
    return fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(Address)
    })
}

// [GET] List all addresses for a contact
export const addressesList = async (token: any, id: any) => {
    return fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
        }
    })
}

// [GET] Get detail of a specific address by ID
export const addressesDetail = async (token: any, id: any, addressId: any) => {
    return fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses/${addressId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
        }
    })
}

// [PUT] Update a specific address of a contact
export const addressUpdate = async (token: any, id: any, AddressUpdate: AddressUpdate) => {
    return fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses/${AddressUpdate.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
        },
        body: JSON.stringify(addressUpdate)
    })
}

// [DELETE] Delete a specific address from a contact
export const addressDelete = async (token: any, id: any, addressId: any) => {
    return fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses/${addressId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
        }
    })
}
