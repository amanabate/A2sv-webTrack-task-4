import React, { useState } from "react";
import type { Todo } from "../types";


type Props = {
  todo: Todo;
  onUpdate: (id: string, patch: Partial<Todo>) => void;
  onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onUpdate, onDelete }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const save = () => {
    const text = draft.trim();
    if (!text) return;
    onUpdate(todo.id, { text });
    setEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <div className="left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onUpdate(todo.id, { completed: e.target.checked })}
          aria-label={`Toggle ${todo.text}`}
        />
        {editing ? (
          <input
            className="edit-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") save();
              if (e.key === "Escape") {
                setEditing(false);
                setDraft(todo.text);
              }
            }}
            autoFocus
          />
        ) : (
          <span className="text" onDoubleClick={() => setEditing(true)}>
            {todo.text}
          </span>
        )}
      </div>

      <div className="actions">
        {editing ? (
          <>
            <button className="btn small" onClick={save}>Save</button>
            <button
              className="btn small ghost"
              onClick={() => {
                setEditing(false);
                setDraft(todo.text);
              }}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="btn small" onClick={() => setEditing(true)}>Edit</button>
            <button className="btn small danger" onClick={() => onDelete(todo.id)}>Delete</button>
          </>
        )}
      </div>
    </li>
  );
}
