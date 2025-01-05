import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Todo, NewTodo } from '@/types/todo';
import { supabase } from '@/lib/supabase';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      queryFn: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return {
          error: {
            status: 403,
            data: { message: 'Not authenticated' }
          }
        };

        const { data, error } = await supabase
          .from('todos')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });

        if (error) return {
          error: {
            status: 500,
            data: { message: error.message }
          }
        };
        return { data: data || [] };
      },
      providesTags: ['Todo'],
    }),

    addTodo: builder.mutation<Todo, NewTodo>({
      queryFn: async (todo) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return {
          error: {
            status: 403,
            data: { message: 'Not authenticated' }
          }
        };

        const { data, error } = await supabase
          .from('todos')
          .insert([{ ...todo, user_id: user.id }])
          .select()
          .single();

        if (error) return {
          error: {
            status: 500,
            data: { message: error.message }
          }
        };
        return { data };
      },
      invalidatesTags: ['Todo'],
    }),

    toggleTodo: builder.mutation<Todo, Todo>({
      queryFn: async (todo) => {
        const { data, error } = await supabase
          .from('todos')
          .update({ completed: !todo.completed })
          .eq('id', todo.id)
          .select()
          .single();

        if (error) return {
          error: {
            status: 500,
            data: { message: error.message }
          }
        };
        return { data };
      },
      invalidatesTags: ['Todo'],
    }),

    deleteTodo: builder.mutation<string, string>({
      queryFn: async (id) => {
        const { error } = await supabase
          .from('todos')
          .delete()
          .eq('id', id);

        if (error) return {
          error: {
            status: 500,
            data: { message: error.message }
          }
        };
        return { data: id };
      },
      invalidatesTags: ['Todo'],
    }),

    editTodo: builder.mutation<Todo, { id: string; title: string }>({
      queryFn: async ({ id, title }) => {
        const { data, error } = await supabase
          .from('todos')
          .update({ title })
          .eq('id', id)
          .select()
          .single();

        if (error) return {
          error: {
            status: 500,
            data: { message: error.message }
          }
        };
        return { data };
      },
      invalidatesTags: ['Todo'],
    }),

    clearCompleted: builder.mutation<void, void>({
      queryFn: async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return {
          error: {
            status: 403,
            data: { message: 'Not authenticated' }
          }
        };

        const { error } = await supabase
          .from('todos')
          .delete()
          .eq('completed', true)
          .eq('user_id', user.id);

        if (error) return {
          error: {
            status: 500,
            data: { message: error.message }
          }
        };
        return { data: undefined };
      },
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useToggleTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
  useClearCompletedMutation,
} = todoApi; 