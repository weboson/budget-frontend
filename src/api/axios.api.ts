import axios from "axios";
import { getTokenFromLocalStorage } from "../helpers/localstorage.helper";

// http://localhost:3000/api/ - base url
// конфигурируем axios
export const instance = axios.create({
    baseURL: 'http://localhost:3000/api', // указали базовый url (нашего бэка) - можно в .env (dotenv) хранить, но оставим так
    headers: { // http - заголовки
        Authorization: `Bearer ` + getTokenFromLocalStorage() || '', // получили JWToken или ''  (Bearer - это просто добавочная cтрока)
    }
})

