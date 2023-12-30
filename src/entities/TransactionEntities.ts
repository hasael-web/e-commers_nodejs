import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntities } from "./UserEntities";
import { OrderEntities } from "./OrderEntities";

@Entity()
export class TransactionEntities {
  @PrimaryColumn()
  id: string;
  @Column()
  total_price: number;
  @ManyToOne(() => UserEntities, (user) => user.transaction, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  user: UserEntities;
  @ManyToOne(() => OrderEntities, (order) => order.transctions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  order: OrderEntities;
  @Column({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;
}
