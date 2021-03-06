const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema( {
	TxnHistory: [{
		type: Schema.ObjectId, ref: "Transaction"
	}],
	Name: {type: String, required: true},
	CreateDate: {type: Date, default:Date.now, required: true},
	Roast: {type: String, required: true},
	Ground: {type: Boolean, required: true},
	CreatedBy: {type: Schema.ObjectId, ref: "User"}
	
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;