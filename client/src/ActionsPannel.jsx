export default function ActionsPannel({
  filter,
  setFilter,
  items,
  fetchItems,
  length,
}) {
  function clearCompleted() {
    try {
      const completedItems = items.filter((item) => item.completed);
      completedItems.forEach(async (item) => {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found. Please log in.');
        }
        await fetch(`/api/todos/${item.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: token,
          },
        });
      });
      fetchItems();
    } catch (error) {
      console.error('Error clearing completed items:', error);
      alert('Failed to clear completed items. Please try again.');
    }
  }

  return (
    <div id="actions">
      <span id="items-left">{length || 0} items left</span>
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
