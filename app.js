import cookieParser from "cookie-parser";
import cors from "cors"
import express from "express";
import customerRoute from "./src/routes/registerCustomer.js";
import adminRoute from "./src/routes/registerAdmin.js";

const app = express();

app.use(cors({
        origin: ["http://localhost5173", "http://localhost5174"],
        credential: true
    })
),

app.use(cookieParser());

app.use(express.json());

app.use("/api/registerCustomer", customerRoute);
app.use("/api/registerAdmin", adminRoute);

export default app