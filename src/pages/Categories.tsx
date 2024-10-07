// страница (контент) категорий
import { FC, useState } from "react";
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai' // иконки 
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from "react-router-dom"; 
import { instance } from "../api/axios.api"; // axios: методы для запросов
import CategoryModal from "../components/CategoryModal";
import { ICategory } from "../types/types"; // наш тип на во

//! Post, patch, delete 
// метод отправки данных формы из react-router-dom, подробнее: https://reactrouter.com/en/main/components/form#mutation-submissions
// для action (отправки) формы - импорт в router.tsx
export const categoriesAction = async ({ request}: any ) => {
  switch (request.method) { // если request.method == "POST"
    case "POST": {
      const formData = await request.formData() // данные формы
      const title = {
        title: formData.get('title'),
      }
      // axios - запрос
      await instance.post('/categories', title)
      return null // так как функция должна что-то вернуть = хз почему
    }
    // обновление категории (редактирование-сохранение)
    case "PATCH": { // если request.method == "PATCH"
      const formData = await request.formData()
      // получим данные с формы (input)
      const category = { 
        id: formData.get('id'),
        title: formData.get('title')
      }
      // заменяем данные в БД на данные в форме
      await instance.patch(`/categories/category/${category.id}`, category)
      return null
    }
    case "DELETE": {  // если request.method == "DELETE"
      const formData = await request.formData()
      const categoryId = formData.get('id') // id из <input type="hidden" name="id" value={category.id} />
      // axios-запрос
      await instance.delete(`/categories/category/${categoryId}`) // /categories/category/ из бэкенда
      return null
    }
  }
}

//! GetAll
// получить список категорий (проверки на текущего пользователя проходит в бэкенде "category.service.ts" (findAll)) (подключен в router.tsx, видимо, запускается автоматически при загрузки страницы, как useEffect())
export const categoryLoader = async () => {
  const {data} = await instance.get<ICategory[]>('/categories') // axios - запрос
  return data //! хранить в себе будет - хук useLoaderData (от react-router-dom)
}


const Categories: FC = () => {
  //! useLoaderData() возвращает данные, которые возращает метод, который подключен в router.tsx в поле "loader"
  // метод(хук) от react-ROUTER-dom
  // получить все категории с помощью метода, хронящего данные на get запрос (в categoryLoader)
  const categories = useLoaderData() as ICategory[] // => как массив типов, подробнее: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions 
  
  // id категории для patch
  const [categoryId, setCategoryId] = useState<number>(0)
  const [isEdit, setIsEdit] = useState<boolean>(false) // маркер для модального окна (edit или create)

  // состояние активности модального окна (показывать или скрывать)
  const [visibleModal, setVisibleModal] = useState<boolean>(false)

  return (
  <>
    <div className="mt-10 p-4 rounded-md bg-slate-800">
    <h1>Your category list:</h1>
    
    {/* Category List */}
    {/* почему в роли "key" не используется "category.id"? */}
    <div className="mt-2 flex flex-wrap items-center gap-2">
      {categories.map((category, index) => ( //! map
              <div key={index} className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2">
              {category.title}
              <div className="absolute hidden px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between group-hover:flex">
                <button onClick={() => {
                  setCategoryId(category.id) // получить id категории, которую хотим редактировать
                  setVisibleModal(true) // для редактирования
                  setIsEdit(true) // переключатель модалки с create на patch
                }}>
                  <AiFillEdit />
                </button>
      
                <Form className="flex" method="delete" action="/categories">
                  <input type="hidden" name="id" value={category.id} />
                  <button type="submit">
                    <AiFillCloseCircle />
                  </button>
                </Form>
              </div>
            </div>
      ))}
    </div>
    
    {/* Add Category */}
    <button onClick={() => setVisibleModal(true)} className="mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white">
      <FaPlus/>
      <span>Create a new category</span>
    </button>
  </div>
{/* Модальное окно */}
{/* Add Category Modal */}
  {visibleModal && (<CategoryModal type='post' setVisibleModal={setVisibleModal}/>)}

{/* Edit Category Modal */}
  {visibleModal && isEdit && (<CategoryModal type='patch' id={categoryId} setVisibleModal={setVisibleModal}/>)} 
  </>
  )
};

export default Categories;
