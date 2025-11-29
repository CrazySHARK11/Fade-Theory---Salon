import express from "express";
import next from "next";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import appointmentsRouter from "./routes/appointments.js";
import authRouter from './routes/auth.js'
import userRouter from './routes/users.js'
import adminRouter from './routes/admin.js'
import serviceRouter from './routes/services.js'

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";

app.prepare().then(async () => {
    await connectDB();

    const server = express();
    server.use(express.json());
    server.use(cookieParser());
    
    server.use("/uploads", express.static("public/uploads"));

    server.use("/api/appointments", appointmentsRouter);
    server.use("/api/auth", authRouter);
    server.use("/api/user", userRouter);
    server.use("/api/service", serviceRouter);
    server.use("/api/admin", adminRouter);

    server.use(errorHandler)

    server.all(/.*/, (req, res) => handle(req, res));
    const port = process.env.PORT || 5000;

    server.listen(port, () => console.log(`> Ready on http://localhost:${port}`));
})