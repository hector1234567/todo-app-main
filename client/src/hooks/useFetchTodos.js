import { useState, useEffect } from 'react';

const MY_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJIZWN0b3IiLCJlbWFpbCI6ImhlY3RvckBleGFtcGxlLmNvbSIsImlhdCI6MTc3NDM2OTkzNiwiZXhwIjoxNzc1MjMzOTM2fQ.4SuuHNZjWtohkRD392OKI5yqt0esMe6peBTHsM9_a_w';

export default function useFetchTodos() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchItems() {
    try {
      setLoading(true);
      const response = await fetch('/api/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: MY_TOKEN,
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

  return { items, loading, fetchItems };
}
