/** @format */

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, loading } = useContext(AuthContext);

	if (loading) {
		return <Spinner />;
	}

	return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
