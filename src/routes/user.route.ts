import { Router } from "express";
import UserController from "../controllers/user.controller";
import { celebrate, Joi, Segments } from "celebrate";

const userController = new UserController();
const userRouter = Router();

userRouter.post("/create", celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(), 
    })}), userController.create)

export default userRouter;
