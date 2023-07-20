import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import podcastsReducer from "./slices/podcastSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        podcasts: podcastsReducer
    }
});

