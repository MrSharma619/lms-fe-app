import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../../axios/api";

export const fetchAssignments = createAsyncThunk("assignment/fetchAssignments", async({ status }) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        const { data } = await api.get("/api/task/byTeacher", {           //only want assignments created by particular teacher
            params: { status }
        });

        return data;

    }
    catch(error){
        console.log("assignmentslice->fetchAssignments: ", error);
        throw Error(error.response.data.error);

    }
})

export const fetchUserAssignments = createAsyncThunk("assignment/fetchUserAssignments", async({ status }) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        const { data } = await api.get("/api/task/user", {
            params: { status }
        });

        return data;

    }
    catch(error){
        console.log("assignmentslice->fetchUserAssignments: ", error);
        throw Error(error.response.data.error);

    }
})

export const fetchAssignmentById = createAsyncThunk("assignment/fetchAssignmentById", async(taskId) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        const { data } = await api.get(`/api/task/${taskId}`);

        return data;

    }
    catch(error){
        console.log("assignmentslice->fetchAssignmentById: ", error);
        throw Error(error.response.data.error);

    }
})

export const createAssignment = createAsyncThunk("assignment/createAssignment", async(assignmentData) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        const { data } = await api.post("/api/task", assignmentData);

        return data;

    }
    catch(error){
        console.log("assignmentslice->createAssignment: ", error);
        throw Error(error.response.data.error);

    }
})

export const updateAssignment = createAsyncThunk("assignment/updateAssignment", async({ assignmentId, updatedAssignmentData }) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        const { data } = await api.patch(`/api/task/${assignmentId}`, updatedAssignmentData);

        return data;

    }
    catch(error){
        console.log("assignmentslice->updateAssignment: ", error);
        throw Error(error.response.data.error);

    }
})

export const assignTaskToUser = createAsyncThunk("assignment/assignTaskToUser", async({ assignmentId, userId }) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        const { data } = await api.patch(`/api/task/${assignmentId}/user/${userId}/assign`);

        return data;

    }
    catch(error){
        console.log("assignmentslice->assignTaskToUser: ", error);
        throw Error(error.response.data.error);

    }
})

export const deleteAssignment = createAsyncThunk("assignment/deleteAssignment", async(assignmentId) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        await api.delete(`/api/task/${assignmentId}`);

        //returning id so it can be used in extra reducer
        return assignmentId;

    }
    catch(error){
        console.log("assignmentslice->deleteAssignment: ", error);
        throw Error(error.response.data.error);

    }
})




const assignmentSlice = createSlice({
    name: "assignment",
    //this state can be used using reducer defined in store.js
    initialState: {
        tasks: [],
        loading: false,
        error: null,
        taskDetails: null,
        currentUserTasks: []
    },
    reducers: {},

    extraReducers: (builder) => {
        builder

        //fetchAssignments
        .addCase(fetchAssignments.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAssignments.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        })
        .addCase(fetchAssignments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; //error thrown in catch block above will be here
        })

        //fetchUserAssignments
        .addCase(fetchUserAssignments.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUserAssignments.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUserTasks = action.payload;
        })
        .addCase(fetchUserAssignments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; //error thrown in catch block above will be here
        })

        //createAssignment
        .addCase(createAssignment.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createAssignment.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks.push(action.payload);
        })
        .addCase(createAssignment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; //error thrown in catch block above will be here
        })

        //updateAssignment
        .addCase(updateAssignment.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateAssignment.fulfilled, (state, action) => {
            const updatedTask = action.payload;
            state.loading = false;
            state.tasks = state.tasks.map((task) => 
                task.id === updatedTask.id ? {...task, ...updatedTask} : task
            );
        })
        .addCase(updateAssignment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; //error thrown in catch block above will be here
        })

        //assignTaskToUser
        .addCase(assignTaskToUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(assignTaskToUser.fulfilled, (state, action) => {
            const updatedTask = action.payload;
            state.loading = false;
            state.tasks = state.tasks.map((task) => 
                task.id === updatedTask.id ? {...task, ...updatedTask} : task
            );
        })
        .addCase(assignTaskToUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; //error thrown in catch block above will be here
        })

        //deleteAssignment
        .addCase(deleteAssignment.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteAssignment.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        })
        .addCase(deleteAssignment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; //error thrown in catch block above will be here
        })

    }

});

export default assignmentSlice.reducer;
