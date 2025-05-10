import React, {useState} from 'react';
import s from './ChangePasswordModal.module.css';
import styles from "../../pages/Auth.module.css";

const ChangePasswordModal = ({ visible, setVisible, oldPassword, newPassword,
                                 confirmPassword, setOldPassword, setNewPassword,
                                 setConfirmPassword, handleChangePassword, error, success,  answerForSecretQuestion }) => {

    const [secretAnswer, setSecretAnswer] = useState('');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

    // Проверка ответа на секретный вопрос
    // Проверка ответа на секретный вопрос
    const handleCheckAnswer = () => {
        if (secretAnswer === answerForSecretQuestion) { // Сравниваем с ответом из БД
            setIsAnswerCorrect(true);
            alert('Ответ верный! Теперь вы можете изменить пароль.');
        } else {
            setIsAnswerCorrect(false);
            alert('Ответ неверный. Попробуйте ещё раз.');
            console.log('answerForSecretQuestion', answerForSecretQuestion)
        }
    };

    if (!visible) return null;

    return (
        <div className={s.modalOverlay} onClick={() => setVisible(false)}>
            <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
                <p   className={s.title}>Изменение пароля</p>

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

                <form onSubmit={handleChangePassword}>


                    <input
                        className={s.input}
                        type="password"
                        placeholder="Старый пароль"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        disabled={!isAnswerCorrect} // Блокировка поля, пока ответ не верный
                    />
                    <input
                        className={s.input}
                        type="password"
                        placeholder="Новый пароль"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        disabled={!isAnswerCorrect} // Блокировка поля, пока ответ не верный
                    />
                    <input
                        className={s.input}
                        type="password"
                        placeholder="Подтвердите новый пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={!isAnswerCorrect} // Блокировка поля, пока ответ не верный
                    />
                    <button type="submit"   className={s.button}   disabled={!isAnswerCorrect}>Изменить пароль</button>
                </form>
                {error && <p className={s.error}>{error}</p>}
                {success && <p className={s.success}>{success}</p>}
                <button className={s.closeButton} onClick={() => setVisible(false)}>Закрыть</button>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
