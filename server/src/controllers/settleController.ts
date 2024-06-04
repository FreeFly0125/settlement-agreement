import { Request, Response } from "express";
import { SettlementService } from "services";
import { sockets } from "socket";
import { Settlement, SettlementStatus } from "types";

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

  sockets.broadcast(
    JSON.stringify({
      type: "new",
      data: {
        id: result.id,
        title: settlement.title,
        price: settlement.price,
        proposer: settlement.proposer,
        verifier: settlement.verifier,
        status: SettlementStatus.Pending,
      },
    })
  );

  return res.status(200).send(result);
};

export const update_settlement = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const settlement: Settlement = { ...req.body, last_update: new Date() };

  const prev = await SettlementService.get_by_id(id);
  if (prev.status !== SettlementStatus.Pending)
    return res.status(400).send("Failed");

  const result = await SettlementService.update(id, settlement);

  sockets.broadcast(
    JSON.stringify({
      type: "update",
      data: {
        id: id,
        title: settlement.title,
        price: settlement.price,
        proposer: settlement.proposer,
        verifier: settlement.verifier,
        status: settlement.status,
      },
    })
  );

  return res.status(200).send(result);
};

export const delete_settlement = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const result = await SettlementService.remove(id);

  sockets.broadcast(
    JSON.stringify({
      type: "delete",
      data: {
        id: id,
      },
    })
  );

  return res.status(200).send(result);
};
