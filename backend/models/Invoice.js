/** @format */

const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
	filename: { type: String, required: true },
	uploadDate: { type: Date, required: true },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
