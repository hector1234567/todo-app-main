import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../api/getTodos.js';

export default function useFetchTodos() {
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryFn: () => getTodos(),
    staleTime: 30000,
  });

  if (error) {
    console.error('Error fetching todos:', error);
    navigate({ to: '/login' });
  }

  return { items: data || [], isLoading };
}
