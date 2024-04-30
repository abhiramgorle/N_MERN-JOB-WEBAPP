import mongoose from "mongoose";

export const dbConnection = ()=>{
    mongoose.connect("mongodb+srv://admin:admin@anandcluster.txvbw3u.mongodb.net/?retryWrites=true&w=majority&appName=AnandCluster").then(
        ()=>{console.log("Connected to Database!");}
    )
    .catch((err) => {
        console.log(`Some error occured while connecting to database ${err}`);
    })
};