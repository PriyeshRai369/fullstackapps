import mongoose from "mongoose"

async function dbConnect(){
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/react")
        if(conn){
            console.log("Database Connected");
        }else{
            process.exit(1)
        }
    } catch (error) {
        console.log("DB Connection fail",error);
    }
}

export default dbConnect