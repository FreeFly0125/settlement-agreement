import { Request, Response } from "express";
import { UserService } from "services";
import { UserProfile, UserRole } from "types";

export const user_register = async (req: Request, res: Response) => {
  const profile: UserProfile = req.body;
  if (profile.role !== UserRole.Proposer && profile.role !== UserRole.Verifier) {
    res.status(400).send({ message: "Invalid payload!" });
      return;
  }
  try {
    const pre = await UserService.get_by_name(profile.name);
    if (pre) {
      res.status(409).send({ message: "Already registered!" });
      return;
    }

    await UserService.register(profile);
    res.status(200).send({ status: "Success" });
  } catch (e) {
    res.status(500).send({ status: "Failed", message: e });
  }
};

export const user_login = async (req: Request, res: Response) => {
  const name = req.body.name;
  const result = await UserService.login(name);
  if (!result) {
    res.status(404).send({message: "Not Found!"});
  } else {
    res.status(200).send(result);
  }
};

export const get_all = async (req: Request, res: Response) => {
  const result = await UserService.get_all();
  res.status(200).send(result);
}
