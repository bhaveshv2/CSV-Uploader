const mongoose = require('mongoose');
const multer = require('multer');

const path=require('path');
const FILE_PATH = path.join('/tmp/csv');

const fileSchema = new mongoose.Schema({
    filename:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {                                 //destination is used to determine within which folder the uploaded files should be stored. This can also be given as a string (e.g. '/tmp/uploads'). If no destination is given, the operating system's default directory for temporary files is used.
      cb(null, path.join(__dirname,'..',FILE_PATH))
    },                                                                       
    filename: function (req, file, cb) {                                    //filename is used to determine what the file should be named inside the folder. If no filename is given, each file will be given a random name that doesn't include any file extension.
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

//Static functions (oops concept) uploadedAvatar is the static function
fileSchema.statics.uploadedFile = multer({storage:storage}).single('file');             //single is use as only one instance or one file is uploaded at a time

fileSchema.statics.filePath = FILE_PATH;                                                //function for upload at this storage (directly accessable and available publicly that's why this function is made)


const Files = mongoose.model('Files',fileSchema);

module.exports = Files;