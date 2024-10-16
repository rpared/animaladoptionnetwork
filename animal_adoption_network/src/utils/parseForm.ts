import formidable, { IncomingForm } from "formidable";
import { NextApiRequest } from "next";

export const parseForm = async (req: NextApiRequest) => {
  const form = new IncomingForm();
  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
    (resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    }
  );
};
