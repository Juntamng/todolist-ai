import React from 'react';
import TodoApp from '../components/TodoApp';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  clearCompleted,
  setFilter
} from '../store/todoSlice';
import {
  selectFilteredTodos,
  selectFilter,
  selectActiveCount
} from '../store/todoSelectors';

export function TodoContainer() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectFilteredTodos);
  const filter = useAppSelector(selectFilter);
  const activeCount = useAppSelector(selectActiveCount);

  const handleAdd = (text: string) => {
    dispatch(addTodo(text));
  };

  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id: number, newText: string) => {
    dispatch(editTodo({ id, text: newText }));
  };

  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };

  const handleFilterChange = (newFilter: string) => {
    dispatch(setFilter(newFilter));
  };

  return (
    <TodoApp
      todos={todos}
      filter={filter}
      onAdd={handleAdd}
      onToggle={handleToggle}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onClearCompleted={handleClearCompleted}
      onFilterChange={handleFilterChange}
    />
  );
} 