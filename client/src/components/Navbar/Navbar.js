import React, {useContext} from 'react';
import logo from '../../resources/logo.svg';
import s from './NavbarWhite.module.css';
import {ADMIN_ROUTE, LOGIN_ROUTE} from "../../utils/consts";
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";

const NavbarComponent = () => {
    const { user } = useContext(Context);
    const history = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token'); // Очищаем токен при выходе
        history(LOGIN_ROUTE); // Перенаправляем на страницу авторизации
    };

    return (
        <nav className={s.menu}>
            <div className={s.cont_logo}>
                <div className={s.logo}>
                    <a href="/">
                        <img src={logo} alt="Главное изображение" className={s.logoImage} />
                        <span className={s.logoText}></span>
                    </a>
                </div>
            </div>

            <div className={s.cont_navigat}>
                <div className={s.cont_links}>
                    <div className={s.links}>
                        <a href="/about">О сервисе</a>
                        <a href="/support">Поддержка</a>
                        <a href="/">RU ▽</a>
                    </div>
                </div>

                <div className={s.cont_btn}>
                    <div className={s.btn}>
                        {user.isAuth ? (
                            <>
                                <button className={s.btnBord} onClick={() => history(ADMIN_ROUTE)}>Личный кабинет</button>
                                <button className={s.btnBord} onClick={logOut}>Выйти</button>
                            </>
                        ) : (
                            <button className={s.btnBord} onClick={() => history(LOGIN_ROUTE)}>Авторизация</button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

const Navbar = observer(NavbarComponent);
export default Navbar;
