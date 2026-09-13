import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authApi from "./apis/auth.api"

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData, thunkApi) => {
        try {
            const response = await authApi.post("/api/auth/register", formData);
            return response.data;
        } catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || "Registration failed");
        }
    }
)

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (formData, thunkApi) => {
        try {
            const response = await authApi.post("/api/auth/login", formData);
            return response.data;
        }
        catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || "Login Failed")
        }
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, thunkApi) => {
        try {
            const response = await authApi.post("/api/auth/logout");
            return response.data;
        } catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || "Logout Failed");
        }
    }
)

export const getUser = createAsyncThunk(
    "auth/getUser",
    async (_, thunkApi) => {
        try {
            const response = await authApi.get("/api/auth/getMe");
            return response.data;
        } catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || "Get User Failed");
        }

    }
)

export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (formData, thunkApi) => {
        try {
            const response = await authApi.post("/api/auth/forgot-password", formData);
            return response.data;
        } catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || "Forgot password request failed");
        }
    }
)

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async ({ password, token }, thunkApi) => {
        try {
            const response = await authApi.post("/api/auth/reset-password", { password }, { params: { token } });
            return response.data;
        } catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || "Reset password request failed");
        }
    }
)

export const verifyEmail = createAsyncThunk(
    "auth/verifyEmail",
    async (token, thunkApi) => {
        try {
            const response = await authApi.get("/api/auth/verify", {
                params: { token }
            });
            return response.data;
        } catch (err) {
            return thunkApi.rejectWithValue(err.response?.data?.message || "Email verification failed");
        }
    }
)

const initialState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    message: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },

    extraReducers: (builder) => {
        builder
            //register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.message = action.payload.message
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //login
            .addCase(loginUser.pending , (state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(loginUser.fulfilled , (state,action)=>{
                state.loading = false;
                state.user = action.payload.user;
                state.error = null;
                state.message = action.payload.message;
                state.isAuthenticated = true
            })
            .addCase(loginUser.rejected , (state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })

            //logoutUser
            .addCase(logoutUser.pending , (state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(logoutUser.fulfilled , (state,action)=>{
                state.loading = false;
                state.error = null;
                state.message = action.payload.message;
                state.isAuthenticated = false;
                state.user =null;
            })
            .addCase(logoutUser.rejected , (state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })

            //getUser
            .addCase(getUser.pending , (state)=>{
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(getUser.fulfilled , (state,action)=>{
                state.loading = false;
                state.user = action.payload.user;
                state.error = null;
                state.message = action.payload.message;
                state.isAuthenticated = true;
            })
            .addCase(getUser.rejected , (state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })

            //forgotPassword
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(forgotPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.message = action.payload.message
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //resetPassword
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.message = action.payload.message
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            //verifyEmail
            .addCase(verifyEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = null;
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.message = action.payload.message
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default authSlice.reducer;
export const {clearError} = authSlice.actions;