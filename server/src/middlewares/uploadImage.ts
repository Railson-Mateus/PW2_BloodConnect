import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    cb(null, process.cwd() + "/src/public/upload");
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    // Altere essa variável de ambiente para .jpeg, .jpg ou .png.
    cb(null, Date.now() + ".png");
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const imgExtension = ["image/png", "image/jpg", "image/jpeg"].find(
    (acceptedFormat) => acceptedFormat === file.mimetype
  );

  if (imgExtension) {
    return cb(null, true);
  }
  return cb(null, false);
};

const upload = multer({ storage, fileFilter });

export default upload;
