import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

const searchBarSlice = createSlice({
    name: 'searchBar',
    initialState: '',
    reducers: {
        updateSearchKey(state, action: PayloadAction<string>) {
            return action.payload;
        },
    },
});

export const { updateSearchKey } = searchBarSlice.actions;
export default searchBarSlice.reducer;
