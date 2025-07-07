type Address = {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
}


export const addressesCreate = async (token: any, id: any, Address: Address) => {
    return fetch(`${import.meta.env.VITE_API_URL}/contacts/${id}/addresses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
        },

        body: JSON.stringify({
            Address
        })
    })
}


export const addressesList = async (token: any, id: any) => {
    return fetch(`${import.meta.env.VITE_API_URL}/contacts/${id}/addresses`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': token,
        }
    })
}