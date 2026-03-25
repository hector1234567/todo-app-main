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
  const { items, fetchItems } = useFetchTodos();
  return (
    <>
      <main>
        <TodoForm fetchItems={fetchItems} />
        <TodoList filter={filter} items={items} fetchItems={fetchItems} />
        <ActionsPannel
          filter={filter}
          setFilter={setFilter}
          length={items?.length}
          items={items}
          fetchItems={fetchItems}
        />
      </main>
      <footer>Drag and drop to reorder list</footer>
    </>
  );
}
