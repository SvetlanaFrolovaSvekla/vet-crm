import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {VET_ROUTE} from "../utils/consts";
import {Context} from "../index";
import Navbar from "./Navbar/Navbar";


const AppRouter = () => {
    // 2. Получаю объект юзера из этого стора!
    const {user} = useContext(Context);

    // 3. Вывожу юзера в логи...
    console.log(user);

    // 1. Сюда добавляю Routes
    return (
        <div>
            <Navbar/>

                {/* <Panel className={s.panel}/>*/}
                <Routes>
                    {user.isAuth && authRoutes.map(({path, element}) =>
                        <Route key={path} path={path} element={element}/>
                    )}
                    {publicRoutes.map(({path, element}) =>
                        <Route key={path} path={path} element={element}/>
                    )}
                    <Route path="*" element={<Navigate to={VET_ROUTE}/>}/>
                </Routes>

        </div>
    );
};

export default AppRouter;