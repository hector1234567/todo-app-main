import { createRoot } from 'react-dom/client';
import TodoForm from './TodoForm';
import ActionsPannel from './ActionsPannel';
import TodoList from './TodoList';
import ThemeButton from './ThemeButton';
import UserButton from './UserButton';

function App() {
  return (
    <>
      <header>
        <h1>Todo</h1>
        <UserButton />
        <ThemeButton />
      </header>
      <main>
        <TodoForm />
        <TodoList />
        <ActionsPannel />
      </main>
    </>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
