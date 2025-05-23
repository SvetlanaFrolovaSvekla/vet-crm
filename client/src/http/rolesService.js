/*
* Этот файл отвечает за взаимодействие с сервером через HTTP-запросы.
* Каждая функция здесь отправляет запрос на сервер и обрабатывает ответ.
* */

// Все запросы будут отправляться на этот адрес
const API_URL = 'https://vet-crm.onrender.com/api/roles';


/*
* fetch — это встроенный в браузер метод для выполнения HTTP-запросов.
* Он позволяет отправлять запросы на сервер и получать ответы.
* Например, отправить GET-запрос для получения данных или POST-запрос для отправки данных на сервер.
*/

/*
* await — это ключевое слово, которое используется внутри async-функций для
* приостановки выполнения кода до тех пор, пока промис
* (в данном случае HTTP-запрос) не будет выполнен.
*
*
* Промис (Promise) — это объект в JavaScript, который представляет
* результат асинхронной операции. Он используется для работы с задачами,
* которые могут занять некоторое время (например, HTTP-запросы, чтение файлов,
* таймеры и т.д.). Промис позволяет удобно обрабатывать такие операции, не
* блокируя основной поток выполнения программы.
*/


// fetch по умолчанию использует GET, если явно не указан другой метод!
// Отправляет GET-запрос на сервер по адресу htp://localhost:5000/api/roles/list
export const fetchRoles = async () => {
    const response = await fetch(`${API_URL}/list`); // Ожидание ответа
    if (!response.ok) { // Если ответ не ОКЕЙ
        throw new Error('Ошибка при загрузке данных');
    }
    return response.json(); // Если запрос успешен, преобразует ответ в JSON и возвращает его.
};

const updateUser = async (id, updatedItem) => {
    try {
        const response = await fetch(`${API_URL}/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedItem),
        });

        if (!response.ok) {
            throw new Error('Ошибка при обновлении данных');
        }

        return response.json();
    } catch (error) {
        console.error('Ошибка при обновлении пользователя:', error);
        throw error;
    }
};

