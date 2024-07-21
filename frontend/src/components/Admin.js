/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get("http://localhost:3001/admin/users", {
					withCredentials: true,
				});
				setUsers(response.data);
			} catch (error) {
				console.error("Failed to fetch users", error);
			}
		};

		fetchUsers();
	}, []);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
				<h2 className="text-2xl mb-4 text-center">
					All Users and Their Invoices
				</h2>
				{users.map((user) => (
					<div key={user._id} className="mb-4">
						<h3 className="text-xl">{user.email}</h3>
						<ul>
							{user.invoices.map((invoice) => (
								<li key={invoice._id} className="mb-2">
									<img
										src={`http://localhost:3001/uploads/${invoice.filename}`}
										alt={`Invoice ${invoice._id}`}
										className="w-full h-auto rounded-lg shadow-md"
									/>
									<p className="text-gray-500 text-sm mt-2">
										Uploaded on:{" "}
										{new Date(invoice.uploadDate).toLocaleDateString()}
									</p>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};

export default Admin;
