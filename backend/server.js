import {configDotenv} from "dotenv"
configDotenv()
import express from "express"
import cors from "cors";
import routes from "./routes/routes.js";
import dbConnection from "./db/dbConnection.js";
const app = express()

dbConnection()

const PORT = process.env.PORT || 5000
const corsOpts = {origin: "http://localhost:5173"};
  
app.use(cors(corsOpts));
app.use(express.json({limit: "50mb"}))

app.use("/api", routes)

app.all("*", (req,res)=>{
    return res.status(404).json({success: false, message:"404 api route not found"})
})

app.listen(PORT, ()=>console.log(`server is runnig at ${PORT}`))
