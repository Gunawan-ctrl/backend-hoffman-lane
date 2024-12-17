import stokService from "../service/stok-service.js";
import requestResponse from "../config/response.js";
import { v4 as uuidv4 } from 'uuid';

// Create data
const create = async (req, res) => {
  req.body.id = uuidv4();
  try {
    const data = await stokService.create(req.body);
    res.status(201).json(requestResponse.suksesWithData(data));
  } catch (error) {
    res.status(500).json(requestResponse.kesalahan);
  }
};

const getAll = async (req, res) => {
  try {
    const stok = await stokService.getAll({});
    res.status(200).json(requestResponse.suksesWithData(stok));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get one data
const getById = async (req, res) => {
  try {
    const data = await stokService.getById({ id: req.params.id });
    res.json(requestResponse.suksesWithData(data));
  } catch (error) {
    res.status(500).json(requestResponse.kesalahan);
  }
};

// Update data
const updateOne = async (req, res) => {
  try {
    const data = await stokService.updateOne({ id: req.params.id }, req.body, { new: true });
    res.json(requestResponse.suksesWithData(data));
  } catch (error) {
    res.status(500).json(requestResponse.kesalahan);
  }
};

// Delete data
const deleteOne = async (req, res) => {
  try {
    await stokService.deleteOne({ id: req.params.id });
    res.json(requestResponse.berhasil("Data berhasil dihapus"));
  } catch (error) {
    console.log('error', error);
    res.status(500).json(requestResponse.kesalahan);
  }
};

// reset password
const resetPassword = async (req, res) => {
  try {
    const data = await userService.resetPassword({ email: req.body.email });
    res.json(requestResponse.suksesWithData(data));
  } catch (error) {
    res.status(500).json(requestResponse.kesalahan);
  }
};
export default {
  create,
  getAll,
  getById,
  updateOne,
  deleteOne,
  resetPassword
}