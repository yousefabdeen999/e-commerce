const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trime: true,
      unique: [true, "subcategory must be unique"],
      minlength: [3, "too short"],
      maxlength: [32, "too long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "subCategory must be belong to parent category "],
    },
    image:String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("SubCategory", subCategorySchema);
