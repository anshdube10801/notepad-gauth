/* eslint-disable no-useless-catch */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, signUpUser as create } from "../../api/users.jsx";

export const saveUser = createAsyncThunk (
    "user/saveUser", async (payload) =>{
        try {
            const data = await loginUser(payload);
            if(data.data?.token)
            {localStorage.setItem("accessToken", data.data?.token);
        }
            return data.data.data;
          } catch (error) {
            throw error;
          }
    }
);

export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (payload) => {
    try {
      const data = await create(payload); // Call your signup API
      if (data.data?.token) {
        localStorage.setItem("accessToken", data.data?.token);
      }
      return data.data.data;
    } catch (error) {
      throw error;
    }
  }
);