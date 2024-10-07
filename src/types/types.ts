//! наши типы
// тип для userSlice.ts (redux-toolkit)
export interface IUser { 
    id: number
    email: string
    token: string
}



// ожидаемые данные отправляемые НА сервер при регистрации new user (в src\services\auth.service.ts)
export interface IUserData {
    email: string
    password: string
}


// ожидаемые поля в ответе ОТ сервера при регистрации нового пользователя
// ответ: token и объект user, находящийся внутри объекта, типа так: 
// { user: {
//     token: ..., 
//     user: {{email: "admin2@gmail.com",…}}}
export interface IResponseUser {
    id: number
    email: string
    password: string
    createdAt: string
    updatedAt: string
}

// ответ: объект token 
export interface IResponseUserData {
    token: string
    user: IResponseUser // так как в ответе от бэкенда => внутри token: {user: {}}
}


// Возвращаемый тип транзакции
export interface ITransaction {
    amount: number
    createdAt: string
    updatedAt: string
    title: string
    type: string
    id: number
    category: ICategory
}

// ожидаемый тип, который возвращается на get-запрос в методе categoryLoader (Categories.tsx)
export interface ICategory {
    title: string
    id: number
    createdAt: string
    updatedAt: string
    transactions?: [] // необязательное поле. пока массив
}


// тип для загрузчика "transactionLoader", который вернет данные: категории, транзкции, значения income и expense
export interface IResponseTransactionLoader {
    categories: ICategory[]
    transactions: ITransaction[]
    totalIncome: number
    totalExpense: number
}