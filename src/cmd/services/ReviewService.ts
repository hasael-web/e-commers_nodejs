import { Request, Response } from "express";
import { TPostReview } from "../../utils/Types/ReviewType";
import { v4 as uuidv4 } from "uuid";
import { Repository } from "typeorm";
import { ReviewsEntities } from "../../entities/ReviewsEntities";
import { AppDataSource } from "../../data-source";
import { ReviewValidate } from "../../utils/validate/ReviewValidate";

import { TUser } from "../../utils/Types/UserType";
import { UserEntities } from "../../entities/UserEntities";
interface RequestJWT extends Request {
  user: TUser;
}

export default new (class ReviewService {
  private readonly ReviewsRepository: Repository<ReviewsEntities> =
    AppDataSource.getRepository(ReviewsEntities);
  private readonly UserRepository: Repository<UserEntities> =
    AppDataSource.getRepository(UserEntities);

  async create(req: RequestJWT, res: Response): Promise<Response> {
    try {
      const body: TPostReview = req.body;

      const { value, error } = ReviewValidate.validate(body);
      if (error) {
        return res
          .status(404)
          .json({ code: 404, message: "validate error :", error });
      }

      const id_review: string = uuidv4();
      const id_user = req.user.id;
      const username = req.user.username;
      const user = await this.UserRepository.findOne({
        where: {
          id: id_user,
        },
      });

      if (!user) {
        return res
          .status(404)
          .json({ code: 404, message: "id user not found" });
      }

      

      const object = {
        id: id_review,
        id_user: user,
        username,
        rating: value.rating,
        comment: value.comment,
        id_product: value.id_product,
      };

      const newReview = await this.ReviewsRepository.save({
        comment: object.comment,
        id: object.id,
        id_product: object.id_product,
        id_user: object.id_user,
        rating: object.rating,
        username: object.username,
      });
      if (!newReview) {
        return res
          .status(404)
          .json({ code: 404, message: "error id_product not found" });
      }

      const sendToJson = {
        id: newReview.id,
        id_user: newReview.id_user.id,
        username: newReview.username,
        rating: newReview.rating,
        comment: newReview.comment,
        id_product: newReview.id_product,
      };

      return res
        .status(201)
        .json({ code: 201, message: "success", data: sendToJson });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on create review",
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
      const { id_review } = req.body;

      if (!id_review) {
        return res
          .status(404)
          .json({ code: 404, message: "id_review required" });
      }

      const findReview = await this.ReviewsRepository.findOne({
        where: {
          id: id_review,
        },
      });

      if (!findReview) {
        return res
          .status(404)
          .json({ code: 404, message: `id not found = ${id_review}` });
      }

      this.ReviewsRepository.remove(findReview);

      return res.status(201).json({
        code: 201,
        message: "success",
        data: "success to delete review",
      });
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
      const body: { rating: number; comment: string } = req.body;
      const id_review = req.params.id_review;

      const objectToUpadte = {
        rating: "rating",
        comment: "comment",
      };

      const updatReview = await this.ReviewsRepository.findOne({
        where: {
          id: id_review,
        },
      });

      for (const value in objectToUpadte) {
        if (updatReview[value] !== null || updatReview[value] !== undefined) {
          updatReview[value] = body[value];
        }
      }

      await this.ReviewsRepository.save(updatReview);

      return res
        .status(201)
        .json({ code: 201, message: "success", data: updatReview });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on update review",
        error,
      });
    }
  }
})();
