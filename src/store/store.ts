import { configureStore } from '@reduxjs/toolkit';
import { gameOfLifeGridSliceReducer } from './slices/game-of-life-grid-slice';

export const store = configureStore({
  reducer: {
    gameOfLifeGrid: gameOfLifeGridSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
