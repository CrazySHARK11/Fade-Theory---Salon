import express from "express";
import upload from "../middleware/serviceUpload.js";
import { adminAuth } from "../middleware/adminAuth.js";
import { createService, getallServices, getSingleService } from "../controllers/service.js";

const router = express.Router();

router.post("/create", adminAuth, upload.array("images", 7), createService)
router.get("/", getallServices)
router.get('/:slug', getSingleService)
 
export default router;