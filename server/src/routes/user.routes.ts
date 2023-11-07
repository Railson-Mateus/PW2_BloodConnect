import {
  DeleteUserController,
  GetAllUsersController,
  GetUserByIdController,
  UpdateUserController,
} from "@/controllers";
import { GenerateToken } from "@/provider/GenerateToken";
import { Request, Response, Router } from "express";
import { SessionService } from "@/services/auth/SessionService";
import { SessionController } from "@/controllers/auth/SessionController";
import { prisma } from "@/database/prismaClient";
import {
  DeleteUserService,
  GetAllUserService,
  UpdateUserService,
} from "@/services/index";
import { GetUserByIdService } from "../services/user/GetUserByIdService";
import { ensuredAuthenticated } from "@/middlewares/ensuredAuthenticated";
import { isAdmin } from "@/middlewares/permissions";
import { checkOwnership } from "@/middlewares/checkOwnership.";

const userRoutes = Router();

userRoutes.get(
  "/get-all",
  ensuredAuthenticated(),
  isAdmin(),
  async (req: Request, res: Response) => {
    const getAllUserService = new GetAllUserService(prisma);

    const getAllUserController = new GetAllUsersController(getAllUserService);

    const result = await getAllUserController.handle();

    res.status(201).json(result);
  }
);

userRoutes.get(
  "/get-user/:id",
  ensuredAuthenticated(),
  isAdmin(),
  async (req: Request, res: Response) => {
    const getUserService = new GetUserByIdService(prisma);

    const getUserController = new GetUserByIdController(getUserService);

    const result = await getUserController.handle(req);

    res.status(201).json(result);
  }
);

userRoutes.patch(
  "/update/:id",
  ensuredAuthenticated(),
  checkOwnership(),
  async (req: Request, res: Response) => {
    const updateUserService = new UpdateUserService(prisma);

    const updateUserController = new UpdateUserController(updateUserService);

    const result = await updateUserController.handle(req);

    res.status(201).json(result);
  }
);

userRoutes.delete(
  "/delete/:id",
  ensuredAuthenticated(),
  checkOwnership(),
  async (req: Request, res: Response) => {
    const deleteUserService = new DeleteUserService(prisma);

    const deleteUserController = new DeleteUserController(deleteUserService);

    console.log(req.params);

    const result = await deleteUserController.handle(req);

    res.json(result);
  }
);

export default userRoutes;
