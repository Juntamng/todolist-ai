import { supabase } from '../lib/supabase';
import { Todo, TodoCreate } from '../types/todo';

export const todoService = {
  async fetchTodos() {
    const { data, error } = await supabase
      .from('item')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Todo[];
  },

  async addTodo(todo: TodoCreate) {
    const { data, error } = await supabase
      .from('item')
      .insert(todo)
      .select()
      .single();

    if (error) throw error;
    return data as Todo;
  },

  async updateTodo(id: number, updates: Partial<Todo>) {
    const { data, error } = await supabase
      .from('item')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Todo;
  },

  async deleteTodo(id: number) {
    const { error } = await supabase
      .from('item')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}; 