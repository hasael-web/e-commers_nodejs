import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { ProductEntities } from "./ProductEntities";
import { UserEntities } from "./UserEntities";
import { TransactionEntities } from "./TransactionEntities";

@Entity()
export class OrderEntities {
  @PrimaryColumn()
  id: string;
  @Column()
  price: number;
  @Column()
  quantity: number;
  @Column()
  subtotal: number;
  @Column()
  status: string;
  @ManyToOne(() => ProductEntities, (product) => product.order, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  product: ProductEntities;
  @ManyToOne(() => UserEntities, (user) => user.order, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user: UserEntities;
  @OneToMany(() => TransactionEntities, (transaction) => transaction.order)
  @JoinColumn()
  transctions: TransactionEntities;
  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;
  @Column({
    name: "updated_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
