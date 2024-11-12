import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/api";
import Cookies from "js-cookie";

export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  try {
    const res = await api.get("/cart", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    console.log("cart", res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const createCart = createAsyncThunk(
  "cart/createCart",
  async (data: { productId: number }, thunkAPI) => {
    try {
      const res = await api.post("/cart", data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createCartToOrder = createAsyncThunk(
  "cart/createCartToOrder",
  async ({ cartId }: { cartId: number }, thunkAPI) => {
    try {
      const res = await api.post(
        "/cart/checkout",
        { cartId },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error: any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (data: { cartItemId: number; newQuantity: number }, thunkAPI) => {
    try {
      const res = await api.put(`/cart/${data.cartItemId}`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });
      console.log("API response data:", res.data);
      return res.data;
    } catch (error: any) {
      console.error("Error in updateCart thunk:", error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "cart/deleteCart",
  async (cartItemId: number, thunkAPI) => {
    try {
      await api.delete(`/cart/${cartItemId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return cartItemId;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
