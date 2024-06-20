import { configureStore } from "@reduxjs/toolkit";
import { sectionSlice } from "./actions/section.actions";

export const store = configureStore({
    reducer: {
        section: sectionSlice.reducer,
    },
});