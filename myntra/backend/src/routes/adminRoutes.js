import { Router } from "express";
import multer from "multer";
import { getAnalytics, getUsers, importProductsCsv } from "../controllers/adminController.js";
import { authorize, protect } from "../middleware/auth.js";

const upload = multer({ dest: "uploads/" });
const router = Router();

router.use(protect, authorize("admin"));

router.get("/analytics", getAnalytics);
router.get("/users", getUsers);
router.post("/products/import-csv", upload.single("file"), importProductsCsv);

export default router;
