import { IProduct } from "./product";

export interface ICart {
    totalAmount: number
    id: number
    userId: number
    cartItems: cartItems[]
    created_at: string
    updated_at: string
}

export interface cartItems{
    id: number
    cartId: number
    productId: number
    product: IProduct
    quantity: number
    productPrice: number
    totalPrice: number
}