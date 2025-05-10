import React from 'react';
import s from './MySelect.module.css'; // Импортируем стили
/*
* Моя компонента принимает четыре пропса:
1. option — массив объектов с атрибутами value и name для отображения вариантов выбора.
// - value - Это фактическое значение, какой либо аргумент строки, по которому производится сортировка
// - name - это название выбранной операции


2. defaultValue — текст по умолчанию для option disabled, который не позволяет выбрать пустое значение.
// Например у меня выше при вызове компоненты передается -Сортировка-

3. value - выбранное значение из выпадающего списка

4. onChange — функция-обработчик, которая вызывается при изменении значения.
при изменении у меня сохраняется выбранное значение в value.
*/


const MySelect = ({option, defaultValue, value, onChange}) => {
    return (
        <div className={s.selectContainer}>
        <select
            value={value}
            onChange={event => onChange(event.target.value)}
            className={s.select}
        >
            {/*Первый вариант, который нельзя выбрать - название, defaultValue*/}
            <option disabled value="">{defaultValue}</option>
            {/*Следующие варианты я беру из метода map.
            Каждая опция у меня будет содержать ключик и значение - то значение body, title
            В качестве заголовка вывожу option.name
            */}

            {/* Перебираем массив option и создаем <option> для каждого элемента. */}


            {/*
            🔹 key — это уникальный идентификатор элемента, который нужен React для эффективного рендеринга списка.
            🔹  value — это значение, которое передается в <select> при выборе данной опции.
            */}
            {option.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
            <span className={s.arrow}>▼</span>
        </div>
    );
};

export default MySelect;