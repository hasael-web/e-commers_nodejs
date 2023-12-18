import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import { ReviewsEntities } from "./ReviewsEntities";

@Entity({ name: "product" })
export class ProductEntities {
  @PrimaryColumn({ type: "uuid" })
  id: string;
  @Column({ name: "name" })
  name: string;
  @Column({ name: "description" })
  description: string;
  @Column({ name: "price" })
  price: number;
  @Column({ name: "stock" })
  stock: number;
  @Column({ name: "material" })
  material: string;

  @Column("simple-array")
  categories: string[];
  @Column("simple-array")
  features: string[];
  @Column("simple-array")
  image_src: string[];
  @Column("simple-array")
  size: string[];
  @Column("simple-array")
  color: string[];

  @Column({ name: "rating_average", default: 0, nullable: true })
  rating_average: number;
  @Column({ name: "rating_count", default: 0, nullable: true })
  rating_count: number;

  //   relasi table to reviews
  @OneToMany(() => ReviewsEntities, (review) => review.id_product, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  reviews: ReviewsEntities[];

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
