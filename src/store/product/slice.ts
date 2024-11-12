import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../types/product";
import { createProduct, deleteProduct, getProducts, updateProduct } from "./async";

interface productState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}

const initialState: productState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get products
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // add product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createProduct.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          state.products.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // update product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<IProduct>) => {
          const updateProductIndex = state.products.findIndex(
            (product) => product.id === action.payload.id
          );

          if (updateProductIndex !== -1) {
            state.products[updateProductIndex] = action.payload;
          }

          state.loading = false;
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    //   delete product 

    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      state.loading = false;
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default productSlice.reducer;
