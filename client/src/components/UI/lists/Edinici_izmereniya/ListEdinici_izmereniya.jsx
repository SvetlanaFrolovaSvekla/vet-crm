import React from 'react';
import s from './ListEdinici_izmereniya.module.css';
import MyButton from "../../button/MyButton";

const ListEdiniciIzmereniya = (props) => {

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
                    <th>Название единицы измерения</th>
                    <th>Действия</th>
                </tr>
                </thead>

                <tbody>
                {props.items.map((item, index) => (
                    <tr key={item.ID}>
                        <td>{index + 1}</td>
                        <td>{props.renderItem(item)}</td>
                        <td>
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

export default ListEdiniciIzmereniya;