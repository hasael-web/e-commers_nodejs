import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";
import { ReviewsEntities } from "./ReviewsEntities";
import { ProductEntities } from "./ProductEntities";

@Entity({ name: "users" })
export class UserEntities {
  @PrimaryColumn({ name: "id" })
  id: string;
  @Column({ name: "email" })
  email: string;
  @Column({ name: "username" })
  username: string;
  @Column({ name: "password" })
  password: string;
  @Column({ name: "role", nullable: true, default: "" })
  role: string;
  @Column({ name: "profile_image", default: "empty" })
  profile_image: string;
  @OneToMany(() => ReviewsEntities, (review) => review.id_user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "reviews" })
  reviews: ReviewsEntities[];

  @OneToMany(() => ProductEntities, (products) => products.id_user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  products: ProductEntities[];

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
