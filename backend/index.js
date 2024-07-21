/** @format */

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const passport = require("passport");
const session = require("express-session");
const User = require("./models/User");
const Invoice = require("./models/Invoice");
const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
require("./auth");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

// Hard-coded configuration values
const MONGO_URI = "mongodb://localhost:27017/invoice-app";
const SESSION_SECRET = "secret";

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(
	session({
		secret: SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose
	.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.log(err));

// Configure Multer storage for local file uploads
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const uploadPath = path.join(__dirname, "uploads");
		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath);
		}
		cb(null, uploadPath);
	},
	filename: (req, file, cb) => {
		const uniqueName = `${uuidv4()}-${file.originalname}`;
		cb(null, uniqueName);
	},
});
const upload = multer({ storage });

// Register a new user
app.post("/register", async (req, res) => {
	const { email, username, password, isAdmin } = req.body;
	if (!email || !username || !password) {
		return res.status(400).send("All fields are required");
	}
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = new User({ email, username, password: hashedPassword, isAdmin });
	await user.save();
	res.status(201).send("User registered");
});

// Login user
app.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) return next(err);
		if (!user) return res.status(401).json({ message: "Invalid credentials" });
		req.logIn(user, (err) => {
			if (err) return next(err);
			return res.json({
				message: "Logged in successfully",
				user: { email: user.email, isAdmin: user.isAdmin },
			});
		});
	})(req, res, next);
});

// Check if user is authenticated
app.get("/auth-check", (req, res) => {
	if (req.isAuthenticated()) {
		return res.json({
			authenticated: true,
			user: { email: req.user.email, isAdmin: req.user.isAdmin },
		});
	}
	res.json({ authenticated: false });
});

// Logout user
app.post("/logout", (req, res) => {
	req.logout((err) => {
		if (err) {
			return res.status(500).json({ message: "Logout failed" });
		}
		res.status(200).json({ message: "Logged out successfully" });
	});
});

// Upload an invoice
app.post(
	"/upload",
	isAuthenticated,
	upload.single("file"),
	async (req, res) => {
		const invoice = new Invoice({
			filename: req.file.filename,
			uploadDate: new Date(),
			userId: req.user._id,
		});
		await invoice.save();
		res.status(201).send("File uploaded");
	}
);

// Get all invoices for the authenticated user
app.get("/invoices", isAuthenticated, async (req, res) => {
	const invoices = await Invoice.find({ userId: req.user._id });
	res.json(invoices);
});

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(401).json({ message: "Unauthorized" });
}

// Middleware to check if user is admin
function checkAdmin(req, res, next) {
	if (req.isAuthenticated() && req.user.isAdmin) {
		return next();
	}
	res.status(403).json({ message: "Forbidden" });
}

// Fetch all users and their invoices (Admin only)
app.get("/admin/users", isAuthenticated, checkAdmin, async (req, res) => {
	try {
		const users = await User.find().select("-password");
		const usersWithInvoices = await Promise.all(
			users.map(async (user) => {
				const invoices = await Invoice.find({ userId: user._id });
				return { ...user.toObject(), invoices };
			})
		);
		res.json(usersWithInvoices);
	} catch (error) {
		console.error("Failed to fetch users and invoices", error);
		res.status(500).json({ message: "Internal server error" });
	}
});

// Generate PDF with all invoices
app.get("/export-pdf", isAuthenticated, async (req, res) => {
	const invoices = await Invoice.find({ userId: req.user._id });

	const doc = new PDFDocument();
	const filePath = path.join(
		__dirname,
		"exports",
		`invoices-${req.user._id}.pdf`
	);

	// Ensure the exports directory exists
	if (!fs.existsSync(path.join(__dirname, "exports"))) {
		fs.mkdirSync(path.join(__dirname, "exports"));
	}

	const stream = fs.createWriteStream(filePath);
	doc.pipe(stream);

	invoices.forEach((invoice, index) => {
		if (index !== 0) {
			doc.addPage();
		}
		doc.image(path.join(__dirname, "uploads", invoice.filename), {
			fit: [500, 500],
			align: "center",
			valign: "center",
		});
		const uploadDate = new Date(invoice.uploadDate).toLocaleDateString();
		doc.text(`Uploaded on: ${uploadDate}`, {
			align: "center",
		});
	});

	doc.end();

	stream.on("finish", () => {
		res.download(filePath, `invoices-${req.user._id}.pdf`);
	});
});

app.listen(port, (err) => {
	if (err) {
		console.error("Failed to start server:", err);
	} else {
		console.log(`Server running at http://localhost:${port}/`);
	}
});
