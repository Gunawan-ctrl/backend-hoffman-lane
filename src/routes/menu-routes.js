import express from "express";
import controllers from "../controller/menu-controller.js";
import UploadConfig from "../middlewares/UploadConfig.js";

const router = express.Router();

router.post("/", UploadConfig.upload.fields([{ name: "upload_menu", maxCount: 1 }]), controllers.create);
router.get("/", controllers.getAll);
router.get("/:id", controllers.getById);
router.get("/category/:id", controllers.getByIdKategori);
router.put("/:id", controllers.updateOne);
router.delete("/:id", controllers.deleteOne);

export default router;
