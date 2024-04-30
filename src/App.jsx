import './App.css'
import Navbar from './Navbar'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useEffect, useRef, useState } from 'react';

function App() {

  const [todo, setTodo] = useState("")
  const [list, setList] = useState([])
  const [showfinished, setshowfinished] = useState(false)

  const inputRef = useRef(0)

  useEffect(() => {

    let todos = JSON.parse(localStorage.getItem("todos"))
    if (todos) {
      setList(todos)
    }
  }, [])

  const handlechange = (e) => {
    setTodo(e.target.value)
  }

  const saveChange = () => {
    if (todo.length != 0) {
      setList([...list, { todo, isCompleted: false }])
      localStorage.setItem('todos', JSON.stringify([...list, { todo, isCompleted: false }]))
      setTodo("")
    }

  }

  const enterSave = (e) => {
    if (e.code == "Enter" && todo.length != 0) {
      setList([...list, { todo, isCompleted: false }])
      localStorage.setItem('todos', JSON.stringify([...list, { todo, isCompleted: false }]))
      setTodo("")
    }
  }

  const deleteChange = (item) => {

    let arr = list.filter((e) => {
      if (e.todo == item.todo) return false
      else return true
    })
    setList([...arr])
    localStorage.setItem("todos", JSON.stringify([...arr]))

  }

  const editChange = (item) => {

    setTodo(item.todo)
    deleteChange(item)
    inputRef.current.focus()

  }

  const checkChange = (e, item) => {

    let index = list.findIndex((t) => {
      return t.todo == item.todo
    })

    let newList = [...list]
    newList[index].isCompleted = !newList[index].isCompleted

    setList(newList)
    localStorage.setItem("todos", JSON.stringify(newList))

  }


  return (
    <>
      <Navbar />
      <div className=" bg-slate-200 md:w-1/2 md:h-[auto] md:min-h-[86vh] h-[auto] min-h-[93vh] md:m-auto md:my-5 p-4 
      space-y-2 md:rounded-xl ">

        <h1 className='text-3xl font-[700] text-blue-950 text-center py-2'>iTask - My Todo App</h1>
        <h2 className='text-lg font-bold text-blue-950'>Add Task</h2>

        {/* input bar */}

        <div className="flex items-center space-x-2">

          <input type="text" ref={inputRef} onChange={handlechange} onKeyDown={enterSave} onBlur={saveChange} value={todo} className='px-3 w-full rounded-lg py-1 font-[500]' />

          <button onClick={saveChange} className='rounded-lg focus: bg-blue-950 text-blue-100 text-md px-4 py-1 hover:scale-105 active:scale-100 duration-75 '>Save</button>

        </div>

        <div className='h-auto'>
          <div className='bg-slate-300 w-[90%] h-[2px] mx-auto my-4'></div>
        </div>

        <div className="left space-x-2 flex items-center">

          <input type="checkbox" id='finished' onChange={() => setshowfinished(!showfinished)} checked={showfinished} />

          <label htmlFor='finished' className='font-[500] text-slate-800'>Finished Tasks</label>

        </div>

        <h2 className='text-md font-bold text-blue-950'>My Task</h2>
        {list.length == 0 && <div className='font-[500] text-[.9rem] text-slate-800 m-4'>No Task to do</div>}
        {
          list.map((item) => {

            return ( showfinished || !item.isCompleted) && <div key={item.todo}>

              <div className="todos flex justify-between items-center space-x-3">

                <div className="left space-x-3 flex items-center font-[500] text-[.9rem] text-slate-800 ">

                  <input type="checkbox" onChange={(e) => { checkChange(e, item) }} checked={item.isCompleted} />

                  <span htmlFor='checkbx' className={item.isCompleted ? "line-through" : ""}>{item.todo}</span>

                </div>
                <div className="buttons space-x-2 flex">

                  <button onClick={() => { editChange(item) }} className='rounded-md focus: bg-blue-950 text-blue-100 text-md p-2 hover:scale-105 active:scale-100 duration-75 ' ><FaEdit /></button>

                  <button onClick={() => { deleteChange(item) }} className='rounded-md focus: bg-blue-950 text-blue-100 text-md p-2 hover:scale-105 active:scale-100 duration-75 '><MdDelete /></button>

                </div>

              </div>

            </div>

          })
        }


      </div>
    </>
  )
}

export default App
