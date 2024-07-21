/** @format */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const createAdmin = async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/invoice-app", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		const email = "admin@example.com";
		const username = "admin";
		const password = "adminpassword";
		const hashedPassword = await bcrypt.hash(password, 10);

		const admin = new User({
			email,
			username,
			password: hashedPassword,
			isAdmin: true,
		});
		await admin.save();

		console.log("Admin user created");
		mongoose.connection.close();
	} catch (err) {
		console.error(err);
	}
};

createAdmin();
