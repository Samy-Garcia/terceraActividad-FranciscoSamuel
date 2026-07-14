import cookieParser from "cookie-parser";
import cors from "cors"
import express from "express";
import customerRoute from "./src/routes/registerCustomer.js";
import adminRoute from "./src/routes/registerAdmin.js";
import loginAdminRoute from "./src/routes/loginAdmin.js";
import loginCustomerRoute from "./src/routes/loginCustomer.js";
import wompiRoute from "./src/routes/wompi.js";
import {validateAuthCookie} from "./src/middleware/authMiddleware.js"

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
app.use("/api/loginAdmin", loginAdminRoute);
app.use("/api/loginCustomer", loginCustomerRoute);
app.use("/api/wompi",validateAuthCookie([""]). wompiRoute);


export default app