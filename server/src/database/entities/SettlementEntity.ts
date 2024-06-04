import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SettlementStatus } from "types";

@Entity({ name: "Settlement" })
export class SettlementEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "title", type: "varchar", length: 255 })
  title: string;

  @Column({ name: "description", type: "text" })
  description: string;

  @Column({ name: "proposer", type: "varchar", length: 255 })
  proposer: string;

  @Column({ name: "verifier", type: "varchar", length: 255 })
  verifier: string;

  @Column({ name: "status", type: "varchar", length: 255 })
  status: SettlementStatus;

  @Column({ name: "last_update", type: "timestamp" })
  last_update: Date;
}
