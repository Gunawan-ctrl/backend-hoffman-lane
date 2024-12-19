import menuService from "../service/menu-service.js";
import requestResponse from "../config/response.js";
import { v4 as uuidv4 } from 'uuid';
import UploadConfig from "../middlewares/UploadConfig.js";

// Create data
const create = async (req, res) => {
  req.body.id = uuidv4();
  console.log('req.body', req.body);
  req.body.upload_menu = UploadConfig.cekNull(req.files.upload_menu);
  try {
    const data = await menuService.create(req.body);
    res.status(201).json(requestResponse.suksesWithData(data));
  } catch (error) {
    console.log('error', error);
    res.status(500).json(requestResponse.kesalahan);
  }
};

// Get all data
const getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const result = await menuService.getAll(page, limit);
    res.status(200).json(requestResponse.suksesWithData(result));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get data by id
const getById = async (req, res) => {
  try {
    const data = await menuService.getById({ id: req.params.id })
    console.log('data', data);
    if (!data) {
      return res.json(requestResponse.gagal("Data tidak ditemukan"))
    }
    res.json(requestResponse.suksesWithData(data))
  } catch (error) {
    res.json(requestResponse.kesalahan)
  }
}
// get menu by category
const getByIdKategori = async (req, res) => {
  try {
    const data = await menuService.getByIdKategori(req.params.id);
    if (!data) {
      return res.json(requestResponse.gagal("Data tidak ditemukan"));
    }
    res.json(requestResponse.suksesWithData(data));
  } catch (error) {
    console.log('error', error);
    res.status(500).json(requestResponse.kesalahan);
  }
}

// Update data
const updateOne = async (req, res) => {
  try {
    const data = await menuService.updateOne({ id: req.params.id }, req.body, { new: true });
    console.log('data', data);
    res.json(requestResponse.suksesWithData(data));
  }
  catch (error) {
    console.log('error', error);
    res.status(500).json(requestResponse.kesalahan);
  }
};

// Delete data
const deleteOne = async (req, res) => {
  try {
    const data = await menuService.getById({ id: req.params.id });
    if (!data) {
      return res.status(404).json(requestResponse.gagal("Data tidak ditemukan"));
    }
    if (data.upload_menu) {
      UploadConfig.deleteImage(data.upload_menu);
    }
    await menuService.deleteOne({ id: req.params.id });
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