export default function ActionsPannel() {
  return (
    <div id="actions">
      <span id="items-left">0 items left</span>
      <div id="filters">
        <button id="all">All</button>
        <button id="active">Active</button>
        <button id="completed">Completed</button>
      </div>
      <button id="clear-completed">Clear Completed</button>
    </div>
  );
}
