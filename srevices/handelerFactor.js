const asyncHandler = require('express-async-handler')
const ApiError=require("../utils/apiError")
const ApiFeatures = require("../utils/apifeatures");
const { Model } = require('mongoose');


exports.deletone=(Model)=>asyncHandler(async(req,res)=>{
    const{id}=req.params
    const document=await Model.findByIdAndDelete(id)
    if(!document){
        res.status(404).json({msg:`no document find`})
    
    }
    res.status(204).send()
})


exports.upadteone=(Model)=>asyncHandler(async(req,res)=>{



const document=await Model.findByIdAndUpdate(req.params.id,req.body)
if(!document){
    res.status(404).json({msg:`no document find`})

}
res.status(200).json({data:document})
})

exports.createone=(Model)=>asyncHandler(async(req,res)=>{


    const document=await Model.create(req.body)
    res.status(201).json({data:document})})


    exports.getone=(Model)=>asyncHandler(async(req,res,next)=>{
    const{id}=req.params;
    const document=await Model.findById(id);
    if(!document){
        //res.status(404).json({msg:`no category find`})
    return next(new ApiError(`no document find`,404))
    }
    res.status(200).json({data:document})
    })


    exports.getmany=(Model,modelName)=>asyncHandler(async(req,res)=>{
        
        const documentsCount=await Model.countDocuments()
        const apifeatures = new ApiFeatures(Model.find(), req.query)
         
        .search(modelName)
          .filter()
          .sort()
          .limitFields()
          .paginate(documentsCount);
      
          const{mongooseQuery,paginationResult}=apifeatures
          const documents = await mongooseQuery;
          
    res.status(200).json({results:documents.length,paginationResult,data:documents});
    })