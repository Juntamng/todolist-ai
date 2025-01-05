import React from "react";
import { Box, Container, Typography, Paper, CircularProgress, Alert } from "@mui/material";
import { TodoItem } from "./TodoItem";
import { TodoFooter } from "./TodoFooter";
import { TodoInput } from "./TodoInput";
import { Todo } from "../../types/todo";

interface TodoAppProps {
  todos: Todo[];
  filter: string;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
  onAdd: (text: string) => void;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onFilterChange: (filter: string) => void;
}

export default function TodoApp({
  todos,
  filter,
  status,
  error,
  onAdd,
  onToggle,
  onDelete,
  onEdit,
  onFilterChange
}: TodoAppProps) {
  const activeCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

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

        {status === 'loading' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        )}

        {status === 'failed' && (
          <Alert severity="error" sx={{ m: 2 }}>
            {error || 'An error occurred while loading todos'}
          </Alert>
        )}

        {status === 'idle' && (
          <>
            <Box>
              {todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  text={todo.title}
                  completed={todo.completed}
                  onToggle={() => onToggle(todo)}
                  onDelete={() => onDelete(todo.id)}
                  onEdit={(newText) => onEdit(todo.id, newText)}
                />
              ))}
            </Box>

            {todos.length === 0 && (
              <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                <Typography>No todos yet. Add one above!</Typography>
              </Box>
            )}

            {todos.length > 0 && (
              <TodoFooter
                activeCount={activeCount}
                filter={filter}
                onFilterChange={onFilterChange}
                hasCompleted={hasCompleted}
              />
            )}
          </>
        )}
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