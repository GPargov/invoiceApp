/** @format */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const RouteChangeHandler = () => {
	const location = useLocation();
	const { setLoading } = useContext(AuthContext);

	useEffect(() => {
		const handleRouteChange = () => {
			setLoading(true);
			// Simulate a delay for loading spinner visibility
			setTimeout(() => {
				setLoading(false);
			}, 1000); // Adjust delay as needed
		};

		handleRouteChange();
	}, [location, setLoading]);

	return null;
};

export default RouteChangeHandler;
