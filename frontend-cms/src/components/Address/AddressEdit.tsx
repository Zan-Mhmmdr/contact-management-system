import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router"
import { useEffectOnce, useLocalStorage } from "react-use";
import { alertError, alertSuccess } from "../../lib/alert";
import { contactDetail } from "../../lib/api/ContactApi";
import { addressesDetail, addressUpdate } from "../../lib/api/AddressesApi";

const AddressEdit = () => {

    const { id, addressId } = useParams()
    const [contact, setContact] = useState<any>({});
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');
    const [postal_code, setPostalCode] = useState('');
    const [token, _] = useLocalStorage('token');
    const navigate = useNavigate()

    const AddressUpdate = {
        id: addressId,
        street,
        city,
        province,
        postal_code: Number(postal_code),
        country,
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await addressUpdate(token, id, AddressUpdate)
        const responseBody = await response.json();
        console.log(responseBody);

        if (response.status === 200) {
            setStreet('');
            setCity('');
            setProvince('');
            setCountry('');
            setPostalCode('');
            await alertSuccess('Address created successfully!');
            await navigate({
                pathname: `/dashboard/contacts/${id}`,
            })

        } else {
            await alertError(responseBody.errors)
        }
    }

    const fetchContact = async () => {
        const response = await contactDetail(token, id);
        const responseBody = await response.json();
        console.log(responseBody);

        if (response.status === 200) {
            setContact(responseBody.data);
        } else {
            await alertError(responseBody.errors);
        }
    }

    const fetchAddress = async () => {
        const response = await addressesDetail(token, id, addressId);
        const responseBody = await response.json();
        console.log(responseBody);


        if (response.status === 200) {
            setStreet(responseBody.data.street);
            setCity(responseBody.data.city);
            setProvince(responseBody.data.province);
            setCountry(responseBody.data.country);
            setPostalCode(responseBody.data.postal_code);
        } else {
            await alertError(responseBody.errors);
        }
    }

    useEffectOnce(() => {
        fetchContact()
            .then(() => {
                console.log('Edit Address fetched successfully');
            })

        fetchAddress()
            .then(() => {
                console.log('Address fetched successfully');
            })
    })

    return (
        <>
            <div>
                <div className="flex items-center mb-6">
                    <Link to={`/dashboard/contacts/${id}`} className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
                        <i className="fas fa-arrow-left mr-2" /> Back to Contact Details
                    </Link>
                    <h1 className="text-2xl font-bold text-white flex items-center">
                        <i className="fas fa-map-marker-alt text-blue-400 mr-3" /> Edit Address
                    </h1>
                </div>
                <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
                    <div className="p-8">
                        {/* Contact Information */}
                        <div className="mb-6 pb-6 border-b border-gray-700">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md">
                                    <i className="fas fa-user text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-white">{contact.first_name} {contact.last_name}</h2>
                                    <p className="text-gray-300 text-sm">{contact.email} * {contact.phone}</p>
                                </div>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label htmlFor="street" className="block text-gray-300 text-sm font-medium mb-2">Street</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-road text-gray-500" />
                                    </div>
                                    <input type="text" id="street" name="street" className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter street address" defaultValue="123 Main St" required value={street} onChange={(e) => setStreet(e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label htmlFor="city" className="block text-gray-300 text-sm font-medium mb-2">City</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className="fas fa-city text-gray-500" />
                                        </div>
                                        <input type="text" id="city" name="city" className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter city" defaultValue="New York" required value={city} onChange={(e) => setCity(e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="province" className="block text-gray-300 text-sm font-medium mb-2">Province/State</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className="fas fa-map text-gray-500" />
                                        </div>
                                        <input type="text" id="province" name="province" className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter province or state" defaultValue="NY" required value={province} onChange={(e) => setProvince(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                                <div>
                                    <label htmlFor="country" className="block text-gray-300 text-sm font-medium mb-2">Country</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className="fas fa-flag text-gray-500" />
                                        </div>
                                        <input type="text" id="country" name="country" className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter country" defaultValue="USA" required value={country} onChange={(e) => setCountry(e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="postal_code" className="block text-gray-300 text-sm font-medium mb-2">Postal Code</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className="fas fa-mail-bulk text-gray-500" />
                                        </div>
                                        <input type="text" id="postal_code" name="postal_code" className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" placeholder="Enter postal code" defaultValue={10001} required value={postal_code} onChange={(e) => setPostalCode(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <Link to={`/dashboard/contacts/${id}`} className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md">
                                    <i className="fas fa-times mr-2" /> Cancel
                                </Link>
                                <button type="submit" className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
                                    <i className="fas fa-save mr-2" /> Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddressEdit