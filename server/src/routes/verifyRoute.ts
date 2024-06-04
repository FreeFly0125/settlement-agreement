import { verifyController } from "controllers";
import { Router } from "express";

export const verifyRoute = Router();

verifyRoute.post("/verify/:id", verifyController.verify_settlement);
