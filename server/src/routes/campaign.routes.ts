import {
  CreateCampaignController,
  DeleteCampaignController,
  GetAllCampaignController,
  GetCampaignByIdController,
  UpdateCampaignController,
} from "@/controllers/campaign";
import { prisma } from "@/database/prismaClient";
import { ensuredAuthenticated, isAdmin } from "@/middlewares";
import {
  CreateCampaignService,
  DeleteCampaignService,
  GetAllCampaignService,
  GetCampaignByIdService,
  UpdateCampaignService,
} from "@/services/campaign";
import { Request, Response, Router } from "express";

const campaignRoutes = Router();

campaignRoutes.post(
  "/",
  ensuredAuthenticated(),
  isAdmin(),
  async (req: Request, res: Response) => {
    const createrCampaignService = new CreateCampaignService(prisma);

    const createCampaignController = new CreateCampaignController(
      createrCampaignService
    );

    const result = await createCampaignController.handle(req.body);

    res.status(201).json(result);
  }
);

campaignRoutes.delete(
  "/:id",
  ensuredAuthenticated(),
  isAdmin(),
  async (req: Request, res: Response) => {
    
    const deleteCampaignService = new DeleteCampaignService(prisma);

    const deleteCampaignController = new DeleteCampaignController(
      deleteCampaignService
    );

    const result = await deleteCampaignController.handle(req);

    res.status(201).json(result);
  }
);

campaignRoutes.patch(
  "/:id",
  ensuredAuthenticated(),
  isAdmin(),
  async (req: Request, res: Response) => {
    const updateCampaignService = new UpdateCampaignService(prisma);

    const updateCampaignController = new UpdateCampaignController(
      updateCampaignService
    );

    const result = await updateCampaignController.handle(req);

    res.status(201).json(result);
  }
);

campaignRoutes.get(
  "/",
  ensuredAuthenticated(),
  async (req: Request, res: Response) => {
    const getAllCampaignService = new GetAllCampaignService(prisma);

    const getAllCampaignController = new GetAllCampaignController(
      getAllCampaignService
    );

    const result = await getAllCampaignController.handle();

    res.status(201).json(result);
  }
);

campaignRoutes.get(
  "/:id",
  ensuredAuthenticated(),
  async (req: Request, res: Response) => {
    const getCampaignByIdService = new GetCampaignByIdService(prisma);

    const getCampaignByIdController = new GetCampaignByIdController(
      getCampaignByIdService
    );

    const result = await getCampaignByIdController.handle(req);

    res.status(201).json(result);
  }
);

export { campaignRoutes };
