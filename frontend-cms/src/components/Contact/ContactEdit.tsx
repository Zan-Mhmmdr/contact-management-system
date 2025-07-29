import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { contactDetail, contactUpdate } from "../../lib/api/ContactApi";
import { useEffectOnce, useLocalStorage } from "react-use";
import { alertError, alertSuccess } from "../../lib/alert";

const ContactEdit = () => {
    const { id } = useParams<{ id: string }>();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [token] = useLocalStorage('token');

    const fetchContact = async () => {
        if (!token || !id) return;

        const response = await contactDetail(token, Number(id));
        const responseBody = await response.json();

        if (response.ok) {
            const { first_name, last_name, email, phone } = responseBody.data;
            setFirstName(first_name);
            setLastName(last_name);
            setEmail(email);
            setPhone(phone);
        } else {
            await alertError(responseBody.errors);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token || !id) {
        alertError("Missing token or contact ID.");
        return;
    }

    try {
        const response = await contactUpdate(token, {
            id: Number(id),
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
        });

        const data = await response.json();

        if (response.ok) {
            alertSuccess("Contact updated successfully");
        } else {
            alertError(data.errors || "Failed to update contact.");
        }
    } catch (error) {
        console.error("Update error:", error);
        alertError("Something went wrong while updating the contact.");
    }
};


    useEffectOnce(() => {
        fetchContact();
    });

    return (
        <div>
            <div className="flex items-center mb-6">
                <Link
                    to="/dashboard/contacts"
                    className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
                >
                    <i className="fas fa-arrow-left mr-2" /> Back to Contacts
                </Link>
                <h1 className="text-2xl font-bold text-white flex items-center">
                    <i className="fas fa-user-edit text-blue-400 mr-3" /> Edit Contact
                </h1>
            </div>
            <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
                <div className="p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <InputField
                                id="first_name"
                                label="First Name"
                                icon="fas fa-user-tag"
                                value={firstName}
                                onChange={setFirstName}
                            />
                            <InputField
                                id="last_name"
                                label="Last Name"
                                icon="fas fa-user-tag"
                                value={lastName}
                                onChange={setLastName}
                            />
                        </div>
                        <InputField
                            id="email"
                            label="Email"
                            icon="fas fa-envelope"
                            value={email}
                            onChange={setEmail}
                            type="email"
                        />
                        <InputField
                            id="phone"
                            label="Phone"
                            icon="fas fa-phone"
                            value={phone}
                            onChange={setPhone}
                            type="tel"
                        />
                        <div className="flex justify-end space-x-4 mt-6">
                            <Link
                                to="/dashboard/contacts"
                                className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 flex items-center shadow-md"
                            >
                                <i className="fas fa-times mr-2" /> Cancel
                            </Link>
                            <button
                                type="submit"
                                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
                            >
                                <i className="fas fa-save mr-2" /> Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

type InputFieldProps = {
    id: string;
    label: string;
    icon: string;
    value: string;
    onChange: (val: string) => void;
    type?: string;
};

const InputField = ({ id, label, icon, value, onChange, type = 'text' }: InputFieldProps) => (
    <div className="mb-5">
        <label htmlFor={id} className="block text-gray-300 text-sm font-medium mb-2">
            {label}
        </label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className={`${icon} text-gray-500`} />
            </div>
            <input
                type={type}
                id={id}
                name={id}
                className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                placeholder={`Enter ${label.toLowerCase()}`}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required
            />
        </div>
    </div>
);

export default ContactEdit;
