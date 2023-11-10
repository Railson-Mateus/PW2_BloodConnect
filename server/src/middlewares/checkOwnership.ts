import { NextFunction, Request, Response } from "express";

import { ForbiddenError } from "@/helpers/api-erros";

export const checkOwnership = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const authenticatedUserId = req.userId;
    const admin = req.admin;

    if (authenticatedUserId === userId || admin) {
      next();
    } else {
      throw new ForbiddenError(
        "You do not have permission to perform this action"
      );
    }
  };
};
