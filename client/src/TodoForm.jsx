import { useContext, useState } from 'react';
import { createTodo } from './api/createTodo';
import { getTodos } from './api/getTodos';
import { TodosContext } from './contexts';
import Modal from './Modal.jsx';
import { Link } from '@tanstack/react-router';

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
        <Link to="/login">Login</Link>
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
