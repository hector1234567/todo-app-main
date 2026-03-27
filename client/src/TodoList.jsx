import { useContext } from 'react';
import TodoItem from './TodoItem';
import { TodosContext } from './contexts';
import { getTodos } from './api/getTodos';
import { useQuery } from '@tanstack/react-query';
import Modal from './Modal.jsx';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { updateTodo } from './api/updateTodo';

export default function TodoList({ filter }) {
  const [items, setItems] = useContext(TodosContext);
  const [message, setMessage] = useState('');

  useQuery({
    queryKey: ['todos', items],
    queryFn: async () => {
      const data = await getTodos();
      setItems(data);
      return data;
    },
  });

  async function reorderList(oldItems, newItems) {
    try {
      await Promise.all(
        newItems.map((item, index) =>
          updateTodo(
            item.id,
            item.text,
            item.completed,
            oldItems[index].created_at
          )
        )
      );
    } catch (error) {
      setMessage(
        'Failed to reorder todos. ' + (error.message || 'Please try again.')
      );
    }
  }

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const oldItems = [...items];
      const newItems = arrayMove(items, oldIndex, newIndex);
      setItems(newItems);
      await reorderList(oldItems, newItems);
    }
  };

  const filteredItems = items?.filter((item) => {
    if (filter === 'active') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // El drag solo empieza si mueves 8px
      },
    })
  );

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
    <ul id="list">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {filteredItems?.map((item, index) => (
            <TodoItem
              key={item.id}
              item={item}
              onUpdate={setItems}
              id={item.id}
              index={index}
            />
          ))}
        </SortableContext>
      </DndContext>
    </ul>
  );
}
