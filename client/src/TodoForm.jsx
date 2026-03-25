import { useContext, useState } from 'react';
import { createTodo } from './api/createTodo';
import { getTodos } from './api/getTodos';
import { TodosContext } from './contexts';

export default function TodoForm() {
  const [inputValue, setInputValue] = useState('');
  const [, setItems] = useContext(TodosContext);

  async function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    try {
      await createTodo(inputValue);
      setInputValue('');
      const todos = await getTodos();
      setItems(todos);
    } catch (error) {
      console.error('Error submitting todo:', error);
      alert('Failed to submit todo. Please try again.');
    }
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <button className="circle" type="submit"></button>
      <input
        type="text"
        placeholder="Create a new todo..."
        id="input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
}
