const Product = require("../models/ProductModel");
const factory = require("./handelerFactor");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const { uploadMixOfImages } = require("../middelwares/uploadimage,midderlware");

exports.uploadProductImages = uploadMixOfImages([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  // console.log(req.files);
  //1- Image processing for imageCover
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    // Save image into our db
    req.body.imageCover = imageCoverFileName;
  }
  //2- Image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);

        // Save image into our db
        req.body.images.push(imageName);
      })
    );

    next();
  }
});

//@desc  get category
//@ route  get
//@ acess public
exports.getProductes = factory.getmany(Product, "Product");

//@desc  get category by id

exports.getproduct = factory.getone(Product);

//@desc  creat category
//@ route  post
//@ acess private
exports.creatProduct = factory.createone(Product);
//.then(category=>
//.catch(err=>res.status(400).send(err))

// const newCategory =new categoryModel({name})

// newCategory.save()
// .then((doc)=>{
//     res.json(doc)
// })
// .catch((err)=>{
//res.json(err)
//   })

//@desc  update category
exports.updateProduct = factory.upadteone(Product);

//@desc  delet category
exports.deletProduct = factory.deletone(Product);
