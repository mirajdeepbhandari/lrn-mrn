const multer = require('multer');

const storage = (storage_location = "public/users") => {
 return multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, storage_location);
  },
  filename: (_req, file, cb) => {
    const splittedFile = file.originalname.split(".");
    const fileExt = splittedFile[splittedFile.length - 1]; // jpg, png, ...
    const fileName = splittedFile[0].concat("-", Date.now(), ".", fileExt);
    cb(null, fileName);
  },
 });
};

const upload = (storage, file_size = 1000000) => {
 return multer({
  storage: storage,
  // FILE TYPE CHECK (fileFilter)
  limits: {
    fileSize: file_size,
  },
});
};

module.exports = { multer, storage, upload };