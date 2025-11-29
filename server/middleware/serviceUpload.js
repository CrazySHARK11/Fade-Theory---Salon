import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/services");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  const allowedTypes = /jpg|jpeg|png|webp/;
  const ext = path.extname(file.originalname).toLowerCase();

  if (!allowedTypes.test(ext)) {
    return cb(new Error("Invalid file type. Only JPG, PNG, WEBP allowed"));
  }

  cb(null, true);
}

const upload = multer({
    storage,
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter,
})

export default upload;