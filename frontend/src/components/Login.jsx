/** @format */

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { setIsAuthenticated, setUser } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:3001/login",
				{
					username: email,
					password,
				},
				{ withCredentials: true }
			);
			console.log("Login response:", response);
			setIsAuthenticated(true);
			setUser(response.data.user); //includes user data
			navigate("/invoices");
		} catch (error) {
			console.error("Login failed", error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<form
				className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
				onSubmit={handleSubmit}>
				<h2 className="text-2xl mb-4 text-center">Login</h2>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email"
					className="mb-4 p-2 border rounded w-full"
					required
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
					className="mb-4 p-2 border rounded w-full"
					required
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white py-2 px-4 rounded w-full">
					Login
				</button>
				<p className="text-center mt-4">
					Don't have an account?{" "}
					<Link to="/register" className="text-blue-500">
						Register
					</Link>
				</p>
			</form>
		</div>
	);
}

export default Login;
