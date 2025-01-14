import { createSlice } from "@reduxjs/toolkit";
import { initialState, reducers, extraReducers } from './userReducer'

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers,
    extraReducers
})

export const {add, logout} = userSlice.actions

export default userSlice.reducer;