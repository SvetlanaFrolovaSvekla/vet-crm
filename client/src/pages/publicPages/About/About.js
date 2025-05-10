import React from 'react';
import s from './About.module.css'
import {observer} from "mobx-react-lite";

const AboutComponent = () => {
    return (
        <div className={s.aboutBlock}>
           О нас!
        </div>
    );
};


const About = observer(AboutComponent);
export default About;