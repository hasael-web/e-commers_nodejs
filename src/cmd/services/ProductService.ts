import { Request, Response } from "express";
import { Repository } from "typeorm";
import { ProductEntities } from "../../entities/ProductEntities";
import { AppDataSource } from "../../data-source";
import {
  TDV,
  TDetailVarian,
  TImageFromMulter,
  TPostProduct,
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

export default new (class ProductService {
  private readonly ProductRepository: Repository<ProductEntities> =
    AppDataSource.getRepository(ProductEntities);
  private readonly VariantsRepository: Repository<VariansEntities> =
    AppDataSource.getRepository(VariansEntities);
  private readonly DetailVarianRespository: Repository<VarianDetailEntities> =
    AppDataSource.getRepository(VarianDetailEntities);

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        categories,
        description,
        features,
        material,
        name,
        varians,
      }: TPostProduct = req.body;

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
        return res
          .status(404)
          .json({ code: 404, message: "error to create new product,", error });
      }

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

      const obejct = {
        id: id_product,
        categories: value.categories,
        features: value.features,
        description: value.description,
        image_src: imageSrc,
        material: value.material,
        name: value.name,
        created_at,
        updated_at,
      };

      const newProduct = await this.ProductRepository.save(obejct);

      varians.forEach(async (varian: TDetailVarian) => {
        const id_varians = uuidv4();
        const product: any = id_product;
        const dataToVarians = {
          id: id_varians,
          products: product,
          color: varian.color,
          created_at,
          updated_at,
        };
        const responseVarians = await this.VariantsRepository.save(
          dataToVarians
        );
        if (!responseVarians) {
          return res
            .status(404)
            .json({ code: 404, messaage: "error to create varians data" });
        }

        if (varian?.varian_detail?.length > 0) {
          const validVarianDetails = varian.varian_detail.filter(
            (detail) => detail !== null
          );
          validVarianDetails.forEach(async (i: TDV) => {
            const id_varian_detail = uuidv4();
            const dataToDetail = {
              id: id_varian_detail,
              id_varians,
              size: i.size,
              price: i.price,
              stock: i.stock,
              created_at,
              updated_at,
            };
            const responseDetail = await this.DetailVarianRespository.save(
              dataToDetail
            );
            if (!responseDetail) {
              return res
                .status(404)
                .json({ code: 404, messaage: "error to create varians data" });
            }
          });
        }
      });

      // const newProduct = await this.ProductRepository.save({
      //   id: id_product,
      //   categories: value.categories,
      //   color: value.color,
      //   description: value.description,
      //   features: value.features,
      //   image_src: value.image_src,
      //   material: value.material,
      //   name: value.name,
      //   price: value.price,
      //   rating_average: value.rating_average,
      //   rating_count: value.rating_count,
      //   reviews: value.reviews,
      //   size: value.size,
      //   stock: value.stock,
      // });

      if (!newProduct) {
        return res.status(404).json({
          code: 404,
          message: "cannot save product to database",
          error,
        });
      }

      const returnVarians = varians.map((varian: any) => {
        const validDetails = varian.varian_detail.filter(
          (detail: any) => detail !== null
        );
        return {
          color: varian.color,
          varian_detail: validDetails.length > 0 ? validDetails : null,
        };
      });
      const returnToJson = {
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

      return res
        .status(201)
        .json({ code: 201, message: "success", data: returnToJson });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on create new products",
        error,
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
        relations: ["reviews", "varians", "varians.variant_detail"],
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
          variant_detail: varian.variant_detail.map((detail) => ({
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
        error,
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
        relations: ["reviews", "varians", "varians.variant_detail"],
      });

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
        varians: findOne.varians.map((varian) => ({
          id: varian.id,
          color: varian.color,
          variant_detail: varian.variant_detail.map((detail) => ({
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
        error,
      });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<Response> {
    try {
      const id_product: string = req.params.id_product;

      const response = await this.ProductRepository.createQueryBuilder(
        "product"
      )
        .delete()
        .from(ProductEntities)
        .where("product.id = :id", { id: id_product })
        .execute();

      // const response = await this.ProductRepository.find({
      //   where:{
      //     id:id_product
      //   }
      // })
      if (!response) {
        return res.status(400).json({ code: 400, message: "id not found" });
      }

      // const deleteProduct = await this.ProductRepository.delete(response)

      return res
        .status(200)
        .json({ code: 200, message: "success to delete data" });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error delete product ",
        error,
      });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
      const id_product: string = req.params.id_product;
      const {
        categories,
        description,
        features,
        material,
        name,
      }: TPostProduct = req.body;

      const { value, error } = ProductUpdate.validate({
        categories,
        description,
        features,
        material,
        name,
      });
      if (error) {
        return res
          .status(404)
          .json({ code: 404, message: "error to update data", error });
      }
      console.log(value);

      const product = await this.ProductRepository.findOne({
        where: {
          id: id_product,
        },
      });

      if (!product) {
        return res.status(404).json({
          code: 404,
          message: `id product not found = ${id_product} `,
        });
      }

      const fieldsToUpdate = {
        name: "name",
        description: "description",
        price: "price",
        stock: "stock",
        material: "material",
        categories: "categories",
        size: "size",
        color: "color",
        features: "features",
      };

      for (const field in fieldsToUpdate) {
        if (value[field] !== null || value[field] !== undefined) {
          product[fieldsToUpdate[field]] = value[field];
        }
      }

      // const imageSrc: Array<string> = [];

      // if (value.name !== null || undefined) {
      //   product.name = value.name;
      // }
      // if (value.description !== null || undefined) {
      //   product.description = value.description;
      // }
      // if (value.price !== null || undefined) {
      //   product.price = value.price;
      // }
      // if (value.stock !== null || undefined) {
      //   product.stock = value.stock;
      // }
      // if (value.material !== null || undefined) {
      //   product.material = value.material;
      // }
      // if (value.categories !== null || undefined) {
      //   product.categories = value.categories;
      // }
      // if (value.size !== null || undefined) {
      //   product.size = value.size;
      // }
      // if (value.color !== null || undefined) {
      //   product.color = value.color;
      // }
      // if (value.features !== null || undefined) {
      //   product.features = value.features;
      // }
      // if (result.length > 0) {
      //   for (let i = 0; i < result.length; i++) {
      //     if (result[i].secure_url) {
      //       imageSrc.push(result[i].secure_url);
      //     }
      //   }

      //   product.image_src = imageSrc;
      // }

      const result: TImageFromMulter[] = await cdConfig.cloudUpload(req);
      const imageSrc: string[] = result
        .filter((res) => res.secure_url)
        .map((res) => res.secure_url);

      if (imageSrc.length > 0) {
        product.image_src = imageSrc;
      }

      const updated_at = new Date();
      product.updated_at = updated_at;

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
