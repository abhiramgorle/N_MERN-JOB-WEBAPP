import app from "./app.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";


cloudinary.v2.config({
    cloud_name:"dmb8wp7kl" ,
    api_key:"621436955546388" ,
    api_secret: "JDRM8CmVbLEZQV04eqkwIG5QNGw"
})



app.listen(4000, ()=>{
    console.log(`Server running on port 4000`);
})