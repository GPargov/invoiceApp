/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
				<h1 className="text-3xl font-bold mb-4 text-center">
					Welcome to InvoiceApp
				</h1>
				<p className="mb-4">
					InvoiceApp is a simple tool for managing our invoices. Follow the
					steps below:
				</p>
				<ol className="list-decimal list-inside mb-4">
					<li className="mb-2">
						<strong>Navigate</strong> to the Upload section{" "}
					</li>
					<li className="mb-2">
						<strong>Upload Invoices:</strong> Navigate to the{" "}
						<Link to="/upload" className="text-blue-500 underline">
							Upload
						</Link>{" "}
						page and use your mobile camera or file upload to add invoices.
					</li>
					<li className="mb-2">
						<strong>View Invoices:</strong> Go to the{" "}
						<Link to="/invoices" className="text-blue-500 underline">
							Invoices
						</Link>{" "}
						page to view and manage all your uploaded invoices.
					</li>
				</ol>
				{/* <div className="text-center">
					<Link
						to="/register"
						className="bg-green-500 text-white py-2 px-4 rounded mr-2 hover:bg-green-700 transition-all duration-300">
						Get Started
					</Link>
					<Link
						to="/login"
						className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-all duration-300">
						Login
					</Link>
				</div> */}
			</div>
		</div>
	);
};

export default Home;
