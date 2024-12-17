import bookService from "../service/book-service.js";
import requestResponse from "../config/response.js";
import { v4 as uuidv4 } from 'uuid';
import UploadConfig from "../middlewares/UploadConfig.js";

// Create data
const create = async (req, res) => {
  console.log('req', req);
  req.body.id = uuidv4();
  req.body.cover_buku = UploadConfig.cekNull(req.files.cover_buku);
  try {
    const data = await bookService.create(req.body);
    res.status(201).json(requestResponse.suksesWithData(data));
  } catch (error) {
    console.log('error', error);
    res.status(500).json(requestResponse.kesalahan);
  }
};

const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await bookService.getAll(page, limit);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getByIdKategori = async (req, res) => {
  try {
    const data = await bookService.getByIdKategori({ IDKategori: req.params.id_kategori })
    if (!data) {
      return res.json(requestResponse.gagal("Data tidak ditemukan"))
    }
    res.json(requestResponse.suksesWithData(data))
  } catch (error) {
    res.json(requestResponse.kesalahan)
  }
}
const getById = async (req, res) => {
  try {
    const data = await bookService.getById({ id: req.params.id })
    console.log('data', data);
    if (!data) {
      return res.json(requestResponse.gagal("Data tidak ditemukan"))
    }
    res.json(requestResponse.suksesWithData(data))
  } catch (error) {
    res.json(requestResponse.kesalahan)
  }
}
// Update data
const updateOne = async (req, res) => {
  try {
    const data = await bookService.updateOne({ id: req.params.id }, req.body, { new: true });
    console.log('data', data);
    res.json(requestResponse.suksesWithData(data));
  } catch (error) {
    res.status(500).json(requestResponse.kesalahan);
  }
};

// Delete data
const deleteOne = async (req, res) => {
  try {
    const book = await bookService.getById({ id: req.params.id });
    if (!book) {
      return res.status(404).json(requestResponse.gagal("Data tidak ditemukan"));
    }
    if (book.cover_buku) {
      UploadConfig.deleteImage(book.cover_buku);
    }
    await bookService.deleteOne({ id: req.params.id });
    res.json(requestResponse.berhasil("Data berhasil dihapus"));
  } catch (error) {
    console.log('error', error);
    res.status(500).json(requestResponse.kesalahan);
  }
};
export default {
  create,
  getAll,
  getById,
  getByIdKategori,
  updateOne,
  deleteOne
}