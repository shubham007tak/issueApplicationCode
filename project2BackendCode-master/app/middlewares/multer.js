const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require("fs");




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync('./uploads/')) {
      fs.mkdirSync('./uploads/');
    }
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    var date = new Date();
    var timestamp = date.getTime();

    cb(null, timestamp + "_" + file.originalname);
  }
});


const fileFilter = (req, file, cb) => {
  checkFileType(file, cb);
};


// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {

    cb('Error: Images Only!');
  }
}


const upload = multer({
  storage: storage,
})

module.exports = {
  upload: upload
}


// var store = multer.diskStorage({
//   destination:function(req,file,cb){
//       cb(null, './uploads');
//   },
//   filename:function(req,file,cb){
//       cb(null, Date.now()+'.'+file.originalname);
//   }
// });


// var upload = multer({storage:store}).single('file');

// _router.post('/upload', function(req,res,next){
//   upload(req,res,function(err){
//       if(err){
//           return res.status(501).json({error:err});
//       }
//       //do all database record saving activity
//       return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
//   });
// });

// module.exports = _router;