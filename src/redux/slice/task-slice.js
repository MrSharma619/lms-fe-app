import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../../api/api";

export const fetchTasks = createAsyncThunk("task/fetchTasks", async({ status }) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        const { data } = await api.get("/api/task", {
            params: { status }
        });

        return data;

    }
    catch(error){
        console.log("taskslice->fetchTasks: ", error);
        throw Error(error.response.data.error);

    }
})

export const fetchUserTasks = createAsyncThunk("task/fetchUserTasks", async({ status }) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        const { data } = await api.get("/api/task/user", {
            params: { status }
        });

        return data;

    }
    catch(error){
        console.log("taskslice->fetchUserTasks: ", error);
        throw Error(error.response.data.error);

    }
})

export const fetchTaskById = createAsyncThunk("task/fetchTaskById", async(taskId) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        const { data } = await api.get(`/api/task/${taskId}`);

        return data;

    }
    catch(error){
        console.log("taskslice->fetchTaskById: ", error);
        throw Error(error.response.data.error);

    }
})

export const createTask = createAsyncThunk("task/createTask", async(taskData) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        const { data } = await api.post("/api/task", taskData);

        return data;

    }
    catch(error){
        console.log("taskslice->createTask: ", error);
        throw Error(error.response.data.error);

    }
})

export const updateTask = createAsyncThunk("task/updateTask", async({ taskId, updatedTaskData }) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        const { data } = await api.patch(`/api/task/${taskId}`, updatedTaskData);

        return data;

    }
    catch(error){
        console.log("taskslice->updateTask: ", error);
        throw Error(error.response.data.error);

    }
})

export const assignTaskToUser = createAsyncThunk("task/assignTaskToUser", async({ taskId, userId }) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        const { data } = await api.patch(`/api/task/${taskId}/user/${userId}/assign`);

        return data;

    }
    catch(error){
        console.log("taskslice->assignTaskToUser: ", error);
        throw Error(error.response.data.error);

    }
})

export const deleteTask = createAsyncThunk("task/deleteTask", async(taskId) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        const { data } = await api.delete(`/api/task/${taskId}`);

        //returning id so it can be used in extra reducer
        return taskId;

    }
    catch(error){
        console.log("taskslice->deleteTask: ", error);
        throw Error(error.response.data.error);

    }
})




const taskSlice = createSlice({
    name: "task",
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

        //fetchTasks
        .addCase(fetchTasks.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; //error thrown in catch block above will be here
        })

        //fetchUserTasks
        .addCase(fetchUserTasks.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchUserTasks.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUserTasks = action.payload;
        })
        .addCase(fetchUserTasks.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; //error thrown in catch block above will be here
        })

        //createTask
        .addCase(createTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createTask.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks.push(action.payload);
        })
        .addCase(createTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; //error thrown in catch block above will be here
        })

        //updateTask
        .addCase(updateTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            const updatedTask = action.payload;
            state.loading = false;
            state.tasks = state.tasks.map((task) => {
                task.id === updatedTask.id ? {...task, ...updatedTask} : task
            });
        })
        .addCase(updateTask.rejected, (state, action) => {
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
            state.tasks = state.tasks.map((task) => {
                task.id === updatedTask.id ? {...task, ...updatedTask} : task
            });
        })
        .addCase(assignTaskToUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; //error thrown in catch block above will be here
        })

        //deleteTask
        .addCase(deleteTask.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteTask.fulfilled, (state, action) => {
            state.loading = false;
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        })
        .addCase(deleteTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message; //error thrown in catch block above will be here
        })

    }

});

export default taskSlice.reducer;
