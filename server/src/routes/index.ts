import { Router } from "express";
import { settlementRoute } from "./settlementRoute";
import { userRoute } from "./userRoute";
import { verifyRoute } from "./verifyRoute";

const appRoute = Router();

appRoute.use(userRoute);
appRoute.use(settlementRoute);
appRoute.use(verifyRoute);

export default appRoute;
