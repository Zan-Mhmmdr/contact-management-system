import { useState } from "react";
import { alertError, alertSuccess } from "../../lib/alert";
import { userRegister } from "../../lib/api/UserApi";
import { Link, useNavigate } from "react-router";
import InputWithIcon from "../common/InputWithIcon";

const UserRegister = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      await alertError("Passwords do not match. Please try again.");
    }

    const userDataInput = {
      username,
      name,
      password,
    };

    const response = await userRegister(userDataInput);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("Registration successful! You can now log in.");
      await navigate({
        pathname: "/login",
      });
    } else {
      await alertError(responseBody.errors);
    }
  };

  return (
    <div className="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-gradient rounded-full mb-4">
          <i className="fas fa-user-plus text-3xl text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">Contact Management</h1>
        <p className="text-gray-300 mt-2">Create a new account</p>
      </div>
      <form onSubmit={handleSubmit}>
        <InputWithIcon
          id="username"
          name="username"
          label="Username"
          iconClass="fas fa-user"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <InputWithIcon
          type="text"
          id="name"
          label="Full Name"
          placeholder="Enter your full name"
          iconClass="fas fa-id-card "
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
        <InputWithIcon
          id="password"
          label="Password"
          name="password"
          iconClass="fas fa-lock"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Create a password"
          type="password"
          required
        />
        <InputWithIcon
          wrapperClassname="mb-6"
          iconClass="fas fa-check-double"
          id="confirm_password"
          label="Confirm Password"
          type="password"
          name="confirm_password"
          placeholder="Confirm your password"
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="mb-6">
          <button
            type="submit"
            className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
          >
            <i className="fas fa-user-plus mr-2" /> Register
          </button>
        </div>
        <div className="text-center text-sm text-gray-400">
          Already have an account?
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
          >
            {" "}
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UserRegister;
