import React from 'react';
import s from './MyButton.module.css';
import classNames from 'classnames';

const MyButton = ({ children, className, ...props }) => {
    return (
        <button {...props} className={classNames(className)}>
            {children}
        </button>
    );
};

export default MyButton;
