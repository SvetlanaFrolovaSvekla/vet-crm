import React from 'react';
import s from './ProfileModalEdit.module.css'
import cross from '../../resources/cross.svg'


const ProfileModalEdit = ({children, className, visible, setVisible, closeButtonClassName }) => {

    const rootClasses = [s.myModal];
    if (visible) {
        rootClasses.push(s.active);
    }


    console.log("Модальное окно:", visible);
    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>


        <div className={s.modalContent}

                 onClick={(e) => e.stopPropagation()}>
                {/* Кнопка закрытия */}
                {/* Кнопка закрытия с переданным классом */}
                <button className={s.closeButton} onClick={() => setVisible(false)}>
                    <img src={cross} alt="Закрыть" />
                </button>

                {children}
            </div>
        </div>
    );
};

export default ProfileModalEdit;