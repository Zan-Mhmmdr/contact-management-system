import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { contactCreate } from "../../lib/api/ContactApi";
import { useLocalStorage } from "react-use";
import { alertError, alertSuccess } from "../../lib/alert";
import InputWithIcon from "../common/InputWithIcon";
import HeaderWithIcon from "../common/HeaderWithIcon";

const ContactCreate = () => {
  const [token, _] = useLocalStorage("token");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      await alertError("You are not logged in!");
      return;
    }

    const dataContact = {
      first_name,
      last_name,
      email,
      phone,
    };

    try {
      const response = await contactCreate(token, dataContact);
      const responseBody = await response.json();

      if (response.status === 200 || response.status === 201) {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        await alertSuccess("Contact created successfully!");
        navigate("/dashboard/contacts");
      } else {
        await alertError(
          responseBody?.errors || "Failed to create contact. Please try again."
        );
      }
    } catch (err) {
      console.error(err);
      await alertError("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <div>
        <HeaderWithIcon
          backText="Contacts"
          iconClass="fas fa-user-plus"
          backTo="/dashboard/contacts"
          title="Create New Contacts"
        />
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <InputWithIcon
                  wrapperClassname=""
                  id="first_name"
                  label="First Name"
                  iconClass="fas fa-user-tag"
                  type="text"
                  name="first_name"
                  placeholder="Enter first name"
                  required
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <InputWithIcon
                  wrapperClassname=""
                  id="last_name"
                  label="Last Name"
                  iconClass="fas fa-user-tag"
                  type="text"
                  name="last_name"
                  placeholder="Enter last name"
                  required
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <InputWithIcon
                iconClass="fas fa-envelope"
                id="email"
                label="Email"
                name="email"
                placeholder="Enter email address"
                wrapperClassname="mb-5"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputWithIcon
                wrapperClassname="mb-6"
                id="phone"
                iconClass="fas fa-phone"
                label="Phone"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                name="phone"
              />

              <div className="flex justify-end space-x-4">
                <a
                  href="dashboard.html"
                  className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
                >
                  <i className="fas fa-times mr-2" /> Cancel
                </a>
                <button
                  type="submit"
                  className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
                >
                  <i className="fas fa-plus-circle mr-2" /> Create Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactCreate;
