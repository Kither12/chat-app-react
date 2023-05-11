import { createSlice } from '@reduxjs/toolkit';

const usrModalSlice = createSlice({
    name: 'filters',
    initialState: {
        isOn: false,
    },
    reducers: {
        openModal(state) {
            state.isOn = true;
        },
        closeModal(state) {
            state.isOn = false;
        },
    },
});

export const { openModal, closeModal } = usrModalSlice.actions;
export default usrModalSlice.reducer;
