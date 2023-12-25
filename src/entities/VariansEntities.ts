import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { ProductEntities } from "./ProductEntities";
import { VarianDetailEntities } from "./VarianDetailEntities";

@Entity({ name: "varians" })
export class VariansEntities {
  @PrimaryColumn({ name: "id" })
  id: string;
  @Column({ name: "color" })
  color: string;

  @ManyToOne(() => ProductEntities, (product) => product.varians, {
    cascade: true,
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "id_product" })
  products: ProductEntities;

  @OneToMany(() => VarianDetailEntities, (d) => d.id_varians)
  @JoinColumn()
  varian_detail: VarianDetailEntities[];

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
  @Column({
    name: "deleted_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: true,
  })
  deleted_at: Date;
}
