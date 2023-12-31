export type TPostProduct = {
  name: string;
  description: string;
  price: number;
  stock: number;
  material: string;
  categories: string[];
  size: string[];
  color: string[];
  features: string[];
};

export type TImageFromMulter = {
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  access_mode: string;
};

export type TGetProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  material: string;
  categories: string[];
  features: string[];
  image_src: string[];
  size: string[];
  color: string[];
  rating_average: number;
  rating_count: number;
  created_at: Date;
  updated_at: Date;
  reviews: any[];
};
