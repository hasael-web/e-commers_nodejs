import { Request, Response } from "express";
import { TPostReview } from "../../utils/Types/ReviewType";
import { v4 as uuidv4 } from "uuid";
import { Repository } from "typeorm";
import { ReviewsEntities } from "../../entities/ReviewsEntities";
import { AppDataSource } from "../../data-source";
import { ReviewValidate } from "../../utils/validate/ReviewValidate";
import { ProductEntities } from "../../entities/ProductEntities";

export default new (class ReviewService {
  private readonly ReviewsRepository: Repository<ReviewsEntities> =
    AppDataSource.getRepository(ReviewsEntities);
  private readonly ProductRepository: Repository<ProductEntities> =
    AppDataSource.getRepository(ProductEntities);

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const body: TPostReview = req.body;

      const { value, error } = ReviewValidate.validate(body);
      if (error) {
        return res
          .status(404)
          .json({ code: 404, message: "validate error :", error });
      }
      const id_review: string = uuidv4();

      const object = {
        id: id_review,
        id_user: value.id_user,
        username: value.username,
        rating: value.rating,
        comment: value.comment,
        id_product: value.id_product,
      };

      // const findProduct = await this.ProductRepository.findOne({
      //   where: {
      //     id: object.id_product,
      //   },
      //   relations: {
      //     reviews: true,
      //   },
      // });
      // if (findProduct) {
      //   let rating_user: number;
      //   for (let i = 0; i < findProduct.reviews.length; i++) {
      //     rating_user += findProduct.reviews[i].rating;
      //   }
      //   const count = findProduct.reviews.length;
      //   const average = rating_user / count;
      //   findProduct.rating_average = average;
      // }

      const newReview = await this.ReviewsRepository.save(object);
      if (!newReview) {
        return res
          .status(404)
          .json({ code: 404, message: "error id_product not found" });
      }

      return res
        .status(201)
        .json({ code: 201, message: "success", data: newReview });
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
