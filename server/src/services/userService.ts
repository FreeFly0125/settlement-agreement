import { dbHandler } from "database";
import { UserEntity } from "database/entities";
import { UserProfile } from "types";

export const register = async (profile: UserProfile) => {
  await dbHandler
    .getRepository(UserEntity)
    .insert({ name: profile.name, role: profile.role });
};

export const login = async (name: string) => {
  return await dbHandler
    .getRepository(UserEntity)
    .findOneBy({ name: name });
};

export const get_all = async () => {
  return await dbHandler.getRepository(UserEntity).find();
};

export const get_by_name = async (name: string) => {
  return await dbHandler.getRepository(UserEntity).findOneBy({ name: name });
};
