import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../../axios/api";

export const submitAssignment = createAsyncThunk("submission/submitAssignment", async({ assignmentId, submissionUrl }) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        const { data } = await api.post(`/api/submission?taskId=${assignmentId}&submissionUrl=${submissionUrl}`, {});

        return data;

    }
    catch(error){
        console.log("submissionslice->submitAssignment: ", error);
        throw Error(error.response.data.error);

    }

});

export const fetchAllSubmissions = createAsyncThunk("submission/fetchAllSubmissions", async() => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        const { data } = await api.get("/api/submission/all");

        return data;

    }
    catch(error){
        console.log("submissionslice->fetchAllSubmissions: ", error);
        throw Error(error.response.data.error);

    }

});

export const fetchSubmissionByAssignmentId = createAsyncThunk("submission/fetchSubmissionByAssignmentId", async(assignmentId) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        const { data } = await api.get(`/api/submission/task/${assignmentId}`);

        return data;

    }
    catch(error){
        console.log("submissionslice->fetchSubmissionByAssignmentId: ", error);
        throw Error(error.response.data.error);

    }

});

export const reviewSubmission = createAsyncThunk("submission/reviewSubmission", async({ submissionId, status }) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try{
        const { data } = await api.patch(`/api/submission/${submissionId}?status=${status}`, {});

        return data;

    }
    catch(error){
        console.log("submissionslice->reviewSubmission: ", error);
        throw Error(error.response.data.error);

    }

});




const submissionSlice = createSlice({
    name: "submission",
    //this state can be used using reducer defined in store.js
    initialState: {
        submissions: [],
        status: "",
        error: null
    },
    reducers: {},

    extraReducers: (builder) => {
        builder

        //submitAssignment
        .addCase(submitAssignment.pending, (state) => {
            state.status = "loading";
        })
        .addCase(submitAssignment.fulfilled, (state, action) => {
            state.status = "success";
            state.submissions.push(action.payload);
        })
        .addCase(submitAssignment.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message; //error thrown in catch block above will be here
        })

        //fetchAllSubmissions
        .addCase(fetchAllSubmissions.fulfilled, (state, action) => {
            state.status = "success";
            state.submissions = action.payload;
        })
        .addCase(fetchAllSubmissions.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message; //error thrown in catch block above will be here
        })

        //fetchSubmissionByAssignmentId
        .addCase(fetchSubmissionByAssignmentId.fulfilled, (state, action) => {
            state.status = "success";
            state.submissions = action.payload;
        })

        //reviewSubmission
        .addCase(reviewSubmission.fulfilled, (state, action) => {
            state.status = "success";
            state.submissions = state.submissions.map((submission) => 
                submission.id !== action.payload.id ? submission : action.payload
            );
        })

    }

});

export default submissionSlice.reducer;
