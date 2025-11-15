import React, { useEffect, useState } from "react";
import type { Todo } from "./types";


import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";


function App() {
  const [todos, setTodos] = useState<Todo[]>([]);


  const addTodo = (text: string) => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((t) => [newTodo, ...t]);
  };

  const updateTodo = (id: string, patch: Partial<Todo>) => {
    setTodos((t) => t.map((todo) => (todo.id === id ? { ...todo, ...patch } : todo)));
  };

  const deleteTodo = (id: string) => {
    setTodos((t) => t.filter((todo) => todo.id !== id));
  };


  return (
    <div className="app-root">
      <div className="card">
        <h1>Todo List (React + TypeScript)</h1>
        <TodoInput onAdd={addTodo} />
        <TodoList todos={todos} onUpdate={updateTodo} onDelete={deleteTodo} />
        <div className="controls">
          <button className="btn ghost" onClick={() => setTodos([])}>Clear All</button>
  
        </div>
      
      </div>
    </div>
  );
}

export default App;
