import { userController } from "controllers";
import { Router } from "express";
import { authMiddleware } from "middlewares";

export const userRoute = Router();

userRoute.post("/register", authMiddleware, userController.user_register);
userRoute.post("/login", userController.user_login);
userRoute.get("/user", userController.get_all);
