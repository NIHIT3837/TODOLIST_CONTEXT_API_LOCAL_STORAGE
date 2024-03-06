import { useEffect, useState } from 'react'

import './App.css'
import { TodoProvider } from './Contexts';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {

  const[todos, setTodos]=useState([]);

  const addTodo = (todo) => {
    setTodos((prev)=> [{id:Date.now(), ...todo } ,  ...prev] )
  }

  const updateTodo =(id, todo) =>{
    // WE WANT PREVIOUS DATA ALSO
    setTodos((prev)=>prev.map((prevTodo) => (prevTodo.id===id ? todo : prevTodo)))
  
  }
  const removedTodo=(id)=>{
    setTodos((prev)=>prev.filter( (todo) => todo.id !==id ))
  }

  const toggleComplete =(id)=>{
    setTodos((prev)=> prev.map((prevTodo)=> prevTodo.id==id ? {...prevTodo, completed : !prevTodo.completed }: prevTodo))
  }

  // LOCAL STORAGE // LOCAL STORAGE // LOCAL STORAGE // LOCAL STORAGE
  // 1. FOR SETTING VALUE/TODOS WHEN RELOAD
  useEffect( ()=>{
    const todos=JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length > 0){
      setTodos(todos);
    }
  } ,[])
  
  // 2. FOR ADDING EACH TODO TO LOCAL STORAGE

  useEffect(()=>{
    localStorage.setItem("todos" , JSON.stringify(todos))
  },[todos])
  

  return (
    <TodoProvider value={{todos,addTodo,removedTodo,toggleComplete,updateTodo}}>
    <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {/*  () for auto returh {} the return*/}
                        {todos.map((todo)=>(
                          <div key={todo.id} className='w-full'>
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
