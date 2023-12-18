import { Request, Response } from "express";
import { TPostReview } from "../../utils/Types/ReviewType";
import { v4 as uuidv4 } from "uuid";

export default new (class ReviewService {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const body: TPostReview = req.body;

      const id_review: string = uuidv4();

      return res
        .status(201)
        .json({ code: 201, message: "success", data: body });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on create review",
        error,
      });
    }
  }
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;
      return res.status(201).json({ code: 201, message: "success", data: "" });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on get all reviews",
        error,
      });
    }
  }
  async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;
      return res.status(201).json({ code: 201, message: "success", data: "" });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on get one review",
        error,
      });
    }
  }
  async deleteReview(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;
      return res.status(201).json({ code: 201, message: "success", data: "" });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on delete review",
        error,
      });
    }
  }
  async updateReview(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body;
      return res.status(201).json({ code: 201, message: "success", data: "" });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on update review",
        error,
      });
    }
  }
})();
