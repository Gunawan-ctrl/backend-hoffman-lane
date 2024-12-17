import mongoose from "mongoose";

const { Schema } = mongoose;

const MenuShema = new Schema({
  id: {
    type: String,
  },
  IDKategori: {
    type: String
  },
  name: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  description: {
    type: String
  },
  price: {
    type: String
  },
  upload_menu: {
    type: String
  },
}, { timestamps: true });

export default mongoose.model("Menu", MenuShema);
