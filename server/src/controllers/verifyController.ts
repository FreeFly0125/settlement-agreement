import { Request, Response } from "express";
import { SettlementService, UserService } from "services";
import { sockets } from "socket";
import { SettlementStatus, UserRole, VerifyPayload } from "types";

export const verify_settlement = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const payload: VerifyPayload = req.body;
  
  const settlement = await SettlementService.get_by_id(id);
  if (settlement.status !== SettlementStatus.Pending) {
    res.status(200).send({ message: "Already verified!" });
    return;
  }

  const verifier = await UserService.get_by_name(payload.verifier);
  if (!verifier) {
    res.status(404).send({ message: "No such verifier!" });
    return;
  }

  if (verifier.role !== UserRole.Verifier || verifier.name !== payload.verifier) {
    res.status(403).send({ message: "Not valid verifier!" });
    return;
  }

  await SettlementService.verify(id, payload.status);

  sockets.broadcast(
    JSON.stringify({
      type: "update",
      data: {
        id: id,
        title: settlement.title,
        description: settlement.description,
        proposer: settlement.proposer,
        verifier: settlement.verifier,
        status: payload.status,
      },
    })
  );

  res.status(200).send({ id: id, status: payload.status });
};
