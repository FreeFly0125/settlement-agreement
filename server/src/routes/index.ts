import { Router } from "express";
import { userRoute } from "./userRoute";

const appRoute = Router();

appRoute.use(userRoute);

export default appRoute;
