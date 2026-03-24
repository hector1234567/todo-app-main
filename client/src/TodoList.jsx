import TodoItem from './TodoItem';

export default function TodoList({ filter, items, loading }) {
  const filteredItems = items.filter((item) => {
    if (filter === 'active') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });

  return (
    <ul id="list">
      {loading ? (
        <p>Loading...</p>
      ) : (
        filteredItems.map((item) => <TodoItem key={item.id} item={item} />)
      )}
    </ul>
  );
}
