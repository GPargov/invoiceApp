/** @format */

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

function InvoiceList() {
	const [invoices, setInvoices] = useState([]);
	const { user } = useContext(AuthContext);
	const username = user.email.split("@")[0];

	useEffect(() => {
		const fetchInvoices = async () => {
			try {
				const response = await axios.get("http://localhost:3001/invoices", {
					withCredentials: true,
				});
				setInvoices(response.data);
			} catch (error) {
				console.error("Failed to fetch invoices", error);
			}
		};

		fetchInvoices();
	}, []);

	const handleExportPDF = async () => {
		try {
			const response = await axios.get("http://localhost:3001/export-pdf", {
				responseType: "blob",
				withCredentials: true,
			});
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `invoices_${username}.pdf`);
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			console.error("Error exporting PDF", error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
				<div className="relative mb-4">
					<h2 className="text-2xl text-center">Your Invoices</h2>
					<button
						onClick={handleExportPDF}
						className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition-all duration-300 text-sm">
						PDF?
					</button>
				</div>
				<ul>
					{invoices.map((invoice) => (
						<li key={invoice._id} className="mb-4">
							<img
								src={`http://localhost:3001/uploads/${invoice.filename}`}
								alt={`Invoice ${invoice._id}`}
								className="w-full h-auto rounded-lg shadow-md"
							/>
							<p className="text-gray-500 text-sm mt-2">
								Uploaded on: {new Date(invoice.uploadDate).toLocaleDateString()}
							</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default InvoiceList;
