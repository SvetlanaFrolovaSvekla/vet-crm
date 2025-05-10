// Нижнее подчеркивание я ставляю для того, чтоб обозначить, что эта переменная изменяться не может. Это соглашение

import {makeAutoObservable} from 'mobx';

// Здесь по дефолту иморптируем UserStore
// mobx будет следить за именениями этих переменных, при их изменении компоненты будет перерендериваться
export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        if (Array.isArray(user) && user.length > 0) {
            this._user = { ...user[0] }; // Берем первый элемент, если это массив
        } else if (typeof user === "object" && user !== null) {
            this._user = { ...user };
        } else {
            console.error("Ошибка: user должен быть объектом или массивом с объектами, получено:", user);
        }
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }
}