import React from 'react';
import s from './Support.module.css'
import {observer} from "mobx-react-lite";

const SupportComponent = () => {
    return (
        <div className={s.supportBlock}>
            Поддержка
        </div>
    );
};


const Support = observer(SupportComponent);
export default Support;