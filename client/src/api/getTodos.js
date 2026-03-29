export async function getTodos() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      //throw new Error('No token found. Please log in.');
      console.log('No token found. Using local todos.json for testing.');
      const response = await fetch('/todos.json');
      return response.json();
    }
    const response = await fetch('/api/todos', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    });
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch todos.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}
