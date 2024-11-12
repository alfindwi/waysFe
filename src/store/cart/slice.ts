import { createSlice } from "@reduxjs/toolkit";
import { cartItems } from "../../types/cart";
import {
  createCart,
  createCartToOrder,
  deleteCart,
  getCart,
  updateCart,
} from "./async";

interface cartState {
  id?: number;
  cart: cartItems[];
  loading: boolean;
  error: string | null;
  totalAmount: number;
}

const initialState: cartState = {
  id: 0,
  cart: [],
  loading: false,
  totalAmount: 0,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // Get cart
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        const cartData = action.payload.cart;
        state.cart = cartData.cart[0].cartItems;
        state.totalAmount = cartData.totalAmount;
        state.id = action.payload.cart.cart[0].id;
        state.loading = false;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add cart
    builder
      .addCase(createCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        const cartData = action.payload.cartItem;
        state.cart = cartData.cartItems;
        state.totalAmount = cartData.totalAmount;
        state.id = cartData.id;
        state.loading = false;
      })

      .addCase(createCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    // add cart to order
    builder
      .addCase(createCartToOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCartToOrder.fulfilled, (state, action) => {
        state.cart = action.payload.cartItems;
        state.totalAmount = action.payload.totalAmount;
        state.id = action.payload.id;
        state.loading = false;
      })
      .addCase(createCartToOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update cart
    builder
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        console.log("Updated Item in Redux:", updatedItem);

        const itemIndex = state.cart.findIndex(
          (item) => item.id === updatedItem.id
        );

        if (itemIndex !== -1) {
          state.cart[itemIndex] = {
            ...state.cart[itemIndex],
            quantity: updatedItem.quantity,
            totalPrice: parseFloat(updatedItem.totalPrice) || 0,
          };
        } else {
          state.cart.push(updatedItem);
        }

        state.totalAmount = state.cart.reduce((total, item) => {
          const itemTotalPrice = item.totalPrice || 0;
          return total + itemTotalPrice;
        }, 0);

        console.log("New Total Amount in Redux:", state.totalAmount);
        state.loading = false;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete cart item
    builder
      .addCase(deleteCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
        state.totalAmount = action.payload;
        state.loading = false;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
