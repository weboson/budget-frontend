// Форматирование даты (используется в TransactionTable.tsx)
//Изначально формат даты такой: 	2023-10-31T23:18:08.946Z
//И нужно его переформатировать в читаемый: "четверг, 20 декабря 2012 г."

// Справка про “toLocaleDateString”: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString 
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    return date.toLocaleDateString('ru-RU', options);
}
