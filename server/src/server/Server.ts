import "express-async-errors";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { errorHandlingMiddleware } from "@/middlewares";

import { authRoutes, donationRoutes, userRoutes } from "@/routes";
import { uploadRoute } from "@/routes/upload.route";

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
  })
);
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());

server.use("/auth", authRoutes);
server.use("/user", userRoutes);
server.use("/donation", donationRoutes);
server.use(uploadRoute);

server.use(errorHandlingMiddleware);

export { server };
