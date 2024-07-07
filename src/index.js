import { app } from "./app.js";
import dbConnect  from "./database/db.js";


dbConnect().then(()=>{
    app.get("/",(req,res)=>{
        res.send("hellow")
    })
    
    app.listen(3000,()=>{
        console.log("App is running at",);
    })
}).catch((error)=>{
    console.log(error);
})