import { Request, Response } from "express";
import { TLogin, TRegister } from "../../utils/Types/UserType";
import { RegisterValidate } from "../../utils/validate/UsersValidate";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import * as uuid from "uuid";
import * as dotenv from "dotenv";
import { Repository } from "typeorm";
import { UserEntities } from "../../entities/UserEntities";
import { AppDataSource } from "../../data-source";
dotenv.config();

export default new (class UserResponse {
  private readonly UsersRepository: Repository<UserEntities> =
    AppDataSource.getRepository(UserEntities);

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const body: TRegister = req.body;

      const { value, error } = RegisterValidate.validate(body);
      if (error) {
        return res
          .status(404)
          .json({ code: 404, message: "validate error : ", error });
      }

      const salt = genSaltSync(10);
      const hasPassword = hashSync(value.password, salt);
      const id_user = uuid.v4();

      const created_at = new Date();
      const updated_at = new Date();

      const dataObject = {
        id: id_user,
        email: value.email,
        username: value.username,
        password: hasPassword,
        created_at,
        updated_at,
      };

      const sendTotoken = {
        id: id_user,
        email: dataObject.email,
        username: dataObject.username,
      };

      const { JWT_SECRET } = process.env;

      const time = 2 * 24 * 60 * 60;

      const token = sign(sendTotoken, JWT_SECRET, { expiresIn: time });

      const newUser = await this.UsersRepository.save(dataObject);
      if (!newUser) {
        return res.status(404).json({
          code: 404,
          messaeg: "something when wrong to create users",
          error: newUser,
        });
      }

      return res
        .status(201)
        .json({ code: 201, message: "successs", data: dataObject, token });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on register user",
        error,
      });
    }
  }
  async login(req: Request, res: Response): Promise<Response> {
    try {
      const body: TLogin = req.body;

      const findUser = await this.UsersRepository.findOne({
        where: [
          { username: body.emailORusername },
          { email: body.emailORusername },
        ],
      });

      if (!findUser) {
        return res
          .status(404)
          .json({ code: 404, message: "user not found, Please register" });
      }

      const password = compareSync(body.password, findUser.password);

      if (!password) {
        return res.status(404).json({ code: 404, messaeg: "wrong password" });
      }

      const { JWT_SECRET } = process.env;

      const time = 2 * 24 * 60 * 60;

      const sendTotoken = {
        id: findUser.id,
        email: findUser.email,
        username: findUser.username,
      };

      const token = sign(sendTotoken, JWT_SECRET, { expiresIn: time });

      return res
        .status(201)
        .json({ code: 201, message: "successs", data: findUser, token });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on register user",
        error,
      });
    }
  }
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const body: TRegister = req.body;

      return res.status(201).json({ code: 201, message: "successs", data: "" });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on register user",
        error,
      });
    }
  }
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const body: TRegister = req.body;

      return res.status(201).json({ code: 201, message: "successs", data: "" });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on register user",
        error,
      });
    }
  }
})();
