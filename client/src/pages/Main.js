import React from 'react';
import InfoBlock from "../components/InfoBlock/InfoBlock";
import {observer} from "mobx-react-lite";

const MainComponent = () => {
    return (
        <div>
            <InfoBlock/>
        </div>
    );
};


const Main = observer(MainComponent);
export default Main;