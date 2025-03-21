import express, { Application } from "express";
import dotenv from "dotenv";
import authRoutes from "../router/authRoutes";
import { dbConnect } from "../config/db";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRoutes);
dbConnect();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
