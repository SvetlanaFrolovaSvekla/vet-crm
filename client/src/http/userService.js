
// Все запросы будут отправляться на этот адрес
const API_URL = 'https://vet-crm.onrender.com/api/users';


export const fetchUsers = async () => {
    const response = await fetch(`${API_URL}/list`, { cache: 'no-cache' }); // Ожидание ответа
    if (!response.ok) { // Если ответ не ОКЕЙ
        throw new Error('Ошибка при загрузке данных');
    }
    return response.json(); // Если запрос успешен, преобразует ответ в JSON и возвращает его.
};


export const updateUser = async (email, updatedItem) => {

    console.log("Отправляемые данные:", JSON.stringify(updatedItem, null, 2));


    console.log("Отправляемые данные:", updatedItem); // Проверить, какие данные отправляются
    const response = await fetch(`${API_URL}/email/${email}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
    });

    if (!response.ok) {
        throw new Error('Ошибка при обновлении, updateUser ');
    }

    return response.json();
};


