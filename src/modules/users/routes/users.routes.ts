import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UsersController from "../controllers/UsersController";
import isAutenticated from "../middlewares/isAuthenticated";

const userRouter = Router();
const userController = new UsersController();

userRouter.get("/", isAutenticated, userController.index);
userRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create
);

export default userRouter;
