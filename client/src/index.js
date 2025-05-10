import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from "./store/UserStore";

// 1. Создаю контекст
export const Context = createContext(null)
console.log(process.env.REACT_APP_API_URL)

// 2. Оборачиваю <App/> в Context.Provider; Потом передаю зачением объект, юзерСтор (созданный нами стор в соотв. файле)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Context.Provider value={{
            user: new UserStore()
        }}>
            <App/>
        </Context.Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
