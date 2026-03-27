import { getTodos } from './api/getTodos';
import { deleteTodo } from './api/deleteTodo';
import { updateTodo } from './api/updateTodo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from './Modal.jsx';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function TodoItem({ item, onUpdate, id, index }) {
  const queryClient = useQueryClient();

  const [message, setMessage] = useState('');

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

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
      await updateTodo(item.id, item.text, !item.completed, item.created_at);
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
        <Link to="/login">Login</Link>
        <button onClick={() => setMessage('')}>Close</button>
      </Modal>
    );
  }

  return (
    <li
      className="item"
      draggable="true"
      data-completed={item.completed ? 'true' : 'false'}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
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
