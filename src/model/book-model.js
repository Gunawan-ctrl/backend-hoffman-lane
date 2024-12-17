import mongoose from "mongoose";

const { Schema } = mongoose;

const BookSchema = new Schema({
  id: {
    type: String,
  },
  IDKategori: {
    type: String
  },
  judul: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  penulis: {
    type: String
  },
  deskripsi: {
    type: String
  },
  penerbit: {
    type: String
  },
  publist_year: {
    type: String
  },
  cover_buku: {
    type: String
  },
  upload_buku: {
    type: String
  },
}, { timestamps: true });

export default mongoose.model("Book", BookSchema);
