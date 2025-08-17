import { useState } from "react";
import {
  userDetail,
  userUpdatePassword,
  userUpdateProfile,
} from "../../lib/api/UserApi";
import { useLocalStorage, useEffectOnce } from "react-use";
import { alertError, alertSuccess } from "../../lib/alert";
import InputWithIcon from "../common/InputWithIcon";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, _] = useLocalStorage("token", "");

  const fetchUserDetail = async () => {
    const response = await userDetail(token);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setName(responseBody.data.name);
    } else {
      await alertError(responseBody.errors);
    }
  };

  useEffectOnce(() => {
    fetchUserDetail().then(() => {
      console.log("User details fetched successfully");
    });
  });

  const handleSubmitProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await userUpdateProfile(token, name);

    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("Password updated successfully");
    } else {
      await alertError(responseBody.errors);
    }
  };

  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      await alertError("Passwords do not match");
      return;
    }

    const response = await userUpdatePassword(token, password);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setPassword("");
      setConfirmPassword("");
      await alertSuccess("Password updated successfully");
    } else {
      await alertError(responseBody.errors);
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center mb-6">
          <i className="fas fa-user-cog text-blue-400 text-2xl mr-3" />
          <h1 className="text-2xl font-bold text-white">My Profile</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form 1: Edit Name */}
          <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                  <i className="fas fa-user-edit text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Edit Profile
                </h2>
              </div>
              <form onSubmit={handleSubmitProfile}>
                <InputWithIcon
                  wrapperClassname="mb-5"
                  id="name"
                  label="Username"
                  iconClass="fas fa-user"
                  name="username"
                  placeholder="Enter your full name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    <i className="fas fa-save mr-2" /> Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Form 2: Edit Password */}
          <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                  <i className="fas fa-key text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Change Password
                </h2>
              </div>
              <form onSubmit={handleSubmitPassword}>
                <InputWithIcon
                  wrapperClassname="mb-5"
                  id="new_password"
                  label="New Password"
                  iconClass="fas fa-lock"
                  type="password"
                  name="new_password"
                  placeholder="Enter your new password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <InputWithIcon
                  wrapperClassname="mb-5"
                  iconClass="fas fa-check-double"
                  id="confirm_password"
                  label="Confirm Password"
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm your new password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    <i className="fas fa-key mr-2" /> Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
