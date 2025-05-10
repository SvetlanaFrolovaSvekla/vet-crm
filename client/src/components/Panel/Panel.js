import React, { useState } from 'react';
import s from './Panel.module.css';

const Panel = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className={`${s.panelBlock} ${isVisible ? s.visible : ''}`}
            onClick={() => setIsVisible(!isVisible)}
        >
            <div className={s.content}>
                <p>Панель с анимацией</p>
                <p>Она выезжает слева!</p>
                <a href="#">Ссылка</a>
            </div>
        </div>
    );
};

export default Panel;