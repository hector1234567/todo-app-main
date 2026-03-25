import { getTodos } from './api/getTodos';
import { deleteTodo } from './api/deleteTodo';
import { updateTodo } from './api/updateTodo';

function TodoItem({ item, onUpdate }) {
  async function onDeleteItem() {
    await deleteTodo(item.id);
    const todos = await getTodos();
    onUpdate(todos);
  }

  async function toggleCompleted() {
    await updateTodo(item.id, item.text, !item.completed);
    const todos = await getTodos();
    onUpdate(todos);
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
      <button className="delete-button" onClick={onDeleteItem}>
        <img src="./images/icon-cross.svg" alt="icon cross" />
      </button>
    </li>
  );
}

export default TodoItem;
