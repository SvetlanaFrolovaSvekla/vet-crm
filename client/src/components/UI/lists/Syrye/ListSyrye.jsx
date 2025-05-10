import React from 'react';
import s from './ListSyrye.module.css';
import MyButton from "../../button/MyButton";

const ListSyrye = (props) => {

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
                    <th>Название</th>
                    <th>Единица измерения</th>
                    <th>Количество</th>
                    <th>Сумма</th>
                    <th>Действия</th>
                </tr>
                </thead>

                <tbody>
                {props.items.map((item, index) => (
                    <tr key={item.ID}>
                        <td>{index + 1}</td>
                        <td>{item.naimenovanie}</td>
                        <td>{item.Edinici_izmereniya?.naimenovanie}</td>
                        <td>{item.kolichestvo}</td>
                        <td>{item.summa}</td>
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

export default ListSyrye;