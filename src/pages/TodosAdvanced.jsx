// src/pages/TodosAdvanced.jsx
import { useReducer, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/todosApi';

// 1. Définir les actions
const ACTIONS = {
  SET_TODOS: 'SET_TODOS',
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  SET_FILTER: 'SET_FILTER',
  SET_LOADING: 'SET_LOADING'
};

// 2. État initial
const initialState = {
  todos: [],
  filter: 'all',
  loading: true
};

// 3. Reducer
function todosReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false
      };

    case ACTIONS.ADD_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos]
      };

    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload
      };

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    default:
      return state;
  }
}

function TodosAdvanced() {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  useEffect(() => {
    async function loadTodos() {
      const data = await getTodos();
      dispatch({ type: ACTIONS.SET_TODOS, payload: data });
    }
    loadTodos();
  }, []);

  const handleAdd = async (title) => {
    const newTodo = await addTodo(title);
    if (newTodo) {
      dispatch({ type: ACTIONS.ADD_TODO, payload: newTodo });
    }
  };

  const handleToggle = async (id) => {
    const todo = state.todos.find(t => t.id === id);
    await updateTodo(id, !todo.completed);
    dispatch({ type: ACTIONS.TOGGLE_TODO, payload: id });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette tâche ?')) {
      const success = await deleteTodo(id);
      if (success) {
        dispatch({ type: ACTIONS.DELETE_TODO, payload: id });
      }
    }
  };

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  const totalTodos = state.todos.length;
  const completedTodos = state.todos.filter(t => t.completed).length;
  const activeTodos = totalTodos - completedTodos;

  if (state.loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4">Mes Tâches (avec useReducer)</h1>

      {/* Statistiques */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center bg-primary text-white">
            <div className="card-body">
              <h2>{totalTodos}</h2>
              <p>Total</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center bg-warning">
            <div className="card-body">
              <h2>{activeTodos}</h2>
              <p>En cours</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center bg-success text-white">
            <div className="card-body">
              <h2>{completedTodos}</h2>
              <p>Terminées</p>
            </div>
          </div>
        </div>
      </div>

      <TodoForm onAdd={handleAdd} />

      {/* Filtres */}
      <div className="btn-group mb-3">
        <button
          className={`btn ${state.filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => dispatch({ type: ACTIONS.SET_FILTER, payload: 'all' })}
        >
          Toutes
        </button>
        <button
          className={`btn ${state.filter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => dispatch({ type: ACTIONS.SET_FILTER, payload: 'active' })}
        >
          En cours
        </button>
        <button
          className={`btn ${state.filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => dispatch({ type: ACTIONS.SET_FILTER, payload: 'completed' })}
        >
          Terminées
        </button>
      </div>

      <ul className="list-group">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodosAdvanced;
