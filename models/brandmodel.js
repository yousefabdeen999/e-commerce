const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trime: true,
      unique: [true, "brand must be unique"],
      minlength: [3, "too short"],
      maxlength: [32, "too long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    
    image:String,
  },
  { timestamps: true }
);

brandSchema.post('init', function(doc) {
  if (doc.image) {
      const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
      doc.image = imageUrl;
    }
});

brandSchema.post('save', function(doc) {
  if (doc.image) {
      const imageUrl = `${process.env.BASE_URL}/brands/${doc.image}`;
      doc.image = imageUrl;
    }
});




module.exports = mongoose.model("Brand", brandSchema);
