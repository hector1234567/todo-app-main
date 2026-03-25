import TodoItem from './TodoItem';

export default function TodoList({ filter, items, fetchItems }) {
  const filteredItems = items.filter((item) => {
    if (filter === 'active') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });

  return (
    <ul id="list">
      {!items.length ? (
        <p>No items to display</p>
      ) : (
        filteredItems.map((item) => (
          <TodoItem key={item.id} item={item} fetchItems={fetchItems} />
        ))
      )}
    </ul>
  );
}
