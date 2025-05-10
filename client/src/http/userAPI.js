import {$authHost, $host} from "./index";
import { jwtDecode } from "jwt-decode";

export const login = async (email, password) => {
    const { data } = await $host.post('api/authorization/login', { email, password },  {
        withCredentials: true
    });
    console.log("Ответ сервера при логине:", data);
    localStorage.setItem('token', data.token);
    return data.user;
};


export const registration = async (email, password, number, FIO) => {
    const { data } = await $host.post('api/authorization/registration', { email, password, number, FIO, role: 1 },
        {
        withCredentials: true
    });
    localStorage.setItem('token', data.token);
    return data.user;
};


export const check = async () => {
    console.log(`Запрос check() на: ${process.env.REACT_APP_API_URL}/api/authorization/auth`);
    const { data } = await $authHost.get('api/authorization/auth');
    localStorage.setItem('token', data.token);

    const decodedToken = jwtDecode(data.token);
    return { id: decodedToken.id, email: decodedToken.email, role: decodedToken.role, number: decodedToken.number, FIO: decodedToken.FIO,   roleName: decodedToken.roleName, // Получаем роль из токена
        ...data.user }; // Вернём полный объект пользователя
};

export const forgotPassword = async (email) => {
    console.log(`Запрос на: ${process.env.REACT_APP_API_URL}/api/authorization/forgot-password`);
    const { data } = await $host.post('api/authorization/forgot-password', { email }, );
    return data;
};

export const resetPassword = async (token, password) => {
    const { data } = await $host.post(`api/authorization/reset-password/${token}`, { password });
    return data;
};

// Метод changePassword в userAPI
export const changePassword = async (email, oldPassword, newPassword) => {
    const { data } = await $authHost.post('api/authorization/change-password', {
        email, // Передаём email пользователя
        oldPassword,
        newPassword
    });
    return data;
};