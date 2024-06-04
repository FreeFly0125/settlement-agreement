import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "types";

@Entity({ name: "User" })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "name", type: "varchar", length: 255 })
  name: string;

  @Column({ name: "role", type: "varchar", length: 255 })
  role: UserRole;
}
