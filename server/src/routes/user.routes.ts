import { UsersControllers } from "@/controllers";
import { GenerateToken } from "@/provider/GenerateToken";
import { Request, Response, Router } from "express";
import { SessionService } from "@/services/auth/SessionService";
import { SessionController } from "@/controllers/auth/SessionController";
import { prisma } from "@/database/prismaClient";
import { UsersServices } from "@/services/index";

const userRoutes = Router();

userRoutes.post("/signin", async (req: Request, res: Response) => {
  const generateToken = new GenerateToken();

  const sessionService = new SessionService(prisma, generateToken);

  const sessionController = new SessionController(sessionService);

  const result = await sessionController.handle(req.body);

  res.json(result);
});

userRoutes.post("/signup", async (req: Request, res: Response) => {
  const createUserService = new UsersServices.Create(prisma);

  const createUserController = new UsersControllers.Create(createUserService);

  const result = await createUserController.handle(req.body);

  res.status(201).json(result);
});

export default userRoutes;
