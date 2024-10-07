// компонент для защищенных роутов (страниц) от не авторизированного пользователя (гостя)
import { FC } from 'react'; // FC - type functional component
import { useAuth } from '../hooks/useAuth';
import img from '../assets/protectedPage-icon.png'


interface Props {
    children: JSX.Element
}

const ProtectedRoute: FC<Props> = ({ children }) => {
    const isAuth = useAuth() // текущее состояние (true/false)

    return (
        <>
            {isAuth ? children : <div className='flex flex-col justify-center items-center mt-20 gap-10'>
                <h1 className='text-2xl'>To view this page you must be logged in</h1>
                <img className='w-1/3' src={img} alt="img" />
            </div> }
        </>
    );
};

export default ProtectedRoute;
