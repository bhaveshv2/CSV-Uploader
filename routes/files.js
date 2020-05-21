const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../', 'uploads/'));
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
  }
});

var upload = multer({ //multer settings
  storage: storage,
  fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      if(ext !== '.csv') {
          return callback(new Error('Only csv files are allowed'))
      }
      callback(null, true)
  }
});
const fileController = require('../controllers/file_controller');

router.post('/upload',upload.single('csvfile'),fileController.upload);
router.get('/show-all',fileController.showAllFiles);
router.get('/:id/show-file-content',fileController.showFileContent);

module.exports = router;