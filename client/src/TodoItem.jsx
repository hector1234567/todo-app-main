function TodoItem({ item, fetchItems }) {
  async function deleteItem() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    await fetch(`/api/todos/${item.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    });
    fetchItems();
  }

  async function toggleCompleted() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found. Please log in.');
    }

    await fetch(`/api/todos/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({ ...item, completed: !item.completed }),
    });
    fetchItems();
  }

  return (
    <li
      className="item"
      draggable="true"
      data-completed={item.completed ? 'true' : 'false'}
    >
      <button className="done-button" onClick={toggleCompleted}>
        {item.completed ? (
          <img src="./images/icon-check.svg" alt="icon check" />
        ) : (
          ''
        )}
      </button>
      <span>{item.text}</span>
      <button className="delete-button" onClick={deleteItem}>
        <img src="./images/icon-cross.svg" alt="icon cross" />
      </button>
    </li>
  );
}

export default TodoItem;
