import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { UnauthorizedError } from "@/helpers/api-erros";
import { UserPayload } from "@/models/User";

export const ensuredAuthenticated = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
      throw new UnauthorizedError(
        "You are not authorized to access this resource"
      );
    }

    const [tokenType, token] = authHeaders.split(" ");

    if (tokenType !== "Bearer" || !token) {
      throw new UnauthorizedError("Invalid token");
    }

    const secretKey: string =
      process.env.SECRET_KEY || "8FI0UDRA7kTm1sXKO/4DVRcalvGU+NFhzkInrSskaN0=";

    verify(token, secretKey, (err, decodedToken) => {
      if (err) {
        throw new UnauthorizedError(
          "You are not authorized to access this resource"
        );
      }

      const { userId, admin } = decodedToken as JwtPayload;

      req.userId = userId;
      req.admin = admin;
      return next();
    });
  };
};
