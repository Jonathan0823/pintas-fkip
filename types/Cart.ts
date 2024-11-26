export type CartType = {
  items?: {
    id: string;
    name: string;
    image: string;
    stock: number;
    available: boolean;
  }
  id: string;
  userId: string;
  productId: string;
  quantity: number;
};
