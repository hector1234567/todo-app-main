function TodoItem({ item }) {
  return (
    <li className="item" draggable="true" data-completed={item.completed}>
      <button className="done-button"></button>
      <span>{item.text}</span>
      <button className="delete-button">
        <img src="./images/icon-cross.svg" alt="icon cross" />
      </button>
    </li>
  );
}

export default TodoItem;
