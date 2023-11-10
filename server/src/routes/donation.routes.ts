import { Request, Response, Router } from "express";

import { prisma } from "@/database/prismaClient";

import { isAdmin, ensuredAuthenticated } from "@/middlewares";

import {
  CreateDonationService,
  DeleteDonationService,
  GetAllDonationService,
  GetDonationByIdService,
} from "@/services";
import {
  CreateDonationController,
  DeleteDonationController,
  GetAllDonationController,
  GetDonationByIdController,
} from "@/controllers";

const donationRoutes = Router();

donationRoutes.post(
  "/",
  ensuredAuthenticated(),
  isAdmin(),
  async (req: Request, res: Response) => {
    const createrDonationService = new CreateDonationService(prisma);

    const createDonationController = new CreateDonationController(
      createrDonationService
    );

    const result = await createDonationController.handle(req.body);

    res.status(201).json(result);
  }
);

donationRoutes.delete(
  "/:id",
  ensuredAuthenticated(),
  isAdmin(),
  async (req: Request, res: Response) => {
    const deleteDonationService = new DeleteDonationService(prisma);

    const deleteDonationController = new DeleteDonationController(
      deleteDonationService
    );

    const result = await deleteDonationController.handle(req);

    res.status(201).json(result);
  }
);

donationRoutes.get(
  "/",
  ensuredAuthenticated(),
  isAdmin(),
  async (req: Request, res: Response) => {
    const getAllDonationService = new GetAllDonationService(prisma);

    const getAllDonationController = new GetAllDonationController(
      getAllDonationService
    );

    const result = await getAllDonationController.handle();

    res.status(201).json(result);
  }
);

donationRoutes.get(
  "/:id",
  ensuredAuthenticated(),
  isAdmin(),
  async (req: Request, res: Response) => {
    const getDonationByIdService = new GetDonationByIdService(prisma);

    const getDonationByIdController = new GetDonationByIdController(
      getDonationByIdService
    );

    const result = await getDonationByIdController.handle(req);

    res.status(201).json(result);
  }
);

export { donationRoutes };
