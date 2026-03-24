import React from 'react';

const MY_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJIZWN0b3IiLCJlbWFpbCI6ImhlY3RvckBleGFtcGxlLmNvbSIsImlhdCI6MTc3NDM2OTkzNiwiZXhwIjoxNzc1MjMzOTM2fQ.4SuuHNZjWtohkRD392OKI5yqt0esMe6peBTHsM9_a_w';

export default function TodoForm({ fetchItems }) {
  const [inputValue, setInputValue] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: MY_TOKEN,
        },
        body: JSON.stringify({ text: inputValue }),
      });
      setInputValue('');
      fetchItems();
    } catch (error) {
      console.error('Error submitting todo:', error);
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
