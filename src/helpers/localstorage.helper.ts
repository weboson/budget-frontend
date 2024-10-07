// методы для LocalStorage

// Получит / сохранить / удалить JWToken при LocalSorage браузера
// localStorage - глобавльный объект хранения - JS

// получить JWToken из LocalSorage браузера
export function getTokenFromLocalStorage(): string {
    const data = localStorage.getItem('token') // взять данные по ключу 'token': https://learn.javascript.ru/localstorage
    // если данные есть ? распарсить их в строку
    const token: string = data ? JSON.parse(data) : ''

    return token
}


// установить (сохранить) JWToken в LocalSorage браузера
export function setTokenToLocalStorage(key: string, token: string): void { // примает ключ и сам JWToken
    // пропарсить данные в JSON формат 
    localStorage.setItem(key, JSON.stringify(token))
}

// удалить Jwtoken из LocalStorage
export function removeTokenFromLocalStorage(key: string): void {
    localStorage.removeItem(key)
}