import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { useEffect, useState } from "react"
import { TodoList } from "./TodoList"
export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("Items")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  const [searchText, setSearchText] = useState("")
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    todos.map()
  }

  useEffect(() => {
    localStorage.setItem("Items", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos(currentTodos => {
      return [
        ...currentTodos, { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  const todosDataFiltered = todos.filter((todo) =>
    todos.includes(searchText))

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      }
      )
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    }
    )
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <input type="text" id="item" placeholder="Search here.." onChange={handleInputChange} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  )
}