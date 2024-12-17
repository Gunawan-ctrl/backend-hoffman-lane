import stokModel from "../model/stok-model.js";

const create = async (data) => {
  return await stokModel.create(data)
}

const getAll = async () => {
  return await stokModel.find({}, { _id: 0, __v: 0 }, { lean: true })
};

// getById
const getById = async (condition) => {
  return await stokModel.findOne(condition, { _id: 0, __v: 0 }, { lean: true })
}

const updateOne = async (id, body) => {
  return await stokModel.updateOne(id, body)
}
const deleteOne = async (condition) => {
  return await stokModel.deleteOne(condition)
}
export default {
  create,
  getAll,
  getById,
  updateOne,
  deleteOne
}