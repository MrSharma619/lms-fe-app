import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { BASE_URL, api, setAuthHeader } from "../../api/api";

//auth slice thats why and method name (follow this naming convention for thunk)
//remember this has nothing to do with api path, just naming to identify thunk for this api call or anything else
export const login = createAsyncThunk("auth/login", async(userData) => {
    try{
        const { data } = await axios.post(`${BASE_URL}/auth/login`, userData)

        localStorage.setItem("token", data.token)

        return data;
    }
    catch(error){
        console.log("authslice->login: ", error);
        throw Error(error.response.data.error);

    }

});

export const register = createAsyncThunk("auth/register", async(userData) => {
    try{
        const { data } = await axios.post(`${BASE_URL}/auth/register`, userData)

        localStorage.setItem("token", data.token)

        return data;
    }
    catch(error){
        console.log("authslice->register: ", error);
        throw Error(error.response.data.error);

    }
    
});

export const logout = createAsyncThunk("auth/logout", async() => {
    try{
        localStorage.clear();
    }
    catch(error){
        console.log("authslice->logout: ", error);
        throw Error(error.response.data.error);

    }
    
});

export const getUserProfile = createAsyncThunk("auth/getUserProfile", async(token) => {

    setAuthHeader(token, api);

    try{
        const { data } = await api.get("/api/user/profile")

        return data;
    }
    catch(error){
        console.log("authslice->getUserProfile: ", error);
        throw Error(error.response.data.error);

    }
    
});

export const getUserList = createAsyncThunk("auth/getUserList", async(token) => {
    
    setAuthHeader(token, api);

    try{
        const { data } = await api.get("/api/user/all")

        return data;
    }
    catch(error){
        console.log("authslice->getUserList: ", error);
        throw Error(error.response.data.error);

    }
    
});



const authSlice = createSlice({
  //use same name as given in thunk naming otherwise wont work
  name: "auth",
  initialState: {
    user: null,
    loggedIn: false,
    loading: false,
    error: null,
    token: null,
    users: []
  },
  reducers: {},

  //thunk functions generate 3 lifecycle states -> pending, fulfilled, rejected
  //make sure same name here as used in naming thunk fns.
  extraReducers: (builder) => {
    builder

    //login
    .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.loggedIn = true;
    })
    .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; //error thrown in catch block above will be here
    })

    //register
    .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.loggedIn = true;
    })
    .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; //error thrown in catch block above will be here
    })

    //getUserProfile
    .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.loggedIn = true;
    })
    .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; //error thrown in catch block above will be here
    })

    //getUserList
    .addCase(getUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.loggedIn = true;
    })
    .addCase(getUserList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; //error thrown in catch block above will be here
    })
    
    //logout
    .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loggedIn = false;
        state.loading = false;
        state.error = null;
        state.token = null;
        state.users = [];
    })
    
  }

})

//export here, register in store
export default authSlice.reducer;
