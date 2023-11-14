import { BadRequestError } from "@/helpers/api-erros";
import upload from "@/middlewares/uploadImage";
import { Request, Response, Router } from "express";

const uploadRoute = Router();

uploadRoute.post("/file", async (req: Request, res: Response) => {
  await new Promise<void>((resolve, reject) => {
    upload.single("photo")(req, res, (err: any) => {
      if (err) {
        console.log("resolve");
        reject(new BadRequestError("Erro ao fazer upload da imagem"));
      } else {
        resolve();
      }
    });
  });

  res.send(req.file ? req.file.filename : null);
});

export { uploadRoute };
