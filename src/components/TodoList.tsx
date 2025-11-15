import React from "react";
import type { Todo } from "../types";

import TodoItem from "./TodoItem";

type Props = {
  todos: Todo[];
  onUpdate: (id: string, patch: Partial<Todo>) => void;
  onDelete: (id: string) => void;
};

export default function TodoList({ todos, onUpdate, onDelete }: Props) {
  if (todos.length === 0) {
    return <p className="empty">No tasks yet — add your first todo!</p>;
  }

  return (
    <ul className="todo-list" aria-live="polite">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}
