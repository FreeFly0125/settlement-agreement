import { Request, Response } from "express";
import { SettlementService } from "services";
import { Settlement } from "types";

export const get_all_settlements = async (req: Request, res: Response) => {
  const result = await SettlementService.get_all();
  return res.status(200).send(result);
};

export const get_settlement = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const result = await SettlementService.get_by_id(id);
  return res.status(200).send(result);
};

export const new_settlement = async (req: Request, res: Response) => {
  const settlement: Settlement = { ...req.body, last_update: new Date() };
  const result = await SettlementService.insert(settlement);
  return res.status(200).send(result);
};

export const update_settlement = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const settlement: Settlement = { ...req.body, last_update: new Date() };

  const result = await SettlementService.update(id, settlement);
  return res.status(200).send(result);
};

export const delete_settlement = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const result = await SettlementService.remove(id);
  return res.status(200).send(result);
};
