import { createBrowserRouter } from "react-router-dom"; // создает RouterApp
import ProtectedRoute from "../components/ProtectedRoute"; // защищенная страница или 'transactions'/'categories'
import Auth from "../pages/Auth";
import Categories, { categoriesAction, categoryLoader } from "../pages/Categories";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Transactions, { transactionAction, transactionLoader } from "../pages/Transactions";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // основной шаблон
        errorElement: <ErrorPage />, // шаблон ошибки
        // дочерние страницы
        children: [
            {
                index: true, // одно и тоже, что: path: '/'
                element: <Home />,
            },
            {
                path: "transactions",
                action: transactionAction,
                loader: transactionLoader,
                element: (    
                    <ProtectedRoute> 
                        <Transactions />
                    </ProtectedRoute>
                ),
            },
            {
                path: "categories",
                action: categoriesAction, // из react-router-dom, подробнее: https://reactrouter.com/en/main/components/form#mutation-submissions
            // useLoaderData() возвращает данные (в Categories.tsx), которые возращает метод (categoryLoader), подключенный в router.tsx в поле "loader"
                loader: categoryLoader, // https://reactrouter.com/en/main/hooks/use-loader-data#useloaderdata
                element: (
                    <ProtectedRoute>
                        <Categories />
                    </ProtectedRoute>
                ),
            },
            {
                path: "auth",
                element: <Auth />,
            }
        ]

    }
])