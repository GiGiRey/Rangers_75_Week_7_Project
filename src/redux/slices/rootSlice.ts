import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'marvel character',
        description: "basic character",
        comics_appeared_in: 1,
        super_power: 'unknown'
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
    }
})

// Export Reducer
export const reducer = rootSlice.reducer;
export const { chooseName } = rootSlice.actions;