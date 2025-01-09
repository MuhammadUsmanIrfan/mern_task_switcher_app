import mongoose from "mongoose";

const dbConnection =async ()=>{
    try {
        mongoose.connect(`${process.env.MONGOOSE_URI}task-switcher`)
        console.log("Db connection is successful");
    } catch (error) {
        console.log(`DB connection failed ${error}`);
    }
}

export default dbConnection;