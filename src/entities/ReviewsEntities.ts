// type Reviews struct {
// 	Id          string    `gorm:"primaryKey" json:"id"`
// 	Id_product  string    `gorm:"type:varchar(255)" json:"id_product"`
// 	Username    string    `gorm:"varchar(255)" json:"username"`
// 	Rating      int32     `gorm:"integer" json:"rating"`
// 	Comment     string    `gorm:"varchar(255)" json:"comment"`
// 	Created_at  time.Time `gorm:"time" json:"created_at"`
// 	Upadated_at time.Time `gorm:"time" json:"updated_at"`
// }

import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { ProductEntities } from "./ProductEntities";

@Entity({ name: "reviews" })
export class ReviewsEntities {
  @PrimaryColumn({ type: "uuid" })
  id: string;
  @Column({ name: "id_user" })
  id_user: number;
  @Column({ name: "username" })
  username: string;
  @Column({ name: "rating" })
  rating: number;
  @Column({ name: "comment" })
  comment: string;

  // relasi to table products
  @ManyToOne(() => ProductEntities, (product) => product.reviews, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  id_product: ProductEntities;

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
