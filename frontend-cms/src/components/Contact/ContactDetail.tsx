import { useState } from "react";
import { Link, useParams } from "react-router";
import { contactDetail } from "../../lib/api/ContactApi";
import { useEffectOnce, useLocalStorage } from "react-use";
import { alertConfirm, alertError } from "../../lib/alert";
import { addressDelete, addressesList } from "../../lib/api/AddressesApi";

const ContactDetail = () => {
  const { id } = useParams();
  const [contact, setContact] = useState<any>({});
  const [token] = useLocalStorage("token");
  const [addresses, setAddresses] = useState<any[]>([]);

  const fetchContact = async () => {
    const response = await contactDetail(token, id);
    const responseBody = await response.json();
    if (response.status === 200) {
      setContact(responseBody.data);
    } else {
      await alertError(responseBody.errors);
    }
  };

const fetchAddress = async () => {
  try {
    const response = await addressesList(token, id);
    const data = await response.json();

    if (response.ok) {
      setAddresses(data.data || []);
    } else {
      alertError(data.errors || "Failed to fetch addresses.");
    }
  } catch (error) {
    console.error("Error fetching addresses:", error);
    alertError("An unexpected error occurred while fetching addresses.");
  }
};


  const handleDeleteAddress = async (addressId: string) => {
    try {
      const confirmed = await alertConfirm(
        "Are you sure you want to delete this address?"
      );
      if (!confirmed) return;

      const response = await addressDelete(token, id, addressId);
      const data = await response.json();

      if (response.ok) {
        alertConfirm("Address deleted successfully"); // Consider using alertSuccess here
        fetchAddress();
      } else {
        alertError(data.errors || "Failed to delete address.");
      }
    } catch (error) {
      console.error("Delete address error:", error);
      alertError("An unexpected error occurred while deleting the address.");
    }
  };

  // 🟡 Correct usage of hook at top level
  useEffectOnce(() => {
    fetchContact().then(() => {
      console.log("Contact fetched successfully");
    });
    fetchAddress().then(() => {
      console.log("Address fetched successfully");
    });
  });

  return (
    <>
      <div>
        {/* Header */}
        <div className="flex items-center mb-6">
          <Link
            to="/dashboard/contacts"
            className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
          >
            <i className="fas fa-arrow-left mr-2" /> Back to Contacts
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center">
            <i className="fas fa-id-card text-blue-400 mr-3" /> Contact Details
          </h1>
        </div>

        {/* Main Container */}
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
          <div className="p-8">
            {/* Contact Header */}
            <div className="mb-8 text-center">
              <div className="w-20 h-20 bg-gradient rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
                <i className="fas fa-user text-3xl text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {contact.first_name} {contact.last_name}
              </h2>
              <div className="w-24 h-1 bg-gradient mx-auto rounded-full" />
            </div>

            {/* Contact Information */}
            <div className="space-y-5 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {["first_name", "last_name"].map((field) => (
                  <div
                    key={field}
                    className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 hover:bg-opacity-70"
                  >
                    <div className="flex items-center mb-2">
                      <i className="fas fa-user-tag text-blue-400 mr-2" />
                      <h3 className="text-gray-300 text-sm font-medium">
                        {field === "first_name" ? "First Name" : "Last Name"}
                      </h3>
                    </div>
                    <p className="text-white text-lg ml-6">{contact[field]}</p>
                  </div>
                ))}
              </div>
              {["email", "phone"].map((field, i) => (
                <div
                  key={field}
                  className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 hover:bg-opacity-70"
                >
                  <div className="flex items-center mb-2">
                    <i
                      className={`fas ${
                        i === 0 ? "fa-envelope" : "fa-phone"
                      } text-blue-400 mr-2`}
                    />
                    <h3 className="text-gray-300 text-sm font-medium">
                      {field === "email" ? "Email" : "Phone"}
                    </h3>
                  </div>
                  <p className="text-white text-lg ml-6">{contact[field]}</p>
                </div>
              ))}
            </div>

            {/* Address Section */}
            <div className="mb-8">
              <div className="flex items-center mb-5">
                <i className="fas fa-map-marker-alt text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Addresses</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Add Address Card */}
                <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg border-2 border-dashed border-gray-600 shadow-md card-hover">
                  <Link
                    to={`/dashboard/contacts/${id}/addresses/create`}
                    className="block h-full"
                  >
                    <div className="flex flex-col items-center justify-center h-full text-center py-4">
                      <div className="w-16 h-16 bg-gradient rounded-full flex items-center justify-center mb-4 shadow-lg hover:scale-110 transition-transform">
                        <i className="fas fa-plus text-2xl text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-white">
                        Add Address
                      </h4>
                    </div>
                  </Link>
                </div>

                {/* Address Cards */}
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 card-hover"
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                        <i className="fas fa-home text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-white">
                        Home Address
                      </h4>
                    </div>

                    <div className="space-y-3 text-gray-300 ml-2 mb-4">
                      {[
                        {
                          label: "Street",
                          value: address.street,
                          icon: "fa-road",
                        },
                        { label: "City", value: address.city, icon: "fa-city" },
                        {
                          label: "Province",
                          value: address.province,
                          icon: "fa-map",
                        },
                        {
                          label: "Country",
                          value: address.country,
                          icon: "fa-flag",
                        },
                        {
                          label: "Postal Code",
                          value: address.postal_code,
                          icon: "fa-mailbox",
                        },
                      ].map(({ label, value, icon }) => (
                        <p className="flex items-center" key={label}>
                          <i className={`fas ${icon} text-gray-500 w-6`} />
                          <span className="font-medium w-24">{label}:</span>
                          <span>{value}</span>
                        </p>
                      ))}
                    </div>

                    <div className="flex justify-end space-x-3">
                      <Link
                        to={`/dashboard/contacts/${contact.id}/addresses/${address.id}/edit`}
                        className="px-4 py-2 bg-gradient text-white rounded-lg"
                      >
                        <i className="fas fa-edit mr-2" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 font-medium shadow-md flex items-center"
                      >
                        <i className="fas fa-trash-alt mr-2" /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Link
                to="/dashboard/contacts"
                className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 shadow-md flex items-center"
              >
                <i className="fas fa-arrow-left mr-2" /> Back
              </Link>
              <Link
                to={`/dashboard/contacts/${id}/edit`}
                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
              >
                <i className="fas fa-user-edit mr-2" /> Edit Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDetail;
