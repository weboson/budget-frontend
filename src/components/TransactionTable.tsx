// таблица транзакций
import { FC, useEffect, useState } from 'react'; // тип функционального компонента от React
import { FaTrash } from 'react-icons/fa';
import { Form, useLoaderData } from 'react-router-dom';
import { IResponseTransactionLoader, ITransaction } from '../types/types';
// хэлперы 
import { formatDate } from '../helpers/date.helper' // форматирование даты в более читабельный вид
import { formatToUSD } from '../helpers/currency.helper' // форматирование даты в более читабельный вид
import { instance } from '../api/axios.api';
import ReactPaginate from 'react-paginate';

// интерфейс для аргумента limit
interface ITransactionTable {
    limit: number
}

const TransactionTable: FC<ITransactionTable> = ({ limit = 3 }) => {
    // получим данные от посредника useLoaderData (react-router-dom) <= transactionLoader
    const { transactions } = useLoaderData() as IResponseTransactionLoader // как тип IResponseTransactionLoader
    
    //! состояния для пагинации (pagination)
    // Почему [] - useState => пару значений, то есть массив из двух элементов: https://ru.legacy.reactjs.org/docs/hooks-state.html#tip-what-do-square-brackets-mean
    // массив данных
    const [data, setData] = useState<ITransaction[]>([])
    // массив текущей страницы
    const [currentPage, setCurrentPage] = useState<number>(1)
    // всего страниц
    const [totalPages, setTotalPages] = useState<number>(0)

    // метод для получения данных (для пагинации)
    const fetchTransactions = async (page: number) => {
        // запрашиваем данные
        const response = await instance.get(`/transactions/pagination?page=${page}&limit=${limit}`)
        // передаем данные в состояние
        setData(response.data)
        // рассчитаем количество всех страницы исходя из полного списка транзакций
        setTotalPages(Math.ceil(transactions.length / limit))
    }

    // чтобы изменять страницу + 1
    const handlerPageChange = (selectedItem: {selected: number}) => { // для react-paginate нужно принимать объект
        setCurrentPage(selectedItem.selected + 1)
    }

    // Будем вызывать метод, когда будут меняться значения: currentPage, transactions
    useEffect(() => { fetchTransactions(currentPage) }, [currentPage, transactions])

    return <>

<ReactPaginate
        // styles
        className='flex gap-3 justify-end mt-4 items-center'
        activeClassName='bg-blue-600 rounded-sm'
        pageLinkClassName='text-white text-xs py-1 px-2 rounded-sm'
        previousClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
        nextClassName='text-white py-1 px-2 bg-slate-800 rounded-sm text-xs'
        disabledClassName='text-white/50 cursor-not-allowed'
        disabledLinkClassName='text-slate-600 cursor-not-allowed'
        // params
        pageCount={totalPages}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        onPageChange={handlerPageChange}
      />

        <div className='bg-slate-800 px-4 py-3 rounded-md'>
            <table className='w-full'>
                <thead>
                    <tr>
                        <td className='font-bold'> № </td>
                        <td className='font-bold'>Title</td>
                        <td className='font-bold'>Amount($)</td>
                        <td className='font-bold'>Category</td>
                        <td className='font-bold'>Date</td>
                        <td className='text-right'>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((transaction, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td> {transaction.title} </td>
                            <td className={
                                transaction.type === 'income'
                                    ? 'text-green-500'
                                    : 'text-red-500'
                            }
                            >
                                {transaction.type == 'income'
                                    ? `+ ${formatToUSD.format(transaction.amount)}`
                                    : `- ${formatToUSD.format(transaction.amount)}`
                                }
                            </td>
                            <td> {transaction.category?.title || `Other`} </td>
                            <td>{formatDate(transaction.createdAt)}</td>
                            <td>
                                <Form method='delete' action="/transactions">
                                    <input type="hidden" name='id' value={transaction.id}/>
                                    <button className='btn hover:btn-red ml-auto'>
                                        <FaTrash />
                                    </button>
                                </Form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
};

export default TransactionTable;