export type TPostProduct = {
  name: string;
  description: string;
  material: string;
  categories: string[];
  varians: TDetailVarian[];
  features: string[];
};

export type TImageFromMulter = {
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
};

export type TDetailVarian = {
  color: string;
  varian_detail: TDV[];
};
export type TDV = {
  size: string;
  price: number;
  stock: number;
};

export type TGetProduct = {
  id: string;
  name: string;
  description: string;
  material: string;
  categories: string[];
  features: string[];
  image_src: string[];
  varians: TDetailVarian[];
  rating_average: number;
  rating_count: number;
  created_at: Date;
  updated_at: Date;
  reviews: any[];
};
