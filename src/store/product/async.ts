import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../libs/api";
import Cookies from "js-cookie";
import { AxiosError } from "axios";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/admin/products");
      console.log("data product", res.data);
      return res.data.products;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data: FormData, thunkAPI) => {
    try {
      const res = await api.post("/admin/products", data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (data: { id: number; formData: FormData }, thunkAPI) => {
    try {
      const res = await api.put(`/admin/products/${data.id}`, data.formData, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error: AxiosError | any) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id: number, thunkAPI) => {
    try {
      await api.delete(`/admin/products/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return id;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);
