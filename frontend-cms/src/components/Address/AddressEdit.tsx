import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { alertError, alertSuccess } from "../../lib/alert";
import { contactDetail } from "../../lib/api/ContactApi";
import { addressesDetail, addressUpdate } from "../../lib/api/AddressesApi";
import InputWithIcon from "../common/InputWithIcon";

const AddressEdit = () => {
  const { id, addressId } = useParams();
  const [contact, setContact] = useState<any>({});
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [token, _] = useLocalStorage("token");
  const navigate = useNavigate();

const updatedAddressData = {
  id: addressId,
  street,
  city,
  province,
  postal_code: Number(postal_code),
  country,
};


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await addressUpdate(token, id, updatedAddressData);
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.ok) {
        // Clear form fields
        setStreet("");
        setCity("");
        setProvince("");
        setCountry("");
        setPostalCode("");

        await alertSuccess("Address created successfully!");

        // No need to await navigation unless it’s a custom async function
        navigate(`/dashboard/contacts/${id}`);
        
      } else {
        const errorMessage = responseBody?.errors || "Something went wrong.";
        await alertError(errorMessage);
      }
    } catch (error: any) {
      console.error("Submission failed:", error);
      await alertError("An unexpected error occurred. Please try again.");
    }
  };

  const fetchContact = async () => {
    try {
      const response = await contactDetail(token, id);
      const responseBody = await response.json();
      console.log(responseBody);

      if (response.ok) {
        setContact(responseBody.data);
      } else {
        await alertError(
          responseBody.errors || "An error occurred while fetching contact."
        );
      }
    } catch (error) {
      console.error("Fetch error:", error);
      await alertError("Network or server error. Please try again later.");
    }
  };

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
  };

  useEffectOnce(() => {
    fetchContact().then(() => {
      console.log("Edit Address fetched successfully");
    });

    fetchAddress().then(() => {
      console.log("Address fetched successfully");
    });
  });

  return (
    <>
      <div>
        <div className="flex items-center mb-6">
          <Link
            to={`/dashboard/contacts/${id}`}
            className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
          >
            <i className="fas fa-arrow-left mr-2" /> Back to Contact Details
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <i className="fas fa-map-marker-alt text-blue-400 mr-3" /> Edit
            Address
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
                  <h2 className="text-xl font-semibold text-white">
                    {contact.first_name} {contact.last_name}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    {contact.email} * {contact.phone}
                  </p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <InputWithIcon
                wrapperClassname="mb-5"
                label="Street"
                iconClass="fas fa-road"
                name="street"
                placeholder="Enter street address"
                required
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                id="street"
                type="text"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <InputWithIcon
                  wrapperClassname=""
                  label="City"
                  id="city"
                  iconClass="fas fa-city"
                  name="city"
                  placeholder="Enter city"
                  required
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />

                <InputWithIcon
                  wrapperClassname=""
                  id="province"
                  label="Province/State"
                  iconClass="fas fa-map"
                  type="text"
                  name="province"
                  placeholder="Enter province or state"
                  required
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <InputWithIcon
                  wrapperClassname=""
                  id="country"
                  label="Country"
                  iconClass="fas fa-flag"
                  type="text"
                  name="country"
                  placeholder="Enter country"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <InputWithIcon
                  wrapperClassname=""
                  id="postal_code"
                  label="Postal Code"
                  iconClass="fas fa-mail-bulk"
                  type="text"
                  name="postal_code"
                  placeholder="Enter postal code"
                  required
                  value={postal_code}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
             
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
                  <i className="fas fa-save mr-2" /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressEdit;
