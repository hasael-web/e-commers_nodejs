import { Request, Response } from "express";
import { Connection, Repository, createConnection, getManager } from "typeorm";
import { ProductEntities } from "../../entities/ProductEntities";
import { AppDataSource } from "../../data-source";
import {
  TDV,
  TDetailVarian,
  TImageFromMulter,
  TPostProduct,
  TUpdateProduct,
} from "../../utils/Types/ProductType";
import { unlink } from "fs";
import {
  ProductUpdate,
  ProductValidate,
} from "../../utils/validate/ProductValidate";
import { v4 as uuidv4 } from "uuid";
import cdConfig from "../config/cdConfig";
import { VariansEntities } from "../../entities/VariansEntities";
import { VarianDetailEntities } from "../../entities/VarianDetailEntities";
import { TUser } from "../../utils/Types/UserType";
import { toString } from "lodash";
import { UserEntities } from "../../entities/UserEntities";

interface RequestJWT extends Request {
  user: TUser;
}

export default new (class ProductService {
  private readonly ProductRepository: Repository<ProductEntities> =
    AppDataSource.getRepository(ProductEntities);
  private readonly VariantsRepository: Repository<VariansEntities> =
    AppDataSource.getRepository(VariansEntities);
  private readonly DetailVarianRespository: Repository<VarianDetailEntities> =
    AppDataSource.getRepository(VarianDetailEntities);
  private readonly UserRepository: Repository<UserEntities> =
    AppDataSource.getRepository(UserEntities);

  async create(req: RequestJWT, res: Response): Promise<Response> {
    try {
      const {
        categories,
        description,
        features,
        material,
        name,
        varians,
      }: TPostProduct = req.body;

      // console.log(varians);

      const { value, error } = ProductValidate.validate({
        categories,
        description,
        features,
        material,
        name,
      });

      const created_at = new Date();
      const updated_at = new Date();
      const id_product: string = uuidv4();

      if (error) {
        return res.status(404).json({
          code: 404,
          message: "error to create new product,",
          error: error.details[0],
        });
      }

      let returnToJson: any = {};

      console.log("test 1");

      await AppDataSource.transaction(async (transactionalEntityManager) => {
        // membuat products
        const imageSrc: Array<string> = [];
        const result: TImageFromMulter[] = await cdConfig.cloudUpload(req);

        for (let i = 0; i < result.length; i++) {
          if (result[i].secure_url) {
            imageSrc.push(result[i].secure_url);
          }
          if (result.length > 0) {
            unlink(
              `${req.files[i].destination}/${req.files[i].filename}`,
              (err) => {
                if (err) {
                  console.error("Error deleting file:", err);
                } else {
                  console.log("File deleted successfully");
                }
              }
            );
          }
        }
        const id_user: string = req.user.id;
        const user = await this.UserRepository.findOne({
          where: {
            id: id_user,
          },
        });

        const obejct = {
          id: id_product,
          id_user: user,
          categories: value.categories,
          features: value.features,
          description: value.description,
          image_src: imageSrc,
          material: value.material,
          name: value.name,
          created_at,
          updated_at,
        };

        const newProduct = await transactionalEntityManager.save(
          ProductEntities,
          obejct
        );

        if (!newProduct) {
          return res.status(404).json({
            code: 404,
            message: "cannot save product to database",
            error,
          });
        }

        // const fieldVarians = {
        //   color: "color",
        //   varian_detail: "varian_detail",
        // };

        const product: any = id_product;

        for (let index = 0; index < varians.length; index++) {
          const id_varians = uuidv4();
          const dataToVarians = {
            id: id_varians,
            products: product,
            color: varians[index].color,
            created_at,
            updated_at,
          };
          // varians
          const variansReponse = await transactionalEntityManager.save(
            VariansEntities,
            dataToVarians
          );
          if (!variansReponse) {
            return res
              .status(404)
              .json({ code: 404, message: "cannot save varians" });
          }
          const id_varian_detail = uuidv4();

          for (let j = 0; j < varians[index].varian_detail.length; j++) {
            const check = varians[index].varian_detail[j];
            if (check !== undefined) {
              const dataToDetail = {
                id: id_varian_detail,
                id_varians,
                size: check.size,
                price: check.price,
                stock: check.stock,
                created_at,
                updated_at,
              };
              const responseDetail = await transactionalEntityManager.save(
                VarianDetailEntities,
                dataToDetail
              );
              if (!responseDetail) {
                throw new Error("error creating variant detail data");
              }
            }
          }

          // const indexVarianDetail = varians[index].varian_detail.length - 1;
          // if (
          //   varians[index].varian_detail.length > 0 &&
          //   varians[index].varian_detail[indexVarianDetail] !== null &&
          //   varians[index].varian_detail[indexVarianDetail] !== undefined
          // ) {
          //   for (let j = 0; j < varians[index].varian_detail.length; j++) {
          //     const size = varians[index].varian_detail[indexVarianDetail].size;
          //     const price =
          //       varians[index].varian_detail[indexVarianDetail].price;
          //     const stock =
          //       varians[index].varian_detail[indexVarianDetail].stock;

          //     const dataToDetail = {
          //       id: id_varian_detail,
          //       id_varians,
          //       size: size,
          //       price: price,
          //       stock: stock,
          //       created_at,
          //       updated_at,
          //     };
          //     const responseDetail = await transactionalEntityManager.save(
          //       VarianDetailEntities,
          //       dataToDetail
          //     );
          //     if (!responseDetail) {
          //       throw new Error("error creating variant detail data");
          //     }
          //   }
          // }
        }

        // }

        const returnVarians = varians.map((varian: any) => {
          const validDetails = varian.varian_detail.filter(
            (detail: any) => detail !== null
          );
          return {
            color: varian.color,
            varian_detail: validDetails.length > 0 ? validDetails : null,
          };
        });
        returnToJson = {
          id: obejct.id,
          name: obejct.name,
          material: obejct.material,
          description: obejct.description,
          image_src: imageSrc,
          features: features,
          varians: returnVarians,
          categories: categories,
          created_at,
          updated_at,
        };
      });

      return res
        .status(201)
        .json({ code: 201, message: "success", data: returnToJson });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        code: 500,
        message: "internal server error on create new products",
        error: error.message,
      });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const findAllProducts = await this.ProductRepository.find({
        select: [
          "id",
          "name",
          "description",
          "material",
          "categories",
          "features",
          "image_src",
          "rating_average",
          "rating_count",
          "created_at",
          "updated_at",
        ],
        relations: ["reviews", "varians", "varians.varian_detail"],
      });

      for (let i = 0; i < findAllProducts.length; i++) {
        if (findAllProducts[i].reviews.length > 0) {
          const review = findAllProducts[i].reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          const averageRating = review / findAllProducts[i].reviews.length;
          findAllProducts[i].rating_average = Math.round(averageRating);
          findAllProducts[i].rating_count = findAllProducts[i].reviews.length;
          await this.ProductRepository.save(findAllProducts);
        }
      }

      const formattedProducts = findAllProducts.map((product) => ({
        id: product.id,
        name: product.name,
        description: product.description,
        material: product.material,
        categories: product.categories,
        features: product.features,
        image_src: product.image_src,
        rating_average: product.rating_average,
        rating_count: product.rating_count,
        created_at: product.created_at,
        updated_at: product.updated_at,
        varians: product.varians.map((varian) => ({
          id: varian.id,
          color: varian.color,
          variant_detail: varian.varian_detail.map((detail) => ({
            id: detail.id,
            size: detail.size,
            stock: detail.stock,
            price: detail.price,
          })),
        })),
      }));
      // const convertProducts: TGetProduct[] = [];

      // for (let i = 0; i < findAllProducts.length; i++) {
      //   convertProducts[i].id = findAllProducts[i].id;
      //   convertProducts[i].name = findAllProducts[i].name;
      //   convertProducts[i].description = findAllProducts[i].description;
      //   convertProducts[i].price = findAllProducts[i].price;
      //   convertProducts[i].stock = findAllProducts[i].stock;
      //   convertProducts[i].material = findAllProducts[i].material;
      //   convertProducts[i].categories = findAllProducts[i].categories;
      //   convertProducts[i].features = findAllProducts[i].features;
      //   convertProducts[i].image_src = findAllProducts[i].image_src;
      //   convertProducts[i].size = findAllProducts[i].size;
      //   convertProducts[i].color = findAllProducts[i].color;
      //   convertProducts[i].rating_average = findAllProducts[i].rating_average;
      //   convertProducts[i].rating_count = findAllProducts[i].rating_count;
      //   convertProducts[i].created_at = findAllProducts[i].created_at;
      //   convertProducts[i].updated_at = findAllProducts[i].updated_at;
      // }

      // console.log(convertProducts);

      return res
        .status(200)
        .json({ code: 200, message: "success", data: formattedProducts });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on find all products",
        error: error.message,
      });
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const id_product: any = req.params.id_product;

      const findOne = await this.ProductRepository.findOne({
        where: {
          id: id_product,
        },
        relations: ["reviews", "varians", "varians.varian_detail"],
      });

      if (!findOne) {
        return res.status(404).json({ code: 404, message: "id not found" });
      }

      if (findOne.reviews.length > 0) {
        const rating = findOne.reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        const ratingAverage = rating / findOne.reviews.length;

        findOne.rating_average = Math.round(ratingAverage);
        findOne.rating_count = findOne.reviews.length;

        this.ProductRepository.save(findOne);
      }

      const formattedProduct = {
        id: findOne.id,
        name: findOne.name,
        description: findOne.description,
        material: findOne.material,
        categories: findOne.categories,
        features: findOne.features,
        image_src: findOne.image_src,
        rating_average: findOne.rating_average,
        rating_count: findOne.rating_count,
        created_at: findOne.created_at,
        updated_at: findOne.updated_at,
        reviews: findOne.reviews,
        varians: findOne.varians.map((varian) => ({
          id: varian.id,
          color: varian.color,
          varian_detail: varian.varian_detail.map((detail) => ({
            id: detail.id,
            size: detail.size,
            stock: detail.stock,
            price: detail.price,
          })),
        })),
      };

      if (!findOne) {
        return res.status(404).json({
          code: 404,
          message: `cannot find product with id ${id_product}, ${id_product} not found`,
        });
      }
      return res
        .status(200)
        .json({ code: 200, message: "success", data: formattedProduct });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on findOne ",
        error: error.message,
      });
    }
  }

  async deleteProduct(req: RequestJWT, res: Response): Promise<Response> {
    try {
      const id_product: string = req.params.id_product;

      const findProduct = await this.ProductRepository.findOne({
        where: {
          id: id_product,
        },
        relations: {
          id_user: true,
        },
      });

      console.log(findProduct);

      if (findProduct.id_user.id !== req.user.id) {
        return res.status(403).json({
          code: 403,
          message: "id user berbeda, product tidak bisa dihapus",
        });
      }

      await this.ProductRepository.remove(findProduct);

      return res
        .status(200)
        .json({ code: 200, message: "success to delete data" });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error delete product ",
        error: error.message,
      });
    }
  }

  async updateProduct(req: RequestJWT, res: Response): Promise<Response> {
    try {
      const id_product: string = req.params.id_product;
      const {
        categories,
        description,
        features,
        material,
        name,
      }: TUpdateProduct = req.body;

      const { value, error } = ProductUpdate.validate({
        name,
        description,
        material,
        categories,
        features,
      });
      if (error) {
        return res
          .status(404)
          .json({ code: 404, message: "error to update data", error });
      }

      // mencari product yang mau di update
      const product = await this.ProductRepository.findOne({
        where: {
          id: id_product,
        },
        relations: {
          varians: true,
        },
      });

      if (!product) {
        return res.status(404).json({
          code: 404,
          message: `id product not found = ${id_product} `,
        });
      }

      // update prodoct

      const fieldsToUpdate = {
        name: "name",
        description: "description",
        material: "material",
        categories: "categories",
        features: "features",
      };

      for (const field in fieldsToUpdate) {
        if (value[field] !== null || value[field] !== undefined) {
          product[fieldsToUpdate[field]] = value[field];
        }
      }

      const result: TImageFromMulter[] = await cdConfig.cloudUpload(req);
      const imageSrc: string[] = result
        .filter((res) => res.secure_url)
        .map((res) => res.secure_url);

      if (imageSrc.length > 0) {
        product.image_src = imageSrc;
      }

      const updated_at = new Date();
      product.updated_at = updated_at;

      // update varians products

      // save perubahan
      await this.ProductRepository.save(product);

      return res
        .status(200)
        .json({ code: 200, message: "success", data: product });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on update product",
        error,
      });
    }
  }
})();
