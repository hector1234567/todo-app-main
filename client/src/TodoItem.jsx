import { getTodos } from './api/getTodos';
import { deleteTodo } from './api/deleteTodo';
import { updateTodo } from './api/updateTodo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from './Modal.jsx';
import { useState } from 'react';

function TodoItem({ item, onUpdate }) {
  const queryClient = useQueryClient();

  const [message, setMessage] = useState('');

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(item.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] }); // recarga automático
    },
    onError: (error) => {
      setMessage(
        'Failed to delete todo. ' + (error.message || 'Please try again.')
      );
    },
  });

  async function toggleCompleted() {
    try {
      await updateTodo(item.id, item.text, !item.completed);
      const todos = await getTodos();
      onUpdate(todos);
    } catch (error) {
      setMessage(
        'Failed to update todo. ' + (error.message || 'Please try again.')
      );
    }
  }

  if (message) {
    return (
      <Modal>
        <p>{message}</p>
        <button onClick={() => setMessage('')}>Close</button>
      </Modal>
    );
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
        ) : null}
      </button>
      <span>{item.text}</span>
      <button className="delete-button" onClick={deleteMutation.mutate}>
        <img src="./images/icon-cross.svg" alt="icon cross" />
      </button>
    </li>
  );
}

export default TodoItem;
