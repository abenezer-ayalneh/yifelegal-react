import logger from "redux-logger";
import {configureStore} from "@reduxjs/toolkit";
import errorSlice from "./slices/error-slice";
import successSlice from "./slices/success-slice";
import userSlice from "./slices/user-slice";
import customizationSlice from "./slices/customization-slice";

const middleware = [];
if (process.env.NODE_ENV === 'development') {
    middleware.push(logger)
}

export const store = configureStore({
    reducer: {
        error: errorSlice,
        success:successSlice,
        user: userSlice,
        customization: customizationSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
        // .concat(...middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch