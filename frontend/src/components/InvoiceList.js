/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

function InvoiceList() {
	const [invoices, setInvoices] = useState([]);

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

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
				<h2 className="text-2xl mb-4 text-center">Your Invoices</h2>
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
