// методы для axios - запросов ( get, post(data), get(:id), delete(:id), update(:id)) 
import { instance } from './../api/axios.api';
import { IResponseUserData, IUserData, IUser } from "../types/types";

export const AuthService = {
    // post на 'user' для регистрации нового пользователя
    // => промис с ожидаемыми полями описанные в типе IResponseUserData
    async registration(userData: IUserData): Promise<IResponseUserData> {
        // ------------------post - запрос( 'UrlParams',  data)
        // - IUserData - это входящие данные (email, password), выходящий тип => {IResponseUserData}
        const {data} = await instance.post<IUserData, {data: IResponseUserData}>('user', userData) //! instance настроен нами в axios.api.ts - userData это данные
        return data
    }, 
    // методо post для входа, с параметром такого же типа "IUserData" (email, password)
    // => Промис с типом "IUser": id, email, token
    async login(userData: IUserData): Promise<IUser | undefined> {
        const {data} = await instance.post<IUser>('auth/login', userData)
        return data
    },
    // метод получиения (get) данных профиля, для проверки авторизации
    async getProfile(): Promise<IUser | undefined> {
        const {data} = await instance.get<IUser>('auth/profile')
        if(data) return data
    },
}