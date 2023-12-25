import { Response, Request } from "express";
import ReviewService from "../services/ReviewService";
import { TUser } from "../../utils/Types/UserType";

interface RequestJWT extends Request {
  user: TUser;
}

export default new (class ReviewController {
  create(req: RequestJWT, res: Response) {
    ReviewService.create(req, res);
  }
  getOne(req: Request, res: Response) {
    ReviewService.getOne(req, res);
  }
  deleteReview(req: Request, res: Response) {
    ReviewService.deleteReview(req, res);
  }
  updateReview(req: Request, res: Response) {
    ReviewService.updateReview(req, res);
  }
})();
