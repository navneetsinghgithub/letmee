const mongoose = require("mongoose")
module.exports=()=>{
mongoose.connect(process.env.url).then((res)=>{
    console.log(">>connected>>");
}).catch((error)=>{
    console.log(error,"error");
})
}