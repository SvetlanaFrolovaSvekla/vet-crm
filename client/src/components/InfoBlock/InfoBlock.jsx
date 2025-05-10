import React from 'react';
import s from './InfoBlock.module.css'
import mainImage from '../../resources/img1.svg';
import {observer} from "mobx-react-lite";


const InfoBlock = observer(() => {

    return (
        <div className={s.contentBlock}>

            <div className={s.content}>


                <div className={s.infoCont}>
                    <p className={s.infoContP2}>Вас ждет множество полезных функций нашей системы!!</p>
                    <p className={s.infoContP1}>Пожалуйста, войдите в свой профиль для работы в CRM “Айболит”!</p>

                    <div className={s.btn}>
                        <a href="/about">
                            Как это сделать ?
                        </a>
                    </div>
                </div>

                <div className={s.mainImageCont}>
                    <img src={mainImage} alt="Главное изображение"/>
                </div>
            </div>

        </div>
    );
});


export default InfoBlock;