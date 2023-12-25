import { Request, Response, NextFunction } from "express";
import { TUser } from "../../utils/Types/UserType";

interface RequestJWT extends Request {
  user: TUser;
}

export default new (class UserAuth {
  roleAuth(role: string) {
    return (req: RequestJWT, res: Response, next: NextFunction) => {
      if (!role.includes(req.user?.role)) {
        return res
          .status(403)
          .json({ code: 403, message: "Unauthorized to access this route " });
      }
      next();
    };
  }
})();
