import { useContext } from 'react';
import { TodosContext } from './contexts';
import { deleteTodo } from './api/deleteTodo';
import { getTodos } from './api/getTodos';
import Modal from './Modal.jsx';
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
        setMessage(
          'Failed to clear completed items. ' +
            (error.message || 'Please try again.')
        );
      }
    });
    const todos = await getTodos();
    setItems(todos);
  }

  if (message) {
    return (
      <Modal>
        <p>{message}</p>
        <button onClick={() => setMessage('')}>Close</button>
      </Modal>
    );
  }

  return (
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
  );
}
