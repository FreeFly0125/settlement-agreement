import { settlementController } from "controllers";
import { Router } from "express";

export const settlementRoute = Router();

settlementRoute.get("/settlement", settlementController.get_all_settlements);
settlementRoute.get("/settlement/:id", settlementController.get_settlement);
settlementRoute.post("/settlement", settlementController.new_settlement);
settlementRoute.put("/settlement/:id", settlementController.update_settlement);
settlementRoute.delete("/settlement/:id", settlementController.delete_settlement);
