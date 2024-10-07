// корневой роут
// основной шаблон (header+menu+content+footer)
import { FC } from "react";
// Outlet - это указатель, где будет отображаться контент (страницы app)
import { Outlet } from "react-router-dom"; // перевод - выходное отверстие
import Header from "../components/Header";

const Layout: FC = () => {
  return (
    <div className="pd-20 min-h-screen bg-slate-900 font-roboto text-white ">
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
