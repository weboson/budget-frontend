// входной React-компонент
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'; // чтобы подключить глобальное состояние "Redux-Toolkit"
import { ToastContainer } from 'react-toastify' // библиотека анимированных сообщений
import 'react-toastify/dist/ReactToastify.css'; // стили анимированных сообщений
import App from './App'
import './index.css'
import { store } from './store/store'; // наш store из redux

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
     <App />
    {/* библиотека анимированных сообщений */}
    <ToastContainer position="bottom-left" autoClose={2000}/> 
  </Provider>
)
