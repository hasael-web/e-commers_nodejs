import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { VariansEntities } from "./VariansEntities";

@Entity({ name: "variant_detail" })
export class VarianDetailEntities {
  @PrimaryColumn({ name: "id_varian_detail" })
  id: string;
  @ManyToOne(() => VariansEntities, (variant) => variant.varian_detail, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  id_varians: string;
  @Column({ name: "price" })
  price: number;
  @Column({ name: "stock" })
  stock: number;
  @Column({ name: "size" })
  size: string;
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
