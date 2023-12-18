import { Request } from "express";
import * as dotenv from "dotenv";
import { v2 as cd } from "cloudinary";

dotenv.config();

const { CLOUD_NAME, CLOUD_APIKEY, CLOUD_APISECRET } = process.env;

export default new (class CDconfig {
  cloudConfig() {
    return cd.config({
      cloud_name: CLOUD_NAME,
      api_key: CLOUD_APIKEY,
      api_secret: CLOUD_APISECRET,
    });
  }
  async cloudUpload(req: Request): Promise<any> {
    const uploadedFiles = [];

    if (req.files && Array.isArray(req.files)) {
      // Jika menggunakan multiple file upload
      for (const file of req.files) {
        const result = await cd.uploader.upload(file.path, {
          resource_type: "auto",
        });
        uploadedFiles.push(result);
      }
    } else {
      throw new Error("Tidak ada file yang diunggah.");
    }

    return uploadedFiles;
  }
})();
