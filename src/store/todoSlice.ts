import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/todo';

interface TodoState {
  todos: Todo[];
  filter: string;
}

const STORAGE_KEY = 'todos-react-ts';
const savedTodos = localStorage.getItem(STORAGE_KEY);

const initialState: TodoState = {
  todos: savedTodos ? JSON.parse(savedTodos) : [
    { id: 1, text: "thing 1", completed: false },
    { id: 2, text: "thing 2", completed: true }
  ],
  filter: 'all'
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
    },
    editTodo: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.text = action.payload.text;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
      }
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter(todo => !todo.completed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    }
  }
});

export const {
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
  clearCompleted,
  setFilter
} = todoSlice.actions;

export default todoSlice.reducer; 