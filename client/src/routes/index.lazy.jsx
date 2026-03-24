import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import useFetchTodos from '../hooks/useFetchTodos';
import TodoForm from '../TodoForm';
import TodoList from '../TodoList';
import ActionsPannel from '../ActionsPannel';

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [filter, setFilter] = useState('all');
  const { items, loading, fetchItems } = useFetchTodos();
  return (
    <>
      <TodoForm fetchItems={fetchItems} />
      <TodoList filter={filter} items={items} loading={loading} />
      <ActionsPannel filter={filter} setFilter={setFilter} />
    </>
  );
}
