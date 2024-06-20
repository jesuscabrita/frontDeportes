import { createSlice } from "@reduxjs/toolkit";

export const sectionSlice = createSlice({
    name: "section",
    initialState: {
        current_view: "A",
    },
    reducers: {
        setup_view: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.current_view = action.payload.view;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setup_view } = sectionSlice.actions;