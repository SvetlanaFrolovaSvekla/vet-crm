import React, {useCallback, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";

// Картинки
import EllipseImage from '../../../resources/Ellipse.svg';
import Cat from '../../../resources/Cat.svg';
import Dog from '../../../resources/Dog.svg';
import Bird from '../../../resources/Bird.svg';
import s from './Admin.module.css';

// Другие компоненты
import CardAnimalSmall from "../../../components/CardAnimalSmall/CardAnimalSmall";
import ProfileModalEdit from "../../../components/Modals/ProfileModalEdit";
import ItemFormEditProfile from "../../../components/Modals/ItemFormEditProfile";
import ChangePasswordModal from "../../../components/Modals/ChangePasswordModal";


// Логика для взаимодействия с сервером
import {fetchRoles as fetchRolesService} from '../../../http/rolesService';
import {fetchUsers, updateUser} from '../../../http/userService';
import { changePassword } from '../../../http/userAPI';

const AdminComponent = () => {
    const {user, setUser} = useContext(Context); // Юзер - состояние сохраняетсяя из контекста, под кем залогинились
    const [editModal, setEditModal] = useState(false); // Состояние окна для редактирования
    const [currentItem, setCurrentItem] = useState(null); // Состояние для изменения данных
    const [roles, setRoles] = useState([]); // Состояние массива ролей для внешнего ключа
    const [users, setUsers] = useState([]); // Состояие для массива пользователей
    const [forceUpdate, setForceUpdate] = useState(false);

    const [changePasswordModal, setChangePasswordModal] = useState(false);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    // Получаем всех пользователей из массива
    useEffect(() => {
        console.log("Загрузка пользователей...");
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
                setUser(data);
                console.log("!!!!!!!!!!! data ", data);
                console.log("!!!!!!!!!!! users ", users);
            } catch (error) {
                console.error('Ошибка загрузки пользователей:', error);
            }
        };
        loadUsers();
    }, [forceUpdate]);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const parsedUser = JSON.parse(savedUser);
            user.setUser(parsedUser);
        }
    }, [forceUpdate]);





    // Загрузка данных о внешнем ключе
    const fetchRoles = useCallback(async () => {
        try {
            const data = await fetchRolesService(); // Получение всех ролей
            setRoles(data); // Обновление состояния
        } catch (error) {
            console.error('Ошибка при загрузке ролей:', error);
            alert('Ошибка при загрузке ролей');
        }
    }, [forceUpdate]);
    // Загрузка данных при монтировании компонента (ролей)
    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setError('Новый пароль и подтверждение пароля не совпадают');
            return;
        }

        try {
            const response = await changePassword(user.user.email, oldPassword, newPassword); // Передаём email
            setSuccess('Пароль успешно изменён');
            setError('');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Ошибка при изменении пароля');
            setSuccess('');
        }
    };

    // При нажатии на кнопку Редактировать данные
    const handleEdit = (email) => {
        console.log("Редактируем пользователя с email:", email);
        const itemToEdit = users.find((u) => u.email === email);
        console.log("Найденный пользователь:", itemToEdit);

        if (itemToEdit) {
            setCurrentItem(itemToEdit);
            setEditModal(true);
        } else {
            console.error("Пользователь не найден!");
        }
    };

    const handleUpdate = async (updatedItem) => {
        try {
            const response = await updateUser(updatedItem.emailU, updatedItem);
            console.log("Полученный ответ при обновлении:", response);

            // Обновляем состояние пользователя в MobX
            user.setUser(response);

            // Обновляем localStorage
            localStorage.setItem('user', JSON.stringify(response));

            // Обновляем список пользователей
            const data = await fetchUsers();
            setUsers(data);

            setEditModal(false);
            setForceUpdate(prev => !prev);

            console.log("Обновленные данные пользователя:", response);
            console.log("Обновленный список пользователей:", data);
        } catch (error) {
            console.error('Ошибка при редактировании:', error);
            alert('Ошибка при редактировании');
        }
    };

    console.log("User в AdminComponent перед рендером (user.user):", user.user);

    return (

        <div className={s.adminBlock}>
            {user.isAuth ? (
                <div className={s.content}>
                    {/* Левый блок с пользователем */}
                    <div className={s.leftColumn}>
                        <div className={s.userBlock}>
                            {/* Левая колонка (аватар + кнопка) */}
                            <div className={s.userLeft}>
                                <div className={s.avatar}>
                                    <img src={EllipseImage} alt="Аватарка пользователя"/>
                                </div>

                                <div className={s.redact} onClick={() => handleEdit(user.user.email)}>
                                    Редактировать данные
                                </div>

                                <div className={s.content}>
                                    {/* Модальное окно для редактирования */}

                                    <ProfileModalEdit visible={editModal} setVisible={setEditModal} className={s.Modal}>
                                        {currentItem && (
                                            <ItemFormEditProfile
                                                item={currentItem}
                                                update={handleUpdate}
                                                setEditModal={setEditModal}
                                                roles={roles}
                                                setChangePasswordModal={setChangePasswordModal}
                                            />
                                        )}
                                    </ProfileModalEdit>

                                </div>
                            </div>

                            {/* Правая колонка (ФИО, роль, телефон, email) */}
                            <div className={s.userRight}>
                                <div className={s.name}><p>{user.user.FIO || "ФИО не найдено!"}</p></div>
                                <div className={s.role}><p>Роль на сервисе: {user.user.roleName || "Администратор"}</p></div>
                                <div className={s.telefon}> <p>Телефон: {user.user.number || "Номер телефона не найден!"}</p></div>
                                <div className={s.email}><p>Email: {user.user.email || "Email не найден!"}</p></div>
                            </div>

                        </div>



                        <ChangePasswordModal
                            visible={changePasswordModal}
                            setVisible={setChangePasswordModal}
                            oldPassword={oldPassword}
                            newPassword={newPassword}
                            confirmPassword={confirmPassword}
                            setOldPassword={setOldPassword}
                            setNewPassword={setNewPassword}
                            setConfirmPassword={setConfirmPassword}
                            handleChangePassword={handleChangePassword}
                            error={error}
                            success={success}
                            answerForSecretQuestion={user.user.answerForSecretQuestion} // Передаем ответ на секретный вопрос
                        />


                        {/* Карточки с животными */}
                        <div className={s.cardBlock}>
                            <CardAnimalSmall image={Cat}/>
                            <CardAnimalSmall image={Dog}/>
                            <CardAnimalSmall image={Bird}/>
                        </div>
                    </div>

                    {/* Правый блок с визитами */}
                    <div className={s.visitsBlock}>
                        <h3>Последние визиты в клинику:</h3>
                    </div>
                </div>
            ) : (
                <p>Пожалуйста, авторизуйтесь, чтобы увидеть данные!</p>
            )}
        </div>

    );
};


const Admin = observer(AdminComponent);
export default Admin;