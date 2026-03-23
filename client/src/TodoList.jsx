import { useEffect } from 'react';
import TodoItem from './TodoItem';
import React from 'react';

export default function TodoList() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  async function fetchItems() {
    try {
      setLoading(true);
      const response = await fetch('/api/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJIZWN0b3IiLCJlbWFpbCI6ImhlY3RvckBleGFtcGxlLmNvbSIsImlhdCI6MTc3MzkxNjEyOSwiZXhwIjoxNzczOTE5NzI5fQ.-f8kenEJuPmMovawM6o1lsTjLWxlZ8goARa2BWnoE-Q',
        },
      });
      const data = await response.json();
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching items:', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ul id="list">
      {loading ? (
        <p>Loading...</p>
      ) : (
        items.map((item) => <TodoItem key={item.id} item={item} />)
      )}
    </ul>
  );
}
