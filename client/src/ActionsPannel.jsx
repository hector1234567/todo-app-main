import { useContext } from 'react';
import { TodosContext } from './contexts';
import { deleteTodo } from './api/deleteTodo';
import { getTodos } from './api/getTodos';
import Modal from './Modal.jsx';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';

export default function ActionsPannel({ filter, setFilter }) {
  const [items, setItems] = useContext(TodosContext);
  const [message, setMessage] = useState('');

  async function clearCompleted() {
    const completedItems = items.filter((item) => item.completed);
    completedItems.forEach(async (item) => {
      try {
        await deleteTodo(item.id);
      } catch (error) {
        setMessage('Failed to clear completed items.');
      }
    });
    const todos = await getTodos();
    setItems(todos);
  }

  return (
    <>
      <div id="actions">
        <span id="items-left">{items.length || 0} items left</span>
        <div id="filters">
          <button
            id="all"
            className={filter === 'all' ? 'selected' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            id="active"
            className={filter === 'active' ? 'selected' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            id="completed"
            className={filter === 'completed' ? 'selected' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        <button id="clear-completed" onClick={clearCompleted}>
          Clear Completed
        </button>
      </div>

      <div id="mobile-actions">
        <div id="filters">
          <button
            id="all"
            className={filter === 'all' ? 'selected' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            id="active"
            className={filter === 'active' ? 'selected' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            id="completed"
            className={filter === 'completed' ? 'selected' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      {message && (
        <Modal>
          <p>{message}</p>
          <Link to="/login">Login</Link>
          <button onClick={() => setMessage('')}>Close</button>
        </Modal>
      )}
    </>
  );
}
