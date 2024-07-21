/** @format */

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Upload() {
	const [file, setFile] = useState(null);
	const navigate = useNavigate();

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		if (
			selectedFile &&
			(selectedFile.type === "image/png" ||
				selectedFile.type === "image/jpeg" ||
				selectedFile.type === "image/jpg")
		) {
			setFile(selectedFile);
		} else {
			e.target.value = null; // Clear the selected file
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!file) {
			alert("Please select a file to upload");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await axios.post(
				"http://localhost:3001/upload",
				formData,
				{
					withCredentials: true,
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			console.log("Upload response:", response);
			alert("File uploaded successfully");
			navigate("/invoices");
		} catch (error) {
			console.error("Upload failed", error);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<form
				className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
				onSubmit={handleSubmit}>
				<h2 className="text-2xl mb-4 text-center">Upload Invoice</h2>
				<input
					type="file"
					accept=".png, .jpeg, .jpg"
					onChange={handleFileChange}
					className="mb-4 p-2 border rounded w-full"
					required
				/>
				<button
					type="submit"
					className="bg-blue-500 text-white py-2 px-4 rounded w-full">
					Upload
				</button>
			</form>
		</div>
	);
}

export default Upload;
