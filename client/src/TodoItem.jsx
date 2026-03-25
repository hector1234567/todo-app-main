const MY_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJIZWN0b3IiLCJlbWFpbCI6ImhlY3RvckBleGFtcGxlLmNvbSIsImlhdCI6MTc3NDM2OTkzNiwiZXhwIjoxNzc1MjMzOTM2fQ.4SuuHNZjWtohkRD392OKI5yqt0esMe6peBTHsM9_a_w';

function TodoItem({ item, fetchItems }) {
  async function deleteItem() {
    await fetch(`/api/todos/${item.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: MY_TOKEN,
      },
    });
    fetchItems();
  }

  return (
    <li
      className="item"
      draggable="true"
      data-completed={item.completed ? 'true' : 'false'}
    >
      <button className="done-button"></button>
      <span>{item.text}</span>
      <button className="delete-button" onClick={deleteItem}>
        <img src="./images/icon-cross.svg" alt="icon cross" />
      </button>
    </li>
  );
}

export default TodoItem;
