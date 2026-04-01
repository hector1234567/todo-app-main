const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createTodo(text) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please log in.');
    }
    const response = await fetch(`${BASE_URL || ''}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
}
