import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true);


  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }

  }, []);


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))

  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)


  }



  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    }
    );

    setTodos(newTodos)

    saveToLS()
  }
  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id !== id
    }
    );

    setTodos(newTodos)
    saveToLS()
  }
  const handleAdd = () => {

    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    saveToLS()
  }
  const handleChange = (e) => {

    setTodo(e.target.value)
  }
  const handleChekbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex(item => {
      return item.id === id;
    }
    )
    console.log(index);

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index.isCompleted];
    setTodos(newTodos)
    console.log(newTodos);

  }



  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 bg-green-100  rounded-xl p-5 min-h-[80vh]  md:w-10/12">
      <h1 className='font-bold text-center text-xl'>MiTask-Limited Time</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold my-5'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-lg px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-green-800 hover:bg-green-900 py-1 px-1 text-sm font-bold text-white rounded-md disabled:bg-green-600'>Save</button>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className="text-xl font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between">
              <div className='flex gap'>
                <input name={item.id} onChange={handleChekbox} type="checkbox" checked={item.isCompleted}/>
              </div>

              <div className={item.isCompleted ? "line-through" : ""}>
                {item.todo}</div><div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-green-800 hover:bg-green-900 py-1 px-1 text-sm font-bold text-white rounded-md mx-6'><FaEdit />
                </button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-green-800 hover:bg-green-900 py-1 px-1 text-sm font-bold text-white rounded-md mx-0'><MdDeleteForever /></button>
              </div>
            </div>
          })}</div></div>


    </>
  )
}

export default App
