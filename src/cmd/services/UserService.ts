import { Request, Response } from "express";
import { TLogin, TRegister, TUser } from "../../utils/Types/UserType";
import { RegisterValidate } from "../../utils/validate/UsersValidate";
import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import * as uuid from "uuid";
import * as dotenv from "dotenv";
import { Repository } from "typeorm";
import { UserEntities } from "../../entities/UserEntities";
import { AppDataSource } from "../../data-source";
import jwt from "../../utils/jwt";
import { toString } from "lodash";
dotenv.config();

interface RequestJWT extends Request {
  user: TUser;
}

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

      const userEmailAllready = await this.UsersRepository.findOne({
        where: { email: body.email },
      });
      const userUsernameAllready = await this.UsersRepository.findOne({
        where: { username: body.username },
      });

      if (userEmailAllready) {
        return res.status(200).json({
          code: 200,
          message: `email with ${value.email} allready exits`,
        });
      }

      if (userUsernameAllready) {
        return res.status(404).json({
          code: 404,
          message: `username with  ${value.username} allready exits`,
        });
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
        role: value.role,
        created_at,
        updated_at,
      };

      const sendTotoken = {
        id: id_user,
        email: dataObject.email,
        username: dataObject.username,
        role: value.role,
      };

      const token = jwt.createJWT(sendTotoken);

      jwt.attachToCookies(res, { token });

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

      console.log("test 1");

      if (!findUser) {
        return res
          .status(404)
          .json({ code: 404, message: "user not found, Please register" });
      }

      const password = compareSync(body.password, findUser.password);

      console.log("test 2");
      if (!password) {
        return res.status(404).json({ code: 404, messaeg: "wrong password" });
      }
      console.log("test 3");

      console.log(findUser.role);

      const sendTotoken = {
        id: findUser.id,
        email: findUser.email,
        username: findUser.username,
        role: toString(findUser.role),
      };
      const token = jwt.createJWT(sendTotoken);

      jwt.attachToCookies(res, { token });

      return res
        .status(201)
        .json({ code: 201, message: "successs", data: findUser, token });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "internal server error on login user",
        error,
      });
    }
  }
  async update(req: RequestJWT, res: Response): Promise<Response> {
    try {
      const body: TRegister = req.body;

      const fieldToUpdate = {
        email: "email",
        username: "username",
        password: "password",
        role: "role",
      };
      const userUpdate = await this.UsersRepository.findOne({
        where: {
          id: req.user.id,
        },
      });

      if (!userUpdate) {
        return res.status(404).json({ code: 404, message: "id not found " });
      }

      for (const usr in fieldToUpdate) {
        if (
          body[fieldToUpdate[usr]] !== "" ||
          body[usr] !== null ||
          body[usr] !== undefined
        ) {
          userUpdate[fieldToUpdate[usr]] = body[fieldToUpdate[usr]];
        }
      }

      await this.UsersRepository.save(userUpdate);

      const sendTotoken = {
        id: userUpdate.id,
        email: userUpdate.email,
        username: userUpdate.username,
        role: userUpdate.role,
      };

      const token = jwt.createJWT(sendTotoken);
      console.log(token);
      jwt.attachToCookies(res, { token });

      return res
        .status(201)
        .json({ code: 201, message: "successs", data: userUpdate });
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
