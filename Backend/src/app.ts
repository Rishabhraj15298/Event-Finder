import express, { Router } from "express"
import cors from "cors"
import eventRoutes from "./routes/event.routes"

// dotenv is loaded in server.ts before importing app; keep app lightweight
const app = express()

// middlewares

app.use(cors({
  origin: "https://event-finder-o8ng.onrender.com/", 
  credentials: true,
}));
app.use(express.json())

// routes
app.use("/api/events",eventRoutes);

app.get("/",(req,res)=>{
    res.send("Mini Event Finder API is running ")
})

export default app;