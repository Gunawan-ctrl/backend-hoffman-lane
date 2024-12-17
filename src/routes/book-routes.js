import express from "express";
import controllers from "../controller/book-controller.js";
import UploadConfig from "../middlewares/UploadConfig.js";

const router = express.Router();



router.post("/", UploadConfig.upload.fields([{ name: "cover_buku", maxCount: 1 }]), controllers.create);
router.get("/", controllers.getAll);
router.get("/:id", controllers.getById);
router.put("/:id", controllers.updateOne);
router.delete("/:id", controllers.deleteOne);

export default router;
