/** @format */

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
	const { isAuthenticated, logout, user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const handleLogout = async () => {
		await logout();
		navigate("/login");
	};

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="bg-blue-600 p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-white font-bold text-lg">
					<Link to="/">InvoiceApp</Link>
				</div>
				<div className="hidden lg:flex flex-grow justify-center space-x-4">
					{user?.isAdmin ? (
						<Link
							to="admin"
							className="text-white px-3 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-all duration-300">
							All Invoices
						</Link>
					) : null}
					{isAuthenticated ? (
						<Link
							to="/"
							className="text-white px-3 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-all duration-300">
							Home
						</Link>
					) : null}
					{isAuthenticated ? (
						<>
							<Link
								to="/upload"
								className="text-white px-3 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-all duration-300">
								Upload
							</Link>
							<Link
								to="/invoices"
								className="text-white px-3 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-all duration-300">
								Invoices
							</Link>
						</>
					) : null}
				</div>
				<div className="lg:hidden">
					<button onClick={toggleMenu} className="text-white">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16m-7 6h7"></path>
						</svg>
					</button>
				</div>
				<div
					className={`lg:flex items-center ${
						isOpen ? "block" : "hidden"
					} transition-all duration-300 ease-in-out`}>
					{isAuthenticated ? (
						<button
							onClick={handleLogout}
							className="bg-red-500 text-white py-2 px-4 rounded lg:ml-4 hover:bg-red-700 transition-all duration-300">
							Logout
						</button>
					) : (
						<div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
							<Link
								to="/login"
								className="text-white px-3 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-all duration-300">
								Login
							</Link>
							<Link
								to="/register"
								className="text-white px-3 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-all duration-300">
								Register
							</Link>
						</div>
					)}
				</div>
			</div>
			{isAuthenticated && isOpen && (
				<div className="lg:hidden flex flex-col items-center mt-4 space-y-2">
					<Link
						to="/upload"
						className="text-white px-3 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-all duration-300">
						Upload
					</Link>
					<Link
						to="/invoices"
						className="text-white px-3 py-2 rounded-md hover:bg-blue-700 hover:text-white transition-all duration-300">
						Invoices
					</Link>
				</div>
			)}
		</nav>
	);
};

export default Navbar;
