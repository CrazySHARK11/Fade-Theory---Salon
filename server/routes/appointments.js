import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import QueueItem from "../models/QueueItem.js";

const router = express.Router();

router.post("/request", authMiddleware, async (req, res, next) => {
  try {
    const { serviceId, preferredDates = [], note } = req.body;

    if (!serviceId) return res.status(400).json({ msg: "Service required" });

    const item = new QueueItem({
      user: req.user._id,
      service: serviceId,
      preferredDates,
      note,
    });

    await item.save();

    res.json({ success: true, message: "Request submitted", item });
  } catch (err) {
    next(err);
  }
});

export default router;
