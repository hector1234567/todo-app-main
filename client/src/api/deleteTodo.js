const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function deleteTodo(id) {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Please log in.');
    }

    const response = await fetch(`${BASE_URL || ''}/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
    return response.json();
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}
