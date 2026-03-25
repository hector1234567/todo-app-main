export async function getTodos() {
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
    return data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}
