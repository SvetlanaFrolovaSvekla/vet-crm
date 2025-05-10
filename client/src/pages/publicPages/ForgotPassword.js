import React, { useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { FORGOT_PASSWORD_ROUTE, LOGIN_ROUTE } from "../../utils/consts";
import styles from "../Auth.module.css";
import { forgotPassword } from "../../http/userAPI";

const ForgotPassword = () => {
    const history = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            alert('На ваш email отправлена инструкция по восстановлению пароля');
            history(LOGIN_ROUTE);
        } catch (e) {
            alert(e.response ? e.response.data.message : 'Произошла ошибка при выполнении запроса');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Восстановление пароля</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type="email"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className={styles.button}>
                        Отправить
                    </button>
                </form>
                <div className={styles.row}>
                    <NavLink to={LOGIN_ROUTE} className={styles.link}>Вернуться к входу</NavLink>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;