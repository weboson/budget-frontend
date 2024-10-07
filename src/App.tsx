import { useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { getTokenFromLocalStorage } from "./helpers/localstorage.helper"
import { router } from "./router/router" // наша разметка маршрутов
import { AuthService } from "./services/auth.service"
import { useAppDispatch } from "./store/hooks" // от redux - toolkit
import { login, logout } from "./store/user/userSlice"

function App() {
  const dispatch = useAppDispatch()

  // проверка в системе ли пользователь или нет
  const checkAuth = async () => {
    const token = getTokenFromLocalStorage() // получили из localStorage сохраненный токен (в файле src\pages\Auth.tsx)
    
    try {
      if(token) { 
        const data = await AuthService.getProfile()

        if(data) {
          dispatch(login(data)) // меняем состояние (user в системе )
        } else { // если что, то не так - иначе 
          dispatch(logout()) // user ВНЕ системы
        }
      }
    } catch (error) {
      console.log(error)
    }
  
  }

  // при каждом обновление будет запускаться функция проверка авторизации
  useEffect(()=> {checkAuth()}, [])

  return <RouterProvider router={router} />
}

export default App
