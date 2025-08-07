import { useState } from "react";
import { Link, useParams } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { contactDetail } from "../../lib/api/ContactApi";
import { addressesCreate } from "../../lib/api/AddressesApi";
import { alertError, alertSuccess } from "../../lib/alert";

interface Contact {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  [key: string]: any;
}

const AddressCreate = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact>({});
  const [token] = useLocalStorage("token");

  const [form, setForm] = useState({
    street: "",
    city: "",
    province: "",
    country: "",
    postal_code: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm({
      street: "",
      city: "",
      province: "",
      country: "",
      postal_code: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await addressesCreate(token, id, form);
      const responseBody = await response.json();

      if (response.ok) {
        resetForm();
        await alertSuccess("Address updated successfully!");
      } else {
        await alertError(responseBody.errors || "Failed to update address.");
      }
    } catch (error) {
      await alertError("An unexpected error occurred.");
      console.error(error);
    }
  };

  const fetchContact = async () => {
    try {
      const response = await contactDetail(token, id);
      const responseBody = await response.json();

      if (response.ok && responseBody?.data) {
        setContact(responseBody.data);
      } else {
        await alertError(
          responseBody?.errors || ["Failed to fetch contact details."]
        );
      }
    } catch (error) {
      console.error("Fetch contact failed:", error);
      await alertError("An unexpected error occurred while fetching contact.");
    }
  };

  useEffectOnce(() => {
    fetchContact();
  });

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link
          to={`/dashboard/contacts/${id}`}
          className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
        >
          <i className="fas fa-arrow-left mr-2" /> Back to Contact Details
        </Link>
        <h1 className="text-2xl font-bold text-white flex items-center">
          <i className="fas fa-plus-circle text-blue-400 mr-3" /> Add New
          Address
        </h1>
      </div>
      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
        <div className="p-8">
          <div className="mb-6 pb-6 border-b border-gray-700">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md">
                <i className="fas fa-user text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {contact?.first_name} {contact?.last_name}
                </h2>
                <p className="text-gray-300 text-sm">
                  {contact?.email} + {contact?.phone}
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="street"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Street
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-road text-gray-500" />
                </div>
                <input
                  type="text"
                  id="street"
                  name="street"
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter street address"
                  required
                  value={form.street}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* city & province */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              {["city", "province"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-gray-300 text-sm font-medium mb-2"
                  >
                    {field === "city" ? "City" : "Province/State"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i
                        className={`fas fa-${
                          field === "city" ? "city" : "map"
                        } text-gray-500`}
                      />
                    </div>
                    <input
                      type="text"
                      id={field}
                      name={field}
                      className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder={`Enter ${field}`}
                      required
                      value={form[field as keyof typeof form]}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* country & postal_code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              {["country", "postal_code"].map((field) => (
                <div key={field}>
                  <label
                    htmlFor={field}
                    className="block text-gray-300 text-sm font-medium mb-2"
                  >
                    {field === "postal_code" ? "Postal Code" : "Country"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i
                        className={`fas fa-${
                          field === "country" ? "flag" : "mail-bulk"
                        } text-gray-500`}
                      />
                    </div>
                    <input
                      type="text"
                      id={field}
                      name={field}
                      className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder={`Enter ${field.replace("_", " ")}`}
                      required
                      value={form[field as keyof typeof form]}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <Link
                to={`/dashboard/contacts/${id}`}
                className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
              >
                <i className="fas fa-times mr-2" /> Cancel
              </Link>
              <button
                type="submit"
                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
              >
                <i className="fas fa-plus-circle mr-2" /> Add Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressCreate;
