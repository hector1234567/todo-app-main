import { useContext } from 'react';
import { TodosContext } from './contexts';
import { deleteTodo } from './api/deleteTodo';
import { getTodos } from './api/getTodos';

export default function ActionsPannel({ filter, setFilter }) {
  const [items, setItems] = useContext(TodosContext);

  async function clearCompleted() {
    try {
      const completedItems = items.filter((item) => item.completed);
      completedItems.forEach(async (item) => {
        await deleteTodo(item.id);
      });
      const todos = await getTodos();
      setItems(todos);
    } catch (error) {
      console.error('Error clearing completed items:', error);
      alert('Failed to clear completed items. Please try again.');
    }
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
