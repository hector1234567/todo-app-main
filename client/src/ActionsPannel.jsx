export default function ActionsPannel({ filter, setFilter }) {
  return (
    <div id="actions">
      <span id="items-left">0 items left</span>
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
      <button id="clear-completed">Clear Completed</button>
    </div>
  );
}
