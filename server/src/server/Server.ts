import "express-async-errors";

import { join } from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { errorHandlingMiddleware } from "@/middlewares";

import {
  authRoutes,
  campaignRoutes,
  donationRoutes,
  userRoutes,
} from "@/routes";
import { uploadRoute } from "@/routes/upload.route";

const server = express();

server.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());

server.use("/auth", authRoutes);
server.use("/user", userRoutes);
server.use("/donation", donationRoutes);
server.use("/campaign", campaignRoutes);
server.use(uploadRoute);

server.use(
  "/uploads",
  express.static(join(process.cwd(), "src", "public", "upload"))
);

server.use(errorHandlingMiddleware);

export { server };
