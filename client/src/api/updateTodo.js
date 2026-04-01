const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function updateTodo(id, text, completed, createdAt) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please log in.');
    }
    const response = await fetch(`${BASE_URL || ''}/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ text, completed, createdAt }),
    });
    if (!response.ok) {
      throw new Error('Failed to update todo.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
}
