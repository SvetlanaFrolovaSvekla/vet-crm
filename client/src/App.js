import React from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Spinner} from 'react-bootstrap';
import {observer} from "mobx-react-lite";



const App = observer(() => {
    const [loading, setLoading] = useState(true)
    const { user } = useContext(Context);
    const [forceUpdate] = useState(false);

    useEffect(() => {
        check().then(data => {
            // Обновляем userStore
            user.setUser(data);
            user.setIsAuth(true);

            // Обновляем localStorage
            // localStorage.setItem("user", JSON.stringify(data));
        }).catch(() => {
            localStorage.removeItem('token');
            user.setUser({});
            user.setIsAuth(false);
        }).finally(() => setLoading(false));
    }, [forceUpdate]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <Spinner animation="grow"/>
            </div>
        )
    }

    return (
        <BrowserRouter>
                <AppRouter/>
        </BrowserRouter>
    );
});

export default App;
