import { sign } from "jsonwebtoken";

class GenerateToken {
  async execute(userId: string, admin: boolean) {
    const secretKey: string =
      process.env.SECRET_KEY || "8FI0UDRA7kTm1sXKO/4DVRcalvGU+NFhzkInrSskaN0=";

    const token = sign({ userId, admin }, secretKey, {
      subject: userId,

      expiresIn: "10h",
    });

    return token;
  }
}

export { GenerateToken };
