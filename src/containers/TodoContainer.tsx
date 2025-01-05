import React from 'react';
import TodoApp from '../components/TodoApp';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { setFilter } from '../store/filterSlice';
import { selectFilter } from '../store/todoSelectors';
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useToggleTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation
} from '../store/api/todoApi';
import { Todo } from '@/types/todo';
import { useAuth } from '@/contexts/AuthContext';

export function TodoContainer() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);
  const { user } = useAuth();

  const { data: todos = [], isLoading, error: queryError } = useGetTodosQuery(user?.id);
  const [addTodo] = useAddTodoMutation();
  const [toggleTodo] = useToggleTodoMutation();
  const [editTodo] = useEditTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  const activeCount = todos.filter(todo => !todo.completed).length;

  const handleAdd = async (text: string) => {
    try {
      await addTodo({ title: text }).unwrap();
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  const handleToggle = async (todo: Todo) => {
    try {
      await toggleTodo(todo).unwrap();
    } catch (err) {
      console.error('Failed to toggle todo:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTodo(id).unwrap();
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const handleEdit = async (id: string, title: string) => {
    try {
      await editTodo({ id, title }).unwrap();
    } catch (err) {
      console.error('Failed to edit todo:', err);
    }
  };

  const handleFilterChange = (newFilter: string) => {
    dispatch(setFilter(newFilter));
  };

  return (
    <TodoApp
      todos={filteredTodos}
      filter={filter}
      status={isLoading ? 'loading' : queryError ? 'failed' : 'idle'}
      error={queryError ? 'Failed to fetch todos' : null}
      onAdd={handleAdd}
      onToggle={handleToggle}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onFilterChange={handleFilterChange}
    />
  );
} 