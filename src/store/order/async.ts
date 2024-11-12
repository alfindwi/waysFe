import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/api";
import Cookies from "js-cookie";
import { AxiosError } from "axios";

declare global {
  interface Window {
    snap: any;
  }
}

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/order", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return res.data.order;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (data: { cartId: number }, thunkAPI) => {
    try {
      const res = await api.post("/order", data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (res.data.transaction) {
        return {
          token: res.data.transaction.token,
          redirect_url: res.data.transaction.redirect_url,
        };
      } else {
        return thunkAPI.rejectWithValue("Transaction data is missing.");
      }
    } catch (error: AxiosError | any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updatePayemntStatus = createAsyncThunk(
  "order/updatePayemntStatus",
  async (data: { orderId: number; status: string }, thunkAPI) => {
    try {
      const res = await api.get(`/order/payment/status/${data.orderId}`);
      return res.data;
    } catch (error: AxiosError | any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
