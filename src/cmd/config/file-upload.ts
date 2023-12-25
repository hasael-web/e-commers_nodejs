import * as multer from "multer";
import * as path from "path";

export default new (class UploadFile {
  uploadFile(value: string): any {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "src/uploads");
      },

      filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(
          null,
          `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
        );
      },
    });

    

    const uploadMulter = multer({ storage: storage }).array(value, 5);
    return uploadMulter;
  }
})();
