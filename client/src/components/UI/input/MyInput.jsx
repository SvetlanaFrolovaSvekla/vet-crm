import React from 'react';
import s from './MyInput.module.css'
import classNames from 'classnames';


const MyInput = ({ className, ...props }) => {
    return (
        <input {...props} className={classNames(s.myInput, className)} />
    );
};


export default MyInput;