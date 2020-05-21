const mongoose = require('mongoose');
// const multer = require('multer');

// const path=require('path');


const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    path:{
        type:String,
    }
},{
    timestamps:true,
});

// let storage = multer.diskStorage({
//     destination: function (req, file, cb) {                                 //destination is used to determine within which folder the uploaded files should be stored. This can also be given as a string (e.g. '/tmp/uploads'). If no destination is given, the operating system's default directory for temporary files is used.
//       cb(null, path.join(__dirname,'../','uploads/'))
//     },                                                                       
//     filename: function (req, file, cb) {                                    //filename is used to determine what the file should be named inside the folder. If no filename is given, each file will be given a random name that doesn't include any file extension.
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, file.fieldname + '-' + uniqueSuffix);
//     }
// });

// //Static functions (oops concept) uploadedFile is the static function
// fileSchema.statics.uploadedFile = multer({
//     storage:storage,
//     fileFilter:function(req,file,cb){
//         let ext = path.extname(file.originalname);
//         if(ext !== '.csv'){
//             return cb(new Error('Only .csv is allowed!'));
//         }
//         cb(null,true);
//     }
// }).single('csvfile');             

const Files = mongoose.model('Files',fileSchema);

module.exports = Files;