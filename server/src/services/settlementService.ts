import { dbHandler } from "database";
import { SettlementEntity } from "database/entities";
import { Settlement, SettlementStatus } from "types";

export const get_all = async () => {
  return await dbHandler.getRepository(SettlementEntity).find();
};

export const get_by_id = async (id: number) => {
  return await dbHandler.getRepository(SettlementEntity).findOneBy({ id: id });
};

export const insert = async (settlement: Settlement) => {
  const result = await dbHandler
    .getRepository(SettlementEntity)
    .insert(settlement);
  return result.raw[0];
};

export const update = async (id: number, settlement: Settlement) => {
  await dbHandler
    .getRepository(SettlementEntity)
    .update({ id: id }, settlement);
  return { id: id };
};

export const remove = async (id: number) => {
  await dbHandler.getRepository(SettlementEntity).delete({ id: id });
  return { id: id };
};

export const verify = async (id: number, status: SettlementStatus) => {
  await dbHandler
    .getRepository(SettlementEntity)
    .update({ id: id }, { status: status });
};
