import React from 'react';
import { useNavigate } from '@tanstack/react-router';

// const MY_TOKEN =
//   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJIZWN0b3IiLCJlbWFpbCI6ImhlY3RvckBleGFtcGxlLmNvbSIsImlhdCI6MTc3NDM2OTkzNiwiZXhwIjoxNzc1MjMzOTM2fQ.4SuuHNZjWtohkRD392OKI5yqt0esMe6peBTHsM9_a_w';

export default function TodoForm({ fetchItems }) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate({ to: '/login' });
      }
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
        body: JSON.stringify({ text: inputValue }),
      });
      setInputValue('');
      fetchItems();
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
