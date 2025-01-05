import React from "react";
import { Box, Container, Typography, Paper } from "@mui/material";
import { TodoItem } from "./TodoItem";
import { TodoFooter } from "./TodoFooter";
import { TodoInput } from "./TodoInput";
import { Todo } from "../../types/todo";

interface TodoAppProps {
  todos: Todo[];
  filter: string;
  onAdd: (text: string) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
  onClearCompleted: () => void;
  onFilterChange: (filter: string) => void;
}

export default function TodoApp({
  todos,
  filter,
  onAdd,
  onToggle,
  onDelete,
  onEdit,
  onClearCompleted,
  onFilterChange
}: TodoAppProps) {
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(todo => !todo.completed).length;

  const handleNewTodo = (text: string) => {
    if (text.trim()) {
      onAdd(text.trim());
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h1" 
          component="h1"
          sx={{
            fontSize: '100px',
            fontWeight: 100,
            color: 'primary.main',
            opacity: 0.15,
          }}
        >
          todos
        </Typography>
      </Box>
      
      <Paper elevation={2}>
        <TodoInput onSubmit={handleNewTodo} />

        <Box>
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggle={() => onToggle(todo.id)}
              onDelete={() => onDelete(todo.id)}
              onEdit={(newText) => onEdit(todo.id, newText)}
            />
          ))}
        </Box>

        <TodoFooter
          activeCount={activeCount}
          filter={filter}
          onFilterChange={onFilterChange}
          onClearCompleted={onClearCompleted}
        />
      </Paper>

      <Box 
        component="footer" 
        sx={{ 
          mt: 8,
          color: 'text.secondary',
          fontSize: 14,
          textAlign: 'center'
        }}
      >
        <Typography variant="body2">Double-click to edit a todo</Typography>
        <Typography variant="body2">Created by the TodoMVC Team</Typography>
        <Typography variant="body2">
          Part of <Box component="span" sx={{ fontWeight: 500 }}>TodoMVC</Box>
        </Typography>
      </Box>
    </Container>
  );
} 