import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import Service from "../models/Service.js";

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res
        .status(400)
        .json({ success: false, message: "Admin Not Found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password" });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.json({
      success: true,
      message: "Admin Logged in Successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const adminLogout = (req, res) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  return res.json({ success: true, message: "Admin logged out" });
};

export const getallServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ success: true, services });
  } catch (err) {
    next(err);
  }
};

export const getallUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
};
