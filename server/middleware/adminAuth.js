import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const adminAuth = async (req, res, next) => {
  try {
    const token = req.cookies.adminToken;

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-passwword");
    
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin does not exist" });
    }

    req.admin = admin;
    next();
  } catch (err) {
    next(err);
  }
};
