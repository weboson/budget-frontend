import { FC } from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { instance } from "../api/axios.api";
import Chart from "../components/Chart"; // диаграмма (lib recharts)
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import { formatToUSD } from "../helpers/currency.helper";
import { ICategory, IResponseTransactionLoader, ITransaction} from "../types/types";

//!Get
// загрузчик списка категорий => в форму и транзакций => в таблицу
export const transactionLoader = async () => {
  // axios - запросы
  const categories = await instance.get<ICategory[]>('/categories') // получить все категории текущего пользователя
  const transactions = await instance.get<ITransaction[]>('/transactions') // получить все транзакции тек. польз-я

  // для суммирования “income” или “expense” (total)
  const totalIncome = await instance.get<number>('/transactions/income/find')
  const totalExpense = await instance.get<number>('/transactions/expense/find')


  const data = {
    categories: categories.data,
    transactions: transactions.data,
    totalIncome: totalIncome.data,
    totalExpense: totalExpense.data,
  }
  return data
}

// action 
export const transactionAction = async ({ request }: any) => {
  // request === Request {method: 'POST', url: 'http://localhost:5173/transactions', headers: Headers, destination: '', referrer: 'about:client', …}
  // console.log(request)
  switch (request.method) {
  //!Post
    case 'POST': {
      const formData = await request.formData() // отправленные данные из Form (TransactionForm.tsx)

      // формируем объект из данных от формы (Form от react-router-dom)
      const newTransaction = {
        title: formData.get('title'),
        amount: +formData.get('amount'), // '+' - иначе ошибка
        category: formData.get('category'),
        type: formData.get('type'),
      }

      // вызов axios (axios.api.ts) - передали объект с данными введенные в форме
      await instance.post('/transactions', newTransaction)
      toast.success('Transaction added.') //библиотека анимированных сообщений
      return null // т.к. должно что-то вернуть
    }
//!Delete
      case 'DELETE': {
        const formData = await request.formData();
        const transactionId = formData.get('id');
        await instance.delete(`/transactions/transaction/${transactionId}`)
        toast.success('Transaction deleted')
        return null
      }
  }
}


const Transactions: FC = () => {

  // возьмём данные загрузчика (total) через хранитель "useLoaderData" (от react-router-dom)
  const {totalExpense, totalIncome} = useLoaderData() as IResponseTransactionLoader

  return (
  <>
    <div className="grid grid-cols-3 gap-4 mt-4 items-start">
      {/* Add Transaction Form */}
      <div className="col-span-2 grid">
        <TransactionForm />
      </div>

      {/* Statistic block */}
      <div className="rounded-md bg-slate-800 p-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="uppercase text-sm font-bold text-center">
              Total Income:
            </p>
            <p className="mt-2 rounded-sm bg-green-600 p-1 text-center">
              {formatToUSD.format(totalIncome)}
            </p>
          </div>
          <div>
            <p className="uppercase text-sm font-bold text-center">
              Total Expense:
            </p>
            <p className="mt-2 rounded-sm bg-red-500 p-1 text-center">
            {formatToUSD.format(totalExpense)}
            </p>
          </div>
        </div>

        <>
        <Chart totalExpense={totalExpense} totalIncome={totalIncome} />
        </>
      </div>
    </div>

    {/* Transactions Table */}
    <h1 className="my-5">
      <TransactionTable limit={5}/>
    </h1>
  </>);
};

export default Transactions;
