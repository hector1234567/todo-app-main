import React from 'react';

export default function TodoForm() {
  const [inputValue, setInputValue] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(inputValue);
    if (inputValue.trim() === '') return;

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJIZWN0b3IiLCJlbWFpbCI6ImhlY3RvckBleGFtcGxlLmNvbSIsImlhdCI6MTc3MzkxNjEyOSwiZXhwIjoxNzczOTE5NzI5fQ.-f8kenEJuPmMovawM6o1lsTjLWxlZ8goARa2BWnoE-Q',
        },
        body: JSON.stringify({ text: inputValue }),
      });
    } catch (error) {
      console.error('Error submitting todo:', error);
    }
    setInputValue('');
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <button className="circle" type="submit"></button>
      <input
        type="text"
        placeholder="Create a new todo..."
        id="input"
        onInput={(e) => setInputValue(e.target.value)}
      />
    </form>
  );
}
