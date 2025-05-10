import React from 'react';
import s from './ListDoljnosti.module.css';
import MyButton from "../../button/MyButton";

const ListDoljnosti = (props) => {

    // в items содержится массив doljnosti. Проверяется его длина!
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
                    <th>Название должности</th>
                    <th>Действия</th>
                </tr>
                </thead>

                <tbody>
                {/*Метод мап работает с каждым элементом массива, index - это номер элемента по счету в списке.
                tr - Одна запись, передаем ключ - ID, А НЕ ИНДЕКС! ИНДЕКС МОЖЕТ ИЗМЕНИТЬСЯ!
                td - столбец с информ. о записи, конкр. свойство.
                 сначала № - это номер(начиная с 0)+1
                 потом {props.renderItem(item)} - здесь содержится поле doljnost для item*/}
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

export default ListDoljnosti;
