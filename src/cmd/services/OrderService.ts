import { Repository } from "typeorm";
import { OrderEntities } from "../../entities/OrderEntities";
import { AppDataSource } from "../../data-source";
import { Request, Response } from "express";
import { TCustomerTransaction, TPostOrder } from "../../utils/Types/OrderType";
import { PostOrderValidate } from "../../utils/validate/OrderValidate";
import { v4 } from "uuid";
import { ProductEntities } from "../../entities/ProductEntities";
import { RequestAuth } from "../../utils/Types/AuthUserType/RequestType";
import { UserEntities } from "../../entities/UserEntities";
import { TransactionValidate } from "../../utils/validate/OrderValidate/TransactionValidate";
import { TransactionEntities } from "../../entities/TransactionEntities";
import { object } from "joi";

export default new (class OrderService {
  private readonly OrderRepository: Repository<OrderEntities> =
    AppDataSource.getRepository(OrderEntities);
  private readonly ProductRepository: Repository<ProductEntities> =
    AppDataSource.getRepository(ProductEntities);
  private readonly UsersRespository: Repository<UserEntities> =
    AppDataSource.getRepository(UserEntities);
  private readonly TransactionRepository: Repository<TransactionEntities> =
    AppDataSource.getRepository(TransactionEntities);

  async create(req: RequestAuth, res: Response): Promise<Response> {
    try {
      const body: TPostOrder = req.body;

      const { value, error } = PostOrderValidate.validate(body);
      if (error) {
        return res.status(404).json({
          code: 404,
          message: "validate error",
          error: error.details,
          error_message: error.message,
        });
      }

      const id = v4();
      const subtotal = value.price * value.quantity;
      const status = "pendding";
      const updated_at = new Date();
      const created_at = new Date();
      const id_user = req.user.id;

      // find product

      const findProduct = await this.ProductRepository.findOne({
        where: {
          id: value.id_product,
        },
      });
      if (!findProduct) {
        return res
          .status(404)
          .json({ code: 404, message: "id product not found" });
      }

      const findUser = await this.UsersRespository.findOne({
        where: {
          id: id_user,
        },
      });

      if (!findUser) {
        return res
          .status(404)
          .json({ code: 404, message: "id user not found" });
      }

      const object = {
        id,
        product: findProduct,
        price: value.price,
        user: findUser,
        quantity: value.quantity,
        status,
        subtotal,
        created_at,
        updated_at,
      };

      const order = this.OrderRepository.create(object);
      if (!order) {
        return res.status(404).json({
          code: 404,
          message: "create order error,something when wrong",
          error: order,
        });
      }

      const response = await this.OrderRepository.save(order);

      if (response) {
        const returnTojson = {
          id: response.id,
          price: response.price,
          quantity: response.quantity,
          subtotal: response.subtotal,
          status: response.status,
          created_at: response.created_at,
          updated_at: response.updated_at,
          product: response.product,
          user: {
            id: response.user.id,
            email: response.user.email,
            username: response.user.username,
            role: response.user.role,
            profile_image: response.user.profile_image,
          },
        };
        return res.status(201).json({ code: 201, data: returnTojson });
      }
      return res.status(404).json({
        code: 404,
        message: "cannot create order,something when wrong",
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on create order",
        error_1: error,
        error_2: error.message,
      });
    }
  }

  async userTransaction(req: RequestAuth, res: Response): Promise<Response> {
    try {
      const body: TCustomerTransaction = req.body;

      const { value, error } = TransactionValidate.validate(body);

      if (error) {
        return res.status(404).json({
          code: 404,
          message: "validate error",
          error_1: error.details,
          erro_2: error.message,
        });
      }
      //   const username = req.user.username;
      const id_user = req.user.id;
      const id = v4();
      const created_at = new Date();
      const updated_at = new Date();

      const findOrder = await this.OrderRepository.findOne({
        where: {
          id: value.id_order,
        },
      });

      if (!findOrder) {
        return res
          .status(404)
          .json({ code: 404, message: "id order not found" });
      }

      const findOrderExits = await this.OrderRepository.findOne({
        where: {
          id: value.id_order,
        },
        relations: {
          transctions: true,
          user: true,
        },
      });

      console.log(findOrderExits);

      const findUser = await this.UsersRespository.findOne({
        where: {
          id: id_user,
        },
        relations: {
          order: true,
        },
      });

      if (!findUser) {
        return res
          .status(404)
          .json({ code: 404, message: "id user not found" });
      }

      if (value.total_price !== findOrder.subtotal) {
        return res
          .status(404)
          .json({ code: 404, message: "subtotals are not the same" });
      }

      const object = {
        id,
        order: findOrder,
        total_price: value.total_price,
        user: findUser,
        updated_at,
        created_at,
      };

      const transactionCreate = this.TransactionRepository.create(object);
      const response = await this.TransactionRepository.save(transactionCreate);
      if (response) {
        findOrder.status = "paid";
        const orderResponse = await this.OrderRepository.save(findOrder);

        if (orderResponse) {
          const findUpateOrder = await this.OrderRepository.findOne({
            where: {
              id: value.id_order,
            },
          });
          return res.status(201).json({
            code: 201,
            message: "transaction success",
            data: findUpateOrder,
          });
        }
      }
      return res.status(404).json({
        code: 404,
        message: "something when wrong in created transaction",
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message:
          "internal server error, something when wrong in customer transaction",
      });
    }
  }

  async findByCustomer(req: RequestAuth, res: Response): Promise<Response> {
    try {
      const findUser = await this.UsersRespository.findOne({
        where: {
          id: req.user.id,
        },
        relations: {
          order: true,
        },
      });

      return res.status(200).json({ code: 200, data: findUser.order });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on find order by customer",
      });
    }
  }
  async findBySupplier(req: RequestAuth, res: Response): Promise<Response> {
    try {
      if (req.user.role === "supplier") {
        // const findUser = await this.UsersRespository.findOne({
        //   where: {
        //     id: req.user.id,
        //   },
        //   relations: {
        //     products: true,
        //   },
        // });
        // console.log(findUser.products);

        // let findProduct: ProductEntities[];

        // console.log("nothing");

        // for (let i = 0; i < findUser.products.length; i++) {
        //   const product = await this.ProductRepository.findOne({
        //     where: {
        //       id: findUser.products[i].id,
        //     },
        //   });
        //   console.log("nothing");

        //   findProduct.push(product);
        // }
        // console.log("nothing");

        // if (findProduct.length > 0) {
        //   return res.status(200).json({ code: 200, data: findProduct });
        // }

        const findUser = await this.UsersRespository.findOne({
          where: {
            id: req.user.id,
          },
        });

        const findProduct = await this.ProductRepository.findOne({
          where: {
            id_user: {
              id: req.user.id,
            },
          },
          relations: {
            order: true,
          },
        });

        const data: Array<any> = [];
        for (let i = 0; i < findProduct.order.length; i++) {
          const findOrder = await this.OrderRepository.findOne({
            where: {
              id: findProduct.order[i].id,
            },
            relations: ["user"],
          });

          const object = {
            id: findOrder.id,
            price: findOrder.price,
            quantity: findOrder.quantity,
            subtotal: findOrder.subtotal,
            status: findOrder.status,
            created_at: findOrder.created_at,
            updated_at: findOrder.updated_at,
            user: {
              id: findOrder.user.id,
              username: findOrder.user.username,
              role: findOrder.user.role,
            },
          };

          data.push(object);
        }

        return res.status(404).json({ code: 200, data: data });
      }
      return res.status(404).json({ code: 404, message: "user not found" });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on find order by supplier",
      });
    }
  }
})();
