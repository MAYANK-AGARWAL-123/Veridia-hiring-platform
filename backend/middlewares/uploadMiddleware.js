const multer = require('multer');
const path = require('path');

// Use memory storage for serverless (e.g., Vercel) and upload to Cloudinary in controllers
const storage = multer.memoryStorage();

// Initialize upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('resume'); // 'resume' is the field name

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|pdf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: PDFs, JPEGs, and PNGs Only!');
  }
}

module.exports = upload;