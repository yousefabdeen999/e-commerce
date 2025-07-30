const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trime: true,
      minlength: [3, "to short product titile"],
      maxlength: [100, "to long product titile"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "product description is required"],
      minlength: [20, "to short product description"],
    },
    quantity: {
      type: Number,
      required: [true, "product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
      trime: true,
      max: [200000, "to long product price"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],

    imageCover: {
      type: String,
      required: [true, "product image cover is required"],
    },
    images: [String],

    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",  
      required: [true, "product  must belong to category "],
    },
    subcategory: {
      type: mongoose.Schema.ObjectId,
      ref: "SubCategory",
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "rating must be above or equal 1.0"],
      max: [5, "rating must be above or equal 5.0"],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);
productSchema.pre(/^find/,function (next){
  this.populate({
    path:"category",
  select:"name",
  })
  next();
})

const setImageURL = (doc) => {
  if (doc.imageCover) {
    const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imageUrl;
  }
  if (doc.images) {
    const imagesList = [];
    doc.images.forEach((image) => {
      const imageUrl = `${process.env.BASE_URL}/products/${image}`;
      imagesList.push(imageUrl);
    });
    doc.images = imagesList;
  }
};
// findOne, findAll and update
productSchema.post('init', (doc) => {
  setImageURL(doc);
});

// create
productSchema.post('save', (doc) => {
  setImageURL(doc);
});

module.exports=mongoose.model("Product",productSchema)