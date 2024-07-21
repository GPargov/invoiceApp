/** @format */

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:3001/register", {
				email,
				password,
			});
			navigate("/login");
		} catch (error) {
			console.error("Registration failed", error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<form
				className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
				onSubmit={handleSubmit}>
				<h2 className="text-2xl mb-4 text-center">Register</h2>
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
					Register
				</button>
				<p className="text-center mt-4">
					Already have an account?{" "}
					<Link to="/login" className="text-blue-500">
						Login
					</Link>
				</p>
			</form>
		</div>
	);
}

export default Register;
