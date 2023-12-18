import { AppDataSource } from "./data-source";
import * as express from "express";
import { Response, Request } from "express";
import * as dotenv from "dotenv";
dotenv.config();

// all router imported
import { ProductRouter, ReviewRouter } from "./cmd/routes";
import cdConfig from "./cmd/config/cdConfig";

const { PORT } = process.env;

const port = PORT || 5000;
const app = express();

AppDataSource.initialize()
  .then(async () => {
    app.use(express.json());

    app.get("/", async (req: Request, res: Response): Promise<Response> => {
      try {
        return res.status(200).send("welcome to my api ");
      } catch (error) {
        return res
          .status(500)
          .json({ code: 500, message: "internal server error" });
      }
    });

    // cloud
    cdConfig.cloudConfig();

    // router
    app.use("/api/v1", ProductRouter);
    app.use("/api/v1", ReviewRouter);

    app.listen(port, () => console.log(`server running ${port}`));

    // end
  })
  .catch((error) => console.log(error));
