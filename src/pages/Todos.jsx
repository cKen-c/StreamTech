// src/pages/Todos.jsx
import { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/ToDoItem';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/todosApi';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, completed

  // Charger les todos au montage
  useEffect(() => {
    async function loadTodos() {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
      setLoading(false);
    }

    loadTodos();
  }, []);

  // Ajouter un todo
  const handleAdd = async (title) => {
    const newTodo = await addTodo(title);

    if (newTodo) {
      // Ajouter au début de la liste
      setTodos([newTodo, ...todos]);
    }
  };

  // Basculer le statut d'un todo
  const handleToggle = async (id) => {
    // Trouver le todo
    const todo = todos.find(t => t.id === id);

    // Mettre à jour via l'API
    await updateTodo(id, !todo.completed);

    // Mettre à jour le state local
    setTodos(todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // Supprimer un todo
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      const success = await deleteTodo(id);

      if (success) {
        setTodos(todos.filter(t => t.id !== id));
      }
    }
  };

  // Filtrer les todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  // Statistiques
  const totalTodos = todos.length;
  const completedTodos = todos.filter(t => t.completed).length;
  const activeTodos = totalTodos - completedTodos;

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4">Mes Tâches</h1>

      {/* Statistiques */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">{totalTodos}</h5>
              <p className="card-text text-muted">Total</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title text-warning">{activeTodos}</h5>
              <p className="card-text text-muted">En cours</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title text-success">{completedTodos}</h5>
              <p className="card-text text-muted">Terminées</p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire d'ajout */}
      <TodoForm onAdd={handleAdd} />

      {/* Filtres */}
      <div className="btn-group mb-3" role="group">
        <button
          className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('all')}
        >
          Toutes ({totalTodos})
        </button>
        <button
          className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('active')}
        >
          En cours ({activeTodos})
        </button>
        <button
          className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setFilter('completed')}
        >
          Terminées ({completedTodos})
        </button>
      </div>

      {/* Liste des todos */}
      {filteredTodos.length === 0 ? (
        <div className="alert alert-info">
          Aucune tâche à afficher. {filter !== 'all' && 'Essayez un autre filtre.'}
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default Todos;
