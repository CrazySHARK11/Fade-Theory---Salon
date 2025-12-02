import Service from "../models/Service.js";
import path from "path";
import fs from "fs";

export const createService = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one image required" });
    }

    const {
      title,
      durationMinutes,
      description,
      price,
      deletedPrice,
      isPremium,
    } = req.body;

    const imagesPaths = req.files.map((f) => `/uploads/services/${f.filename}`);

    const service = new Service({
      title,
      durationMinutes,
      deletedPrice,
      description,
      price,
      isPremium: isPremium || false,
      imageUrl: imagesPaths,
    });

    await service.save();

    return res.json({ success: true, message: "Service Created Successfully" });
  } catch (err) {
    next(err);
  }
};

export const getallServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, services });
  } catch (err) {
    next(err);
  }
};

export const getSingleService = async (req, res, next) => {
  try {
    const id = req.params.slug;

    const service = await Service.findById(id);

    if (!service) {
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    }

    res.json({ success: true, service });
  } catch (err) {
    next(err);
  }
};

export const deleteService = async (req, res, next) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found"});
    }

    if(service.imageUrl && service.imageUrl.length > 0){
       service.imageUrl.forEach((imgPath)=>{
          const filePath = path.join(process.cwd(), imgPath);

          if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath)
          }
       });
    }

    await Service.findByIdAndDelete(serviceId);

     return res.status(200).json({ success: true, message: "Service deleted", });

  } catch (err) {
    next(err)
  }
};
