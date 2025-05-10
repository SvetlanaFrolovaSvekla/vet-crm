import React from 'react';
import s from "./CardAnimalSmall.module.css";
import PropTypes from 'prop-types';

const CardAnimalSmall = ({ image }) => {
    return (
        <div className={s.cardBlock}>
            <div className={s.textBlock}>
                <p className={s.name}>Имя животного:</p>
                <p className={s.type}>Тип животного:</p>
                <p className={s.age}>Возраст животного:</p>
                <p className={s.porod}>Порода:</p>
                <p className={s.disc}>Краткое описание:</p>
            </div>

            <div className={s.avatar}>
                <img src={image} alt="Аватарка животного"/>
                <div className={s.more}>
                    Больше
                </div>
            </div>
        </div>
    );
};

CardAnimalSmall.propTypes = {
    image: PropTypes.string.isRequired,
};

export default CardAnimalSmall;