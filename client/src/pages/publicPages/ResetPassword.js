import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../utils/consts";
import styles from "../Auth.module.css";
import { resetPassword } from "../../http/userAPI";

const ResetPassword = () => {
    const history = useNavigate();
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [secretAnswer, setSecretAnswer] = useState('');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(token, password);
            alert('Пароль успешно изменен');
            history(LOGIN_ROUTE);
        } catch (e) {
            alert(e.response ? e.response.data.message : 'Произошла ошибка при выполнении запроса');
        }
    };

    // Проверка ответа на секретный вопрос
    const handleCheckAnswer = () => {
        // Здесь можно добавить логику для проверки ответа на секретный вопрос
        // Например, если ответ "Барсик", то считаем его верным
        if (secretAnswer === "Барсик") {
            setIsAnswerCorrect(true);
            alert('Ответ верный! Теперь вы можете изменить пароль.');
        } else {
            setIsAnswerCorrect(false);
            alert('Ответ неверный. Попробуйте ещё раз.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2 className={styles.title}>Сброс пароля</h2>

                <div className={styles.cardPravila}>
                    <p className={styles.pravilaTitle}>Внимание! Безопасный пароль должен соотвествовать следующим
                        правилам: </p>
                    <p className={styles.pravilaPunkt}> 1. Должен содержать не менее 8 символов </p>
                    <p className={styles.pravilaPunkt}> 2. Должен содержать хотя бы одну цифру</p>
                    <p className={styles.pravilaPunkt}> 3. Должен содержать хотя бы одну заглавную букву</p>
                    <p className={styles.pravilaPunkt}> 4. Должен содержать хотя бы один специальный символ
                        (!@#$%^&*)</p>
                </div>


                <form className={styles.form}>
                    {/* Поле для ввода ответа на секретный вопрос */}
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Введите ответ на секретный вопрос..."
                        value={secretAnswer}
                        onChange={(e) => setSecretAnswer(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className={styles.button}
                        onClick={handleCheckAnswer}
                    >
                        Проверить ответ
                    </button>
                </form>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Введите новый пароль..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={!isAnswerCorrect} // Блокировка поля, пока ответ не верный
                    />
                    <button
                        type="submit"
                        className={styles.button}
                        disabled={!isAnswerCorrect} // Блокировка кнопки, пока ответ не верный
                    >
                        Сбросить пароль
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;