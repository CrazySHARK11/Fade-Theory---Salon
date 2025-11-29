import multer from "multer";
import path from 'path';

const storage  = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/profile");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        if(ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"){
            return cb(new Error("Only JPG/PNG allowed"));
        }
        cb(null, true);
    }
})

export default upload;
