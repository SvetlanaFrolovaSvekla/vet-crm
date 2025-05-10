import React, {useEffect, useState} from 'react';
import MyInput from "../UI/input/MyInput";
import MyButton from "../UI/button/MyButton";
import m from './ItemFormEditProfile.module.css'

const ItemFormEditProfile = ({item, update, setEditModal, roles, setChangePasswordModal}) => {
    const [email, setEmail] = useState(item.email);
    const [emailU, setEmailU] = useState(item.email);
    const [password, setPassword] = useState(item.password);
    const [roleId, setRoleId] = useState(item.role);
    const [number, setNumber] = useState(item.number);
    const [FIO, setFIO] = useState(item.FIO);


    // Обновляем состояние формы при изменении пропса `item`
    useEffect(() => {
        if (item) {
            setEmailU(item.email);
            setRoleId(item.role);
            setNumber(item.number);
            setFIO(item.FIO);
        }
    }, [item]);


    const handleSubmit = (e) => {
        e.preventDefault();
        update({emailU, role: roleId, number, FIO});
    };


    return (
        <form onSubmit={handleSubmit} className={m.form}>

            <p className={m.title}>ФИО:</p>
            <MyInput
                type="text"
                placeholder="ФИО"
                value={FIO}
                onChange={(e) => setFIO(e.target.value)}
                className={m.inputEdit}
            />

            <p className={m.title}>Электронная почта:</p>
            <MyInput
                type="text"
                placeholder="email"
                value={emailU}
                onChange={(e) => setEmail(e.target.value)}
                className={m.inputEdit}
            />
            {/*
            <p>Пароль:</p>
            <MyInput
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={m.inputEdit}
            />*/}

            {/* Выпадающий список для выбора должности
            <p>Роль на сервисе:</p>
            <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                required
                className={m.selectEdit}
            >
                <option value="">Выберите роль</option>
                {roles.map((role) => (
                    <option key={role.ID} value={role.ID}>
                        {role.naimenovanie}
                    </option>
                ))}
            </select>
            */}

            <p className={m.title}>Номер телефона:</p>
            <MyInput
                type="text"
                placeholder="+996"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className={m.inputEdit}
            />

            <button type="button" className={m.titlePassword} onClick={() => setChangePasswordModal(true)}>
                Изменить пароль?
            </button>



            <div className={m.btn_cont}>
                <MyButton type="submit" className={m.btn_createOK}>Сохранить</MyButton>
                <MyButton onClick={() => setEditModal(false)} className={m.btn_createNO}>Отмена</MyButton>
            </div>

        </form>
    );
};

export default ItemFormEditProfile;