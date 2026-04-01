import { getTodos } from './api/getTodos';
import { deleteTodo } from './api/deleteTodo';
import { updateTodo } from './api/updateTodo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Modal from './Modal.jsx';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import iconCheck from '/images/icon-check.svg';
import iconCross from '/images/icon-cross.svg';

function TodoItem({ item, onUpdate, id, index }) {
  const queryClient = useQueryClient();

  const [message, setMessage] = useState('');

  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id, index });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
    zIndex: isDragging ? 999 : 'auto',
    position: 'relative',
    touchAction: 'none',
  };

  const deleteMutation = useMutation({
    mutationFn: () => deleteTodo(item.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] }); // recarga automático
    },
    onError: (error) => {
      setMessage('Failed to delete todo.');
    },
  });

  async function toggleCompleted() {
    try {
      await updateTodo(item.id, item.text, !item.completed, item.created_at);
      const todos = await getTodos();
      onUpdate(todos);
    } catch (error) {
      setMessage('Failed to update todo.');
    }
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
      data-shadow={isDragging || undefined}
    >
      <button className="done-button" onClick={toggleCompleted}>
        {item.completed ? <img src={iconCheck} alt="icon check" /> : null}
      </button>
      <span>{item.text}</span>
      <button className="delete-button" onClick={deleteMutation.mutate}>
        <img src={iconCross} alt="icon cross" />
      </button>

      {message && (
        <Modal>
          <p>{message}</p>
          <Link to="/login">Login</Link>
          <button onClick={() => setMessage('')}>Close</button>
        </Modal>
      )}
    </li>
  );
}

export default TodoItem;
