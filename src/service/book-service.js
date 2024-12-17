import bookModel from "../model/book-model.js";

const create = async (data) => {
  return await bookModel.create(data)
}

const getAll = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const data = await bookModel.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "IDKategori",
        foreignField: "id",
        as: "category"
      }
    },
    {
      $unwind: { path: "$category" }
    },
    {
      $project: {
        _id: 0,
        "category._id": 0,
        __v: 0,
        "category.__v": 0,
      },
    },
    { $skip: skip },
    { $limit: limit }
  ]);

  const totalBooks = await bookModel.countDocuments();
  const totalPages = Math.ceil(totalBooks / limit);

  return {
    data,
    meta: {
      totalBooks,
      currentPage: page,
      totalPages
    }
  };
};


const getByIdKategori = async (id) => {
  return await bookModel.aggregate([
    {
      $match: {
        IDKategori: id
      }
    },
    {
      $lookup: {
        from: "categories",
        localField: "IDKategori",
        foreignField: "id",
        as: "category"
      }
    },
    {
      $unwind: { path: "$category" }
    },
  ])
}
const getById = async (id) => {
  return await bookModel.findOne(id, { _id: 0, __v: 0 }, { lean: true })
}
const updateOne = async (id, body) => {
  return await bookModel.updateOne(id, body)
}
const deleteOne = async (condition) => {
  return await bookModel.deleteOne(condition)
}
export default {
  getAll,
  // getAllCategori,
  getByIdKategori,
  getById,
  create,
  updateOne,
  deleteOne
}