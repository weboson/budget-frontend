// компонент форма регистрации / входа
import { FC, useState } from "react"; // FunctionComponent
import type { FormEvent } from 'react' // тип для события формы для TS: https://youtu.be/BYsQE3Nh9IE?t=522
import { AuthService } from "../services/auth.service"; // методы axios-запросов (instance)
import { toast } from "react-toastify"; // анимированные сообщения
import { setTokenToLocalStorage } from "../helpers/localstorage.helper";
import { useAppDispatch } from "../store/hooks";   // для изменения состоянием Redux-Toolkit
import { login } from "../store/user/userSlice"; // из slice reducers {} - Readux-toolkit
import { useNavigate } from "react-router-dom"; // переадресация на определенную страницу (например на home)

const Auth: FC = () => {

  // вернется Function Component
  // Authentication (Аутентификация) - true/false
  const [isLogin, setIsLogin] = useState<boolean>(false); // generic: метод принимает значения типа boolean

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // для изменения состоянием Redux-Toolkit
  const dispatch = useAppDispatch()
  // переадресация на определенную страницу (например на home)
  const navigate = useNavigate()

  //! обработчик для регистрации new user
  const registrationHandler = async (e: FormEvent<HTMLFormElement>) => { // https://youtu.be/BYsQE3Nh9IE?t=522
    try {
      e.preventDefault() // сброс настроек браузера по умолчанию (страница не будет обновляться при нажатии кнопки "Submit")
      // post - запрос
      const data = await AuthService.registration({email, password}) // registration из auth.service.ts  - email/password из input 
      if(data) {
        toast.success('Account has been created.') // анимированное сообщение от 'react-toastify'
        // и если мы удачно зарегестрировались, то переключим форму с "регстрация" на "войти" (You don't have an account?/Already have an account?)
        setIsLogin(!isLogin)
      }
    } catch (err: any) {
      // если есть err.response (ошибка с бэкенда или axios), то показать текст ошибки
        const error = err.response?.data.message // опциональное (безопасное) свойство: https://learn.javascript.ru/optional-chaining#optsionalnaya-tsepochka
        toast.error(error.toString()) // анимированное сообщение (строки ошибки)
      
    }
  }


  //! обработчик для входа user (login)
  const loginHandler = async (e: FormEvent<HTMLFormElement>) => { // https://youtu.be/BYsQE3Nh9IE?t=522
    try {
      e.preventDefault() // сброс настроек браузера
      const data = await AuthService.login({email, password}) // получили от сервера данные в ответ
      
      if(data) {
        // добавим в localstorage полученный с сервера токен
        setTokenToLocalStorage('token', data.token)
        // изменили состояние (user в системе или нет)
        dispatch(login(data)) // dispatch - метод обращения к slice, login - это логика из slice - data это action 
        toast.success('You logged id.')
        navigate('/') // переадресация на главную страницу, после того как user вошел в систему
      }
    } catch (err: any) {
      // если есть err.response (ошибка с бэкенда или axios), то показать текст ошибки
        //const error = err.response?.data.message // опциональное (безопасное) свойство: https://learn.javascript.ru/optional-chaining#optsionalnaya-tsepochka
        //toast.error(error.toString()) // анимированное сообщение (строки ошибки)
      
    }
  }



  return (
    <div className="bg-state-900  mt-40 flex flex-col items-center justify-center text-white">
      <h1 className="mb-10 text-center text-xl">
        {isLogin ? "Login" : "Registration"}
      </h1>
      <form 
        onSubmit={isLogin ? loginHandler : registrationHandler} // если user авторизирован, то login, если нет - регистрация
        className="mx-auto flex w-1/3 flex-col gap-5">
        <input
          type="text"
          className="input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-green mx-auto">Submit</button>
      </form>

      <div className="mt-5 flex justify-center">
        {isLogin ? (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            You don't have an account?
          </button>
        ) : (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            Already have an account?
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;
