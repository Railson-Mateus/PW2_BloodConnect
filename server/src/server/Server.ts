import "express-async-errors";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import errorHandlingMiddleware from "@/middlewares/errorHandling";
import authRoutes from "@/routes/auth.routes";
import userRoutes from "@/routes/user.routes";

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
  })
);
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(cookieParser());

server.use("/auth", authRoutes);
server.use("/user", userRoutes);

server.use(errorHandlingMiddleware);

export { server };
