import menuModel from "../model/menu-model.js";

const create = async (data) => {
  return await menuModel.create(data)
}

const getAll = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const data = await menuModel.aggregate([
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

  const totalMenu = await menuModel.countDocuments();
  const totalPages = Math.ceil(totalMenu / limit);

  return {
    data,
    meta: {
      totalMenu,
      currentPage: page,
      totalPages
    }
  };
};


const getByIdKategori = async (id) => {
  console.log('idservice', id);
  return await menuModel.aggregate([
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
    {
      $project: {
        _id: 0,
        "category._id": 0,
        __v: 0,
        "category.__v": 0,
      },
    },
  ])
}
const getById = async (id) => {
  return await menuModel.findOne(id, { _id: 0, __v: 0 }, { lean: true })
}
const updateOne = async (id, body) => {
  return await menuModel.updateOne(id, body, { new: true })
}
const deleteOne = async (condition) => {
  return await menuModel.deleteOne(condition)
}
export default {
  create,
  getAll,
  getByIdKategori,
  getById,
  updateOne,
  deleteOne
}