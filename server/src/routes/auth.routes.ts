import { CreateUserController } from "@/controllers";
import { SessionController } from "@/controllers/auth/SessionController";
import { prisma } from "@/database/prismaClient";
import { GenerateToken } from "@/provider/GenerateToken";
import { CreateUserService } from "@/services";
import { SessionService } from "@/services/auth/SessionService";
import { Request, Response, Router } from "express";

const authRoutes = Router();

authRoutes.post("/signin", async (req: Request, res: Response) => {
  const generateToken = new GenerateToken();

  const sessionService = new SessionService(prisma, generateToken);

  const sessionController = new SessionController(sessionService);

  const result = await sessionController.handle(req.body);

  res.json(result);
});

authRoutes.post("/signup", async (req: Request, res: Response) => {
  const createUserService = new CreateUserService(prisma);

  const createUserController = new CreateUserController(createUserService);

  const result = await createUserController.handle(req.body);

  res.status(201).json(result);
});

export default authRoutes;
