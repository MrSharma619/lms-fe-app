import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, setAuthHeader } from "../../axios/api";

export const fetchUserNotifications = createAsyncThunk(
  "notification/fetchUserNotifications",
  async () => {
    setAuthHeader(localStorage.getItem("token"), api);

    try {
      const { data } = await api.get("/api/notification");

      //console.log("hi in", data);

      return data;
    } catch (error) {
      console.log("notificationslice->fetchUserNotifications: ", error);
      throw Error(error.response.data.error);
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notification/markNotificationAsRead",
  async ({ notificationId }) => {
    setAuthHeader(localStorage.getItem("token"), api);

    try {
      const { data } = await api.patch(
        `/api/notification/${notificationId}/read`
      );

      return data;
    } catch (error) {
      console.log("notificationslice->markNotificationAsRead: ", error);
      throw Error(error.response.data.error);
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  //this state can be used using reducer defined in store.js
  initialState: {
    notifications: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      //fetchUserNotifications
      .addCase(fetchUserNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchUserNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; //error thrown in catch block above will be here
      })

      //markNotificationAsRead
      .addCase(markNotificationAsRead.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const updatedNotification = action.payload;
        state.loading = false;
        state.notifications = state.notifications.map((notification) =>
          notification.id === updatedNotification.id
            ? { ...notification, ...updatedNotification }
            : notification
        );
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; //error thrown in catch block above will be here
      });
  },
});

export default notificationSlice.reducer;
