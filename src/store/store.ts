//конфигуратор Readux-toolkit
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice' // userReducer - это псевдоним


export const store = configureStore({
  reducer: {
    user: userReducer, // подключили наш userSlice к store
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch