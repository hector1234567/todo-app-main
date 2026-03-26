import { useContext, useState } from 'react';
import { createTodo } from './api/createTodo';
import { getTodos } from './api/getTodos';
import { TodosContext } from './contexts';
import { useNavigate } from '@tanstack/react-router';
import Modal from './Modal.jsx';

export default function TodoForm() {
  const [inputValue, setInputValue] = useState('');
  const [, setItems] = useContext(TodosContext);
  const [message, setMessage] = useState('');

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
      setMessage(
        'Failed to create todo. ' + (error.message || 'Please try again.')
      );
    }
  }

  if (message) {
    return (
      <Modal>
        <p>{message}</p>
        <button onClick={() => setMessage('')}>Close</button>
      </Modal>
    );
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <button className="circle" type="submit"></button>
      <input
        type="text"
        placeholder="Create a new todo..."
        id="input"
        value={inputValue}
        autoComplete="off"
        onChange={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
}
