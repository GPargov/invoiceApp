/** @format */

import React, { useContext } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Upload from "./components/Upload";
import InvoiceList from "./components/InvoiceList";
import Home from "./components/Home";
import Admin from "./components/Admin";
import { AuthContext } from "./contexts/AuthContext";
import RouteChangeHandler from "./components/RouteChangeHandler";
import Spinner from "./components/Spinner";
import Navbar from "./components/Navbar";

function App() {
	const { loading, isAuthenticated, user } = useContext(AuthContext);

	return (
		<Router>
			<RouteChangeHandler />
			{loading && <Spinner />}
			<Navbar />
			<div className="container mx-auto p-4">
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					{isAuthenticated ? (
						<>
							<Route path="/" element={<Home />} />
							<Route path="/upload" element={<Upload />} />
							<Route path="/invoices" element={<InvoiceList />} />
							{user?.isAdmin && <Route path="/admin" element={<Admin />} />}
						</>
					) : (
						<Route path="*" element={<Navigate to="/login" />} />
					)}
				</Routes>
			</div>
		</Router>
	);
}

export default App;
