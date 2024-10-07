import { FC } from 'react'; // TypeScript - интерфейс функционального компонента: FC
import { Link, NavLink, useNavigate } from 'react-router-dom'; // Link - это обозначение ссылки
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'; // библиотека иконок
import { useAuth } from '../hooks/useAuth';  // катомный хук получения сосотяние из Redux-Toolkit
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/user/userSlice';
import { removeTokenFromLocalStorage } from '../helpers/localstorage.helper';
import { toast } from 'react-toastify'; // всплывающие сообщения

const Header: FC = () => {
    // залогинен ли пользователь
    const isAuth = useAuth(); // хук состояния

    // обработчик для выхода из системы
    const dispatch = useAppDispatch()
    const navigate = useNavigate() // переадресация на определенную страницу
    
    const logoutHandler = () => {
        dispatch(logout()) // изменить состояние:{
        //     state.isAuth = false 
        //     state.user = null
        // }
        removeTokenFromLocalStorage('token') // удалить токен, раз user вышел
        toast.success('You logged out.') // всплывающее сообщение
        navigate('/') // переадресация на главную страницу
    }

    return (
        <header className='flex items-center p-4 shadow-sm bg-slate-800 backdrop-blur-sm'>
            <Link to="/">
                <FaBtc size={20} />
            </Link>

            {
                //! menu
                // условие: если user авторизирован, то отрендерить список (menu)
                isAuth && (
                    <nav className='ml-auto mr-10'>
                        <ul className="flex items-center gap-5">
                            <li>
                                <NavLink to={'/'} className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}> Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/transactions'} className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}> Transactions </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/categories'} className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}> Categories</NavLink>
                            </li>
                        </ul>
                    </nav>
                )
            }
            {
                // button log_in/log_out
                isAuth
                    ? (
                        <button className='btn btn-red' onClick={logoutHandler}>
                            <span>Log Out</span>
                            <FaSignOutAlt />
                        </button>
                    )
                    : (
                        <Link to={'auth'} className='py-2 text-white/50 hover:text-white ml-auto'>
                            Log In / Sing In
                        </Link>
                    )
            }
        </header>
    )

}

export default Header;