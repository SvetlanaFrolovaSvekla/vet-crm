import React, {useContext, useState} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, VET_ROUTE} from "../utils/consts";
import styles from "./Auth.module.css";
import {login, registration} from "../http/userAPI";

import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom"
import {Context} from "../index";


const AuthComponent = () => {
    const history = useNavigate()
    const {user} = useContext(Context)
    const location = useLocation(); // useLocation() возвращает объект с текущим маршрутом.
    const isLogin = location.pathname === LOGIN_ROUTE; // isLogin будет true, если текущий путь совпадает с LOGIN_ROUTE,
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [number, setNumber] = useState('');
    const [FIO, setFIO] = useState('');


    const click = async () => {
        try {
            let userData;
            if (isLogin) {
                userData = await login(email, password);
            } else {
                userData = await registration(email, password, number, FIO);
            }

            if (userData && userData.email) {
                user.setUser(userData);
                user.setIsAuth(true);
                history(VET_ROUTE);
            } else {
                console.error("Ошибка: получены некорректные данные пользователя:", userData);
            }
        } catch (e) {
            alert(e.response ? e.response.data.message : 'Произошла ошибка при выполнении запроса');
            console.error("Ошибка запроса:", e.response ? e.response.data : e);

        }
    };


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                {!isLogin && (
                    <div className={styles.cardPravila}>
                        <p className={styles.pravilaTitle}>Внимание! Безопасный пароль должен соотвествовать следующим
                            правилам: </p>
                            <p className={styles.pravilaPunkt}> 1. Должен содержать не менее 8 символов </p>
                            <p className={styles.pravilaPunkt}> 2. Должен содержать хотя бы одну цифру</p>
                            <p className={styles.pravilaPunkt}> 3. Должен содержать хотя бы одну заглавную букву</p>
                            <p className={styles.pravilaPunkt}> 4. Должен содержать хотя бы один специальный символ
                                (!@#$%^&*)</p>
                    </div>
                )
                }

                <form className={styles.form}>
                    <input className={styles.input}
                           type="email"
                           placeholder="Введите ваш email..."
                           value={email}
                           onChange={e => setEmail(e.target.value)}
                    />
                    <input className={styles.input}
                           type="password"
                           placeholder="Введите ваш пароль..."
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                    />
                    {!isLogin && (
                        <>
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Ваше ФИО..."
                                value={FIO}
                                onChange={e => setFIO(e.target.value)}
                            />
                            <input
                                className={styles.input}
                                type="text"
                                placeholder="Ваш номер телефона..."
                                value={number}
                                onChange={e => setNumber(e.target.value)}
                            />
                        </>
                    )}


                    <div className={styles.row}>
                        {isLogin ? (
                            <div>
                                <div>
                                    Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}
                                                           className={styles.link}>Зарегистрируйтесь!</NavLink>
                                </div>

                                <div className={styles.vosstan}>
                                    <NavLink to={FORGOT_PASSWORD_ROUTE} className={styles.link}>Восстановить
                                        пароль...</NavLink>
                                </div>
                            </div>
                        ) : (
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE} className={styles.link}>Войдите!</NavLink>
                            </div>
                        )}
                        <button type="button" className={styles.button} onClick={click}>
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const Auth = observer(AuthComponent);
export default Auth;