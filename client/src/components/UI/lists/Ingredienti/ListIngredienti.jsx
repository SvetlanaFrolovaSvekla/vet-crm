import React from 'react';
import s from './ListIngredienti.module.css';
import MyButton from "../../button/MyButton";


const ListIngredienti = (props) => {

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
                    {/*  <th>Продукция</th>*/}
                    <th>Сырье</th>
                    <th>Ед. измерения</th> {/* Новый столбец */}
                    <th>Количество</th>
                    <th>Действия</th>
                </tr>
                </thead>

                <tbody>
                {props.items.map((item, index) => (
                    <tr key={item.ID}>
                        <td>{index + 1}</td>
                        {/*  <td>{item.Gotovaya_produkciya?.naimenovanie}</td>*/}
                        <td>{item.Syrye?.naimenovanie}</td>
                        <td>{item.Syrye?.Edinici_izmereniya?.naimenovanie}</td> {/* Отображение единицы измерения */}
                        <td>{item.kolichestvo}</td>
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

export default ListIngredienti;