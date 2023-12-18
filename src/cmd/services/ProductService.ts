import { Request, Response } from "express";
import { Repository } from "typeorm";
import { ProductEntities } from "../../entities/ProductEntities";
import { AppDataSource } from "../../data-source";
import { TImageFromMulter, TPostProduct } from "../../utils/Types/ProductType";
import { unlink } from "fs";
import {
  ProductUpdate,
  ProductValidate,
} from "../../utils/validate/ProductValidate";
import { v4 as uuidv4 } from "uuid";
import cdConfig from "../config/cdConfig";

export default new (class ProductService {
  private readonly ProductRepository: Repository<ProductEntities> =
    AppDataSource.getRepository(ProductEntities);

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        categories,
        color,
        description,
        features,
        material,
        name,
        price,
        size,
        stock,
      }: TPostProduct = req.body;

      const { value, error } = ProductValidate.validate({
        categories,
        color,
        description,
        features,
        material,
        name,
        price,
        size,
        stock,
      });

      if (error) {
        return res
          .status(404)
          .json({ code: 404, message: "error to create new product,", error });
      }

      const created_at = new Date();
      const updated_at = new Date();
      const id_product: string = uuidv4();

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
        color: value.color,
        stock: value.stock,
        categories: value.categories,
        features: value.features,
        description: value.description,
        image_src: imageSrc,
        material: value.material,
        name: value.name,
        price: value.price,
        size: value.size,
        created_at,
        updated_at,
      };

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

      const newProduct = await this.ProductRepository.save(obejct);

      if (!newProduct) {
        return res.status(404).json({
          code: 404,
          message: "cannot save product to database",
          error,
        });
      }

      const returnToJson = {
        id: obejct.id,
        name: obejct.name,
        color: color,
        stock: obejct.stock,
        material: obejct.material,
        description: obejct.description,
        image_src: imageSrc,
        features: features,
        price: price,
        size: size,
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
        relations: {
          reviews: true,
        },
      });

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
        .json({ code: 200, message: "success", data: findAllProducts });
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

      const findOne = await this.ProductRepository.find({
        where: {
          id: id_product,
        },
        relations: {
          reviews: true,
        },
      });
      if (!findOne) {
        return res.status(404).json({
          code: 404,
          message: `cannot find product with id ${id_product}, ${id_product} not found`,
        });
      }
      return res
        .status(200)
        .json({ code: 200, message: "success", data: findOne });
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
        color,
        description,
        features,
        material,
        name,
        price,
        size,
        stock,
      }: TPostProduct = req.body;

      const { value, error } = ProductUpdate.validate({
        categories,
        color,
        description,
        features,
        material,
        name,
        price,
        size,
        stock,
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

      const imageSrc: Array<string> = [];
      const result: TImageFromMulter[] = await cdConfig.cloudUpload(req);

      if (value.name !== null || undefined) {
        product.name = value.name;
      }
      if (value.description !== null || undefined) {
        product.description = value.description;
      }
      if (value.price !== null || undefined) {
        product.price = value.price;
      }
      if (value.stock !== null || undefined) {
        product.stock = value.stock;
      }
      if (value.material !== null || undefined) {
        product.material = value.material;
      }
      if (value.categories !== null || undefined) {
        product.categories = value.categories;
      }
      if (value.size !== null || undefined) {
        product.size = value.size;
      }
      if (value.color !== null || undefined) {
        product.color = value.color;
      }
      if (value.features !== null || undefined) {
        product.features = value.features;
      }
      if (result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          if (result[i].secure_url) {
            imageSrc.push(result[i].secure_url);
          }
        }

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
