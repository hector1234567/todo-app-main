import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';

// const MY_TOKEN =
//   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJIZWN0b3IiLCJlbWFpbCI6ImhlY3RvckBleGFtcGxlLmNvbSIsImlhdCI6MTc3NDM2OTkzNiwiZXhwIjoxNzc1MjMzOTM2fQ.4SuuHNZjWtohkRD392OKI5yqt0esMe6peBTHsM9_a_w';

export default function useFetchTodos() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  async function fetchItems() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }
      const response = await fetch('/api/todos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: token,
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
      alert('Failed to fetch items. Please log in and try again.');
      navigate({ to: '/login' });
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, fetchItems };
}
