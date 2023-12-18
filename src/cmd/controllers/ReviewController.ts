import { Response, Request } from "express";
import ReviewService from "../services/ReviewService";

export default new (class ReviewController {
  create(req: Request, res: Response) {
    ReviewService.create(req, res);
  }
  getAll(req: Request, res: Response) {
    ReviewService.getAll(req, res);
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
