import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";
import { loginAsync, registerAsync } from "./async";
import Cookies from "js-cookie";

export interface AuthState {
  token: string;
  user?: IUser;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: Cookies.get("token") || "",
  user: Cookies.get("user")
    ? JSON.parse(Cookies.get("user") as string)
    : undefined,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    LOGOUT(state) {
      state.token = "";
      state.user = undefined;
      state.error = null;
      Cookies.remove("token");
      Cookies.remove("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerAsync.rejected, (state) => {
        state.loading = false;
        state.error = "Something went wrong";
      });

    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        Cookies.set("user", JSON.stringify(action.payload.user), {
          expires: 7,
        });
        Cookies.set("token", action.payload.token, { expires: 7 });
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { LOGOUT } = authSlice.actions;
export default authSlice.reducer;
