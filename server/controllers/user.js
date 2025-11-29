import User from "../models/Users.js";
import Service from "../models/Service.js";
import fs from "fs";
import path from "path";

export const uploadPic = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file Uploaded" });
    }

    const user = req.user;

    if (user.profilePic) {
      const oldImagePath = path.join(
        process.cwd(),
        "public/uploads/profile",
        user.profilePic.replace("/", "")
      );

      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.log("❌ Failed to delete old image:", err.message);
        } else {
          console.log("🗑 Old image deleted successfully");
        }
      });
    }

    const newImage = req.file.filename;

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { profilePic: newImage },
      { new: true }
    ).select("-password");

    return res.json({
      success: true,
      message: "Profile Pic Updated",
      profilePic: updatedUser.profilePic,
    });
  } catch (err) {
    next(err);
  }
};

export const likeService = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { serviceId } = req.params;

    const service = await Service.findById(serviceId);

    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service Not Found" });
    }

    const alreadyLiked = service.likes.includes(userId);

    if (alreadyLiked) {
      return res
        .status(400)
        .json({ message: "You already liked this service" });
    }

    service.likes.push(userId);
    await service.save();

    return res.json({
      message: "Service liked",
      totalLikes: service.likes.length,
    });
  } catch (err) {
    next(err);
  }
};

export const unLikeService = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { serviceId } = req.params;

    const service = await Service.findById(serviceId);

    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service Not Found" });
    }

    const alreadyLiked = service.likes.includes(userId);

    if (!alreadyLiked) {
      return res
        .status(400)
        .json({ message: "You have not liked this service yet" });
    }

    service.likes = service.likes.filter(
      (id) => id.toString() !== userId.toString()
    );
    await service.save();

    return res.json({
      message: "Like removed",
      totalLikes: service.likes.length,
    });
  } catch (err) {
    next(err);
  }
};

export const getLikedServices = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const likedServices = await Service.find({ likes: userId });

    res.status(200).json({
      success: true,
      data: likedServices,
    });
  } catch (err) {
    next(err);
  }
};
