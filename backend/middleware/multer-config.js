const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');  // photo de famille.jpg  -> photo_de_famille.jpg
    const name2 = name.split('.')[0] + '_'
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name2 + Date.now() + '.' + extension);  // 123.jpg + 16158515654 + .jpg
  }
});

module.exports = multer({storage: storage}).single('image');