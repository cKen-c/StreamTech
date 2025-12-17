// src/components/TodoItem.jsx
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          id={`todo-${todo.id}`}
        />
        <label
          className={`form-check-label ms-2 ${todo.completed ? 'text-decoration-line-through text-muted' : ''}`}
          htmlFor={`todo-${todo.id}`}
        >
          {todo.title}
        </label>
      </div>

      <button
        className="btn btn-sm btn-danger"
        onClick={() => onDelete(todo.id)}
      >
        Supprimer
      </button>
    </li>
  );
}

export default TodoItem;
