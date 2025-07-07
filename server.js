import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()
// middlewares
const allowedOrigins = [
  "http://localhost:5173",
  "https://frontend-seven-tau-41.vercel.app/"
];

// CORS Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
      return res.status(200).end();
  }

  next();
});
app.use(express.json())
app.use(cors())

// api endpoints
app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)

app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working");

});

app.listen(port, () => console.log(`Server started on ${port}`))