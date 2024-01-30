import express  from "express";
import dotenv from "dotenv"
import todoRouter from "./routes/todo.routes";
import cors from 'cors'
import bodyParser from "body-parser";


const app = express();
const PORT = 7900;
dotenv.config();
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));


app.use("/api/v1/todo",todoRouter)
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})