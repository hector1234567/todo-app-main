import { useContext, useEffect } from 'react';
import TodoItem from './TodoItem';
import { TodosContext } from './contexts';
import { getTodos } from './api/getTodos';
import { useQuery } from '@tanstack/react-query';

export default function TodoList({ filter }) {
  const [items, setItems] = useContext(TodosContext);

  const { data, error, isLoading } = useQuery({
    queryKey: ['todos', items],
    queryFn: () => getTodos(),
    staleTime: 30000,
  });

  if (data) {
    setItems(data);
  }

  if (error) {
    console.error('Error fetching todos:', error);
    navigate({ to: '/login' });
  }

  const filteredItems = items?.filter((item) => {
    if (filter === 'active') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });

  return (
    <ul id="list">
      {filteredItems?.map((item) => (
        <TodoItem key={item.id} item={item} onUpdate={setItems} />
      ))}
    </ul>
  );
}
