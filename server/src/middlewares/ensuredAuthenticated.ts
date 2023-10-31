import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { UserPayload } from "../dtos/userPayload.dto"
import { UnauthorizedError } from "@/helpers/api-errors"

export const ensuredAuthenticated = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization

    if (!authHeaders) {
      throw new UnauthorizedError(
        "You are not authorized to access this resource",
      )
    }

    const [tokenType, token] = authHeaders.split(" ")

    if (tokenType !== "Bearer" || !token) {
      throw new UnauthorizedError("Invalid token")
    }

    const secretKey: string =
      process.env.SECRET_KEY || "8FI0UDRA7kTm1sXKO/4DVRcalvGU+NFhzkInrSskaN0="

    verify(token, secretKey, (err, decodedToken) => {
      if (err) {
        throw new UnauthorizedError(
          "You are not authorized to access this resource",
        )
      }

      const { userPayload } = decodedToken as { userPayload: UserPayload }

      req.userId = userPayload.userId
      req.role = userPayload.role

      return next()
    })
  }
}
