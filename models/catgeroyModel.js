const mongoose = require('mongoose');
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        require:[true,"catagroy required"],
        unique:[true,"category must be unique"],
        minlength:[3,"too short"],
        maxlength:[32,"too long"],
    },
    slug:{
        type:String,
        lowercase:true,
    },
    Image:String,
},{timestamps:true});
 


categorySchema.post('init', function(doc) {
    if (doc.Image) {
        const imageUrl = `${process.env.BASE_URL}/categories/${doc.Image}`;
        doc.Image = imageUrl;
      }
  });

  categorySchema.post('save', function(doc) {
    if (doc.Image) {
        const imageUrl = `${process.env.BASE_URL}/categories/${doc.Image}`;
        doc.Image = imageUrl;
      }
  });


const categoryModel = mongoose.model("Category",categorySchema)


module.exports=categoryModel