import { NextFunction, Request, Response } from "express";
import jwt from "../../utils/jwt";
import { TUser } from "../../utils/Types/UserType";
import { JwtPayload } from "jsonwebtoken";

interface RequestJWT extends Request {
  user: TUser;
}

export default new (class Authentication {
  async auth(
    req: RequestJWT,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    let token: string;

    const authHeaders = req.headers.authorization;
    if (authHeaders && authHeaders.startsWith("Bearer")) {
      token = authHeaders.split(" ")[1];
    } else if (req.cookies.token_user) {
      token = req.cookies.token_user;
    }

    // if(!authHeaders) {
    //   return res.status()
    // }

    if (!token) {
      return res
        .status(403)
        .json({ code: 403, message: "Authentication vailed" });
    }

    try {
      const payload: JwtPayload = jwt.isTokenValid({ token });
      // const currentTime = Math.floor(Date.now() / 1000);
      // if (payload.exp && payload.exp < currentTime) {
      //   return res.status(404).json({ code: 404, message: "token expired" });
      // }
      console.log(payload);

      req.user = {
        id: payload.result.id,
        email: payload.result.email,
        username: payload.result.username,
        role: payload.result.role,
      };

      next();
    } catch (error) {
      return res.status(500).json({
        code: 500,
        message: "middleware error to check data users",
        error,
      });
    }
  }
})();
