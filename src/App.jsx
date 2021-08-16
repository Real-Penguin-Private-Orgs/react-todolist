import React, {useState} from "react";
import './App.css';

function TodoList({todo, index, completeTodo, removeTodo}) {
    return(
        <div 
        className="todo" 
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
        >
          {todo.text}
            <div>
              <button className="completed" onClick={() => completeTodo(index)}>√</button>
              <button onClick={() => removeTodo(index)}>×</button>
            </div>
        </div>
    )
}

function Todoform({ addTodo, onKeyDown }) {
 
  const [value, setValue] = useState("");
  const [error, setError] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!value) return;
    if(value.indexOf(' ') <= 0){
      setError("contains spaces");
      value.replace(/\s+/g, '');
      return
    } 
    addTodo(value);
    setValue("");
  }

  return(
    <form className="todo-form" onSubmit={handleSubmit}>
      <h3>Add Something</h3>
      <div style={{ fontSize: '12px', color: 'red' }}>
          {error}
      </div>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function App() { 
  const saveItems = window.localStorage.getItem('todos')
  const parseItems = JSON.parse(saveItems);
  const [todos, setTodos] = useState(parseItems || [
    {
      text: "Learn React",
      isCompleted: false
    }, 
    {
      text: "Learn Math",
      isCompleted: false
    }
  ])

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    window.localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    window.localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    window.localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  return (
    <div className="App">
        <Todoform addTodo={addTodo} />
        {todos.map((todo, index) => (
          
            <TodoList
                key={index}
                index={index}
                todo={todo}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
            />
        ))} 
    </div>
  );
}

export default App;
