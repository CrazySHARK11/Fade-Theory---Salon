import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import { uploadPic, likeService, unLikeService, getLikedServices } from "../controllers/user.js";

const router = express.Router();

router.post("/upload-profile", authMiddleware, upload.single("profile"), uploadPic);
router.post("/:serviceId/like", authMiddleware, likeService);
router.post("/:serviceId/unlike", authMiddleware, unLikeService);
router.get("/wishlist", authMiddleware, getLikedServices); 

export default router;