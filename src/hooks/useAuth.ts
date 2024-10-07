// кастомный хук для получения состояние из redux-toolkit
import { useAppSelector } from './../store/hooks';
export const useAuth = (): boolean => {
    const isAuth = useAppSelector((state) => state.user.isAuth) // получаем текущее состояние (true/false)

    return isAuth
}