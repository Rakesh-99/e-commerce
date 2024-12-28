import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export interface ILogin {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export interface ISignup {
    firstname: string,
    lastname: string
}

const userAuthSlice = createSlice({
    name: "authslice",
    initialState: {
        user: null as ILogin | null | string | ISignup,
        error: null as string | null,
        loading: false,
    },
    reducers: {
        // Signup : 
        signupPending: (state) => {
            state.loading = true;
        },
        signupSuccess: (state, action: PayloadAction<ISignup>) => {
            state.loading = false;
            state.user = action.payload;
        },
        signupError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload
        },

        // Verify email : 
        otpVerifyPending: (state) => {
            state.loading = true
        },
        otpVerifySuccess: (state) => {
            state.loading = false
        },
        otpVerifyError: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },


        // Login : 
        loginPending: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action: PayloadAction<ILogin>) => {
            state.loading = false;
            state.user = action.payload;
        },
        loginError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        // Logout : 
        logout: (state) => {
            state.user = null;
            state.error = null;
        },

        // Forget password : 

        forgetPasswordPending: (state) => {
            state.loading = true
        },
        forgetPasswordSuccess: (state) => {
            state.loading = false
        },
        forgetPasswordError: (state, action) => {
            state.loading = false
            state.error = action.payload
        },

        // Update user : 
        updateUserPending: (state) => {
            state.loading = true
        },
        updateUserSuccess: (state, action: PayloadAction<ILogin>) => {
            state.loading = false;
            state.user = action.payload
        },
        updateUserError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload
        },

        //Delete user :
        deleteUserPending: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state) => {
            state.loading = false;
            state.user = null;
            state.error = null
        },
        deleteUserError: (state) => {
            state.loading = false
        }
    }
});

export default userAuthSlice.reducer;
export const {
    signupPending,
    signupSuccess,
    signupError,
    loginPending,
    loginSuccess,
    loginError,
    otpVerifyError,
    otpVerifyPending,
    otpVerifySuccess,
    forgetPasswordPending,
    forgetPasswordError,
    forgetPasswordSuccess,
    logout, updateUserError,
    updateUserPending,
    updateUserSuccess,
    deleteUserError,
    deleteUserPending,
    deleteUserSuccess } = userAuthSlice.actions;
