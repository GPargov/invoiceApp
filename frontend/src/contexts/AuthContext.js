/** @format */

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			setLoading(true);
			try {
				const response = await axios.get("http://localhost:3001/auth-check", {
					withCredentials: true,
				});
				if (response.data.authenticated) {
					setIsAuthenticated(true);
					setUser(response.data.user);
				}
			} catch (error) {
				console.error("Failed to check authentication", error);
			} finally {
				setLoading(false);
			}
		};

		checkAuth();
	}, []);

	const logout = async () => {
		try {
			const response = await axios.post(
				"http://localhost:3001/logout",
				{},
				{ withCredentials: true }
			);
			console.log("Logout response:", response);
			setIsAuthenticated(false);
			setUser(null);
		} catch (error) {
			console.error("Logout failed", error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				user,
				setUser,
				loading,
				setLoading,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};
