import mongoose from "mongoose";

const { Schema } = mongoose;

const StokShema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number
  },
  stok: {
    type: Number
  },
}, { timestamps: true });

export default mongoose.model("Stok", StokShema);
