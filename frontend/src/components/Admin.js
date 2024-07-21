/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.get("http://localhost:3001/admin/users", {
					headers: { Authorization: `Bearer ${token}` },
				});
				setUsers(response.data);
			} catch (error) {
				console.error("Failed to fetch users and invoices", error);
			}
		};

		fetchUsers();
	}, []);

	const handleDownload = async (invoiceId) => {
		try {
			const token = localStorage.getItem("token");
			const response = await axios.get(
				`http://localhost:3001/invoices/${invoiceId}/download`,
				{
					headers: { Authorization: `Bearer ${token}` },
					responseType: "blob",
				}
			);
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", `invoice-${invoiceId}.pdf`);
			document.body.appendChild(link);
			link.click();
		} catch (error) {
			console.error("Failed to download invoice", error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
				<h2 className="text-2xl mb-4 text-center">Admin Dashboard</h2>
				{users.length === 0 ? (
					<p className="text-center text-gray-500">No users found.</p>
				) : (
					<table className="min-w-full bg-white">
						<thead>
							<tr>
								<th className="py-2 px-4 border-b border-gray-200">
									User Email
								</th>
								<th className="py-2 px-4 border-b border-gray-200">Invoices</th>
								<th className="py-2 px-4 border-b border-gray-200">Actions</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user._id}>
									<td className="py-2 px-4 border-b border-gray-200">
										{user.email}
									</td>
									<td className="py-2 px-4 border-b border-gray-200">
										<ul>
											{user.invoices.map((invoice) => (
												<li
													key={invoice._id}
													className="flex justify-between items-center py-1">
													<span>{invoice.filename}</span>
													<button
														onClick={() => handleDownload(invoice._id)}
														className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700">
														Download
													</button>
												</li>
											))}
										</ul>
									</td>
									<td className="py-2 px-4 border-b border-gray-200">
										<button
											onClick={() => console.log(`Delete user ${user._id}`)}
											className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 ml-2">
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default Admin;
