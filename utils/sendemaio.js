const nodemailer=require("nodemailer")

const sendemail=async(options)=>{
const transporter=nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_HOST,
    secure:true,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    }
})
const mailOpts={
    from:"ea-shop app<yousefabdeen339@gmail.com>",
    to:options.email,
    subject:options.subject,
    text:options.message,

}

await transporter.sendMail(mailOpts);

}


module.exports=sendemail