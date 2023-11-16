import { Request, Response, Router } from "express";

import { prisma } from "@/database/prismaClient";

import { checkOwnership, ensuredAuthenticated, isAdmin } from "@/middlewares";

import {
  DeleteUserController,
  GetAllUsersController,
  GetDonationByDonorController,
  GetLastDonationByUserController,
  GetUserByIdController,
  UpdateUserController,
} from "@/controllers";

import {
  DeleteUserService,
  GetAllUserService,
  GetDonationsByDonorService,
  GetLastDonationByUserService,
  GetUserByIdService,
  UpdateUserService,
} from "@/services";

const userRoutes = Router();

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

userRoutes.get(
  "/",
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
  "/:id",
  ensuredAuthenticated(),
  isAdmin(),
  async (req: Request, res: Response) => {
    const getUserService = new GetUserByIdService(prisma);

    const getUserController = new GetUserByIdController(getUserService);

    const result = await getUserController.handle(req);

    res.status(201).json(result);
  }
);

userRoutes.get(
  "/:id/donations",
  ensuredAuthenticated(),
  checkOwnership(),
  async (req: Request, res: Response) => {
    const getDonationsByDonorService = new GetDonationsByDonorService(prisma);

    const getDonationByDonorController = new GetDonationByDonorController(
      getDonationsByDonorService
    );

    const result = await getDonationByDonorController.handle(req);

    res.status(201).json(result);
  }
);

userRoutes.get(
  "/:id/latest-donation",
  ensuredAuthenticated(),
  checkOwnership(),
  async (req: Request, res: Response) => {
    const getLastDonationByUserService = new GetLastDonationByUserService(
      prisma
    );

    const getLastDonationByUserController = new GetLastDonationByUserController(
      getLastDonationByUserService
    );

    const result = await getLastDonationByUserController.handle(req);

    res.status(201).json(result);
  }
);

export { userRoutes };
