
// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: "./uploads",

//   filename: function () {
//     return "hello.png";
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fieldSize: 1024 * 1024 }
// });

//  console.log( "herer",upload.single('file'));

// export const multerMiddleware = upload.single('file');


//------------------------------------------------

// const multer = require("multer");
// const { ulid } = require('ulid');


// const storage = multer.diskStorage({
//   destination: "./uploads",
//   filename: function (req, file, cb) {
//     console.log("filename",ulid() + "-" + file.originalname)
//     cb(null, "kdkdk.jpg");
//   },
// });


// const multerUpload = multer({
//   storage
// });

// module.exports = { multerUpload };
