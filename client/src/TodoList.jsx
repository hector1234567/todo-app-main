import TodoItem from './TodoItem';

export default function TodoList({ filter, items, fetchItems }) {
  console.log('Rendering TodoList with items:', items);
  const filteredItems = items?.filter((item) => {
    if (filter === 'active') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });

  return (
    <ul id="list">
      {filteredItems?.map((item) => (
        <TodoItem key={item.id} item={item} fetchItems={fetchItems} />
      ))}
    </ul>
  );
}
