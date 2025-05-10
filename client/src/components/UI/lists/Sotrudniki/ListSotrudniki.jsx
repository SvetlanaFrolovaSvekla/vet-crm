import React from 'react';
import s from './ListSotrudniki.module.css';
import MyButton from "../../button/MyButton";

const ListSotrudniki = (props) => {

    if (!props.items.length) {
        return (
            <h1>
                Нет ни одной записи!
            </h1>
        )
    }

    return (
        <div>
            <table className={s.table}>

                <thead>
                <tr>
                    <th>№</th>
                    <th>ФИО</th>
                    <th>Должность</th>
                    <th>Оклад</th>
                    <th>Адрес</th>
                    <th>Телефон</th>
                    <th>Действия</th>
                </tr>
                </thead>

                <tbody>
                {props.items.map((item, index) => (
                    <tr key={item.ID}>
                        <td>{index + 1}</td>
                        <td>{item.FIO}</td>
                        <td>{item.Doljnosti?.doljnost}</td>
                        <td>{item.oklad}</td>
                        <td>{item.adres}</td>
                        <td>{item.telefon}</td>
                        <td className={s.actionsCell}>
                            <MyButton onClick={() => props.onEdit(item.ID)} className={s.btn_edit}>
                                Редактировать
                            </MyButton>
                            <MyButton onClick={() => props.onDelete(item.ID)} className={s.btn_del}>
                                Удалить
                            </MyButton>
                        </td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    );
};

export default ListSotrudniki;
