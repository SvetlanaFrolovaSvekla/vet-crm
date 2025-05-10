import React from 'react';
import s from './MyModal.module.css';
import classNames from 'classnames';
import cross from '../../../resources/images/cross.svg'; // Путь к изображению крестика

const MyModal = ({children, className, visible, setVisible, closeButtonClassName }) => {
    const rootClasses = [s.myModal];
    if (visible) {
        rootClasses.push(s.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classNames(s.myModalContent, className)}
                 onClick={(e) => e.stopPropagation()}>

                {/* Кнопка закрытия */}
                {/* Кнопка закрытия с переданным классом */}
                <button className={classNames(s.closeButton, closeButtonClassName)} onClick={() => setVisible(false)}>
                    <img src={cross} alt="Закрыть" />
                </button>

                {children}
            </div>
        </div>
    );
};

export default MyModal;
