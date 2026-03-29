import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import TodoForm from '../TodoForm';
import TodoList from '../TodoList';
import ActionsPannel from '../ActionsPannel';
import { TodosContext } from '../contexts.jsx';

export const Route = createLazyFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [filter, setFilter] = useState('all');
  const todosHook = useState([]);
  return (
    <TodosContext.Provider value={todosHook}>
      <main>
        <TodoForm />
        <TodoList filter={filter} />
        <ActionsPannel filter={filter} setFilter={setFilter} />
      </main>
      <footer>Drag and drop to reorder list</footer>
    </TodosContext.Provider>
  );
}
