import { configureStore } from '@reduxjs/toolkit';
import UsrModalSlice from './components/AddUsrModal/UsrModalSlice';
import SearchBarSlice from './components/UsrSection/SearchBar/SearchBarSlice';
import UsrSlice from './components/UsrSlice';
export const store = configureStore({
    reducer: {
        UsrModal: UsrModalSlice,
        SearchSection: SearchBarSlice,
        UsrSlice: UsrSlice,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
