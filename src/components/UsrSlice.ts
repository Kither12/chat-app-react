import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: {
    selectedUID: string;
    selectedName: string;
    UID: string;
    name: string;
    usrList: Array<{
        uid: string;
        name: string;
    }>;
} = {
    selectedName: '',
    selectedUID: '',
    UID: '',
    usrList: [],
    name: '',
};

const usrSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        selectedUsr(state, action: PayloadAction<string>) {
            state.selectedUID = action.payload;
            state.usrList.forEach(item => {
                if (item.uid === action.payload) {
                    state.selectedName = item.name;
                }
            });
        },
        changeUsr(state, action: PayloadAction<string | undefined>) {
            if (action.payload === undefined) {
                state.UID = '';
                return;
            }
            state.UID = action.payload;
        },
        loadUsr(
            state,
            action: PayloadAction<Array<{ uid: string; name: string }>>
        ) {
            state.usrList = action.payload;
            if (state.usrList.length > 0 && state.selectedUID === '') {
                state.selectedUID = state.usrList[0].uid;
                state.selectedName = state.usrList[0].name;
            }
        },
        addUsr(state, action: PayloadAction<{ uid: string; name: string }>) {
            state.usrList.push(action.payload);
            if (state.usrList.length > 0 && state.selectedUID === '') {
                state.selectedUID = state.usrList[0].uid;
                state.selectedName = state.usrList[0].name;
            }
        },
        setName(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },
    },
});

export const { selectedUsr, changeUsr, loadUsr, addUsr, setName } =
    usrSlice.actions;
export default usrSlice.reducer;
