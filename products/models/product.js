import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  category: { type: String },
});

export default mongoose.model("Product", productSchema);
