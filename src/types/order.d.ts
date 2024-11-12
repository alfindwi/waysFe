import { IProduct } from "./product";
import { IUser } from "./user";

interface OrderItemsDTO {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  productPrice: number;
  product: IProduct;
  totalPrice: number;
  image: string;
}

export interface IOrder {
  id: number;
  userId: number;
  user: IUser;
  status: "PENDING" | "SUCCESS";
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
  OrderItems: OrderItemsDTO[]; 
}

