// redux-toolkit - это менеджер состояния, где состояние дотсупно во всех компонентах (состояние не нужно передавать через пропсы)
// slice от redux-toolkit: https://redux-toolkit.js.org/tutorials/typescript
import { IUser } from './../../types/types'; // наш тип (intefase)
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Определить тип состояния slice 
interface UserState {
  user: IUser | null // если user нет, то == null 
  isAuth: boolean
}

// Определить начальное состояние, используя этот тип
const initialState: UserState = {
// состояние по-умолчанию
  user: null,
  isAuth: false
}

// создать slice
export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // логика изменения состояния
    // эти методы должны принимать два параметра: 
    // state - текущее состояние и action - изменение состояние
    // ВХОД
    login: (state, action: PayloadAction<IUser>) => {
        state.user = action.payload // payload - полезная нагрузка (данные IUser)
        state.isAuth = true // если user есть
    },
    // ВЫХОД
    logout: (state) => {
        state.isAuth = false
        state.user = null
    },
  },
})

export const { login, logout } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default userSlice.reducer