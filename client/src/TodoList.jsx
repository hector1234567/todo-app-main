import { useContext, useEffect } from 'react';
import TodoItem from './TodoItem';
import { TodosContext } from './contexts';
import { getTodos } from './api/getTodos';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export default function TodoList({ filter }) {
  const [items, setItems] = useContext(TodosContext);
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ['todos', items],
    queryFn: () => getTodos(),
  });

  useEffect(() => {
    if (error) {
      console.error('Error fetching todos:', error);
      navigate({ to: '/login' });
    } else if (data) {
      setItems(data);
    }
  }, [data, error]);

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
