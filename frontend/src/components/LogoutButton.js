/** @format */

import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
	const { logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	return (
		<button
			onClick={handleLogout}
			className="bg-red-500 text-white py-2 px-4 rounded">
			Logout
		</button>
	);
};

export default LogoutButton;
