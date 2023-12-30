export type TPostOrder = {
  price: number;
  quantity: number;
  id_product: string;
};

export type TCustomerTransaction = {
  total_price: number;
  id_order: string;
};
