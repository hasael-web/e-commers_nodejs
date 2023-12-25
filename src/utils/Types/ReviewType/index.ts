// @PrimaryColumn({ type: "uuid" })
//   id: string;
//   @Column({ name: "id_user" })
//   id_user: number;
//   @Column({ name: "username" })
//   username: string;
//   @Column({ name: "rating" })
//   rating: number;
//   @Column({ name: "comment" })
//   comment: string;

//   // relasi to table products
//   @ManyToOne(() => ProductEntities, (product) => product.reviews, {
//     onDelete: "CASCADE",
//     onUpdate: "CASCADE",
//   })
//   @JoinColumn()
//   id_product: ProductEntities;

//   @Column({
//     name: "created_at",
//     type: "timestamp",
//     default: () => "CURRENT_TIMESTAMP",
//   })
//   created_at: Date;
//   @Column({
//     name: "updated_at",
//     type: "timestamp",
//     default: () => "CURRENT_TIMESTAMP",
//   })
//   updated_at: Date;

export type TPostReview = {
  rating: number;
  comment: string;
  id_product: string;
};
