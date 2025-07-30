const mongoose = require('mongoose');
const dbconection=()=>{
    mongoose
    .connect(process.env.DB_URI)
    .then((conn) =>{
    console.log(`Data base conencted: ${conn.connection.host}`)
    })
   // .catch((err)=>{
     //   console.error(`Database Eror:${err}`)
    
    //})
}  

module.exports=dbconection