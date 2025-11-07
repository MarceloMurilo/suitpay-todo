import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {Task, FilterType, Category, Priority} from '../types/task';
import {storageService} from '../services/storage-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CustomCategory {
  id: string;
  name: string;
  emoji: string;
}

interface TasksContextType {
  tasks: Task[];
  filteredTasks: Task[];
  filter: FilterType;
  searchQuery: string;
  categoryFilter: Category | 'all';
  priorityFilter: Priority | 'all';
  customCategories: CustomCategory[];
  addTask: (title: string, category?: Category, priority?: Priority, description?: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  editTask: (id: string, updates: {title?: string; description?: string; category?: Category; priority?: Priority}) => void;
  setFilter: (filter: FilterType) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: Category | 'all') => void;
  setPriorityFilter: (priority: Priority | 'all') => void;
  getTaskStats: () => {
    total: number;
    completed: number;
    pending: number;
  };
  addCustomCategory: (name: string, emoji: string) => void;
  deleteCustomCategory: (id: string) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const CATEGORIES_STORAGE_KEY = '@SuitPayTodo:categories';

export const TasksProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'all'>('all');
  const [customCategories, setCustomCategories] = useState<CustomCategory[]>([
    {id: 'work', name: 'Trabalho', emoji: '💼'},
    {id: 'personal', name: 'Pessoal', emoji: '🏠'},
    {id: 'shopping', name: 'Compras', emoji: '🛒'},
    {id: 'health', name: 'Saúde', emoji: '⚕️'},
    {id: 'other', name: 'Outros', emoji: '📌'},
  ]);

  useEffect(() => {
    loadTasks();
    loadCategories();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const loadTasks = async () => {
    const loadedTasks = await storageService.getTasks();
    setTasks(loadedTasks);
  };

  const loadCategories = async () => {
    try {
      const savedCategories = await AsyncStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (savedCategories) {
        setCustomCategories(JSON.parse(savedCategories));
      }
    } catch (error) {
      console.log('Erro ao carregar categorias:', error);
    }
  };

  const saveTasks = async () => {
    await storageService.saveTasks(tasks);
  };

  const addTask = (title: string, category?: Category, priority?: Priority, description?: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description?.trim() || undefined,
      completed: false,
      createdAt: new Date().toISOString(),
      ...(category && {category}),
      ...(priority && {priority}),
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? {...task, completed: !task.completed} : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const editTask = (id: string, updates: {title?: string; description?: string; category?: Category; priority?: Priority}) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id
          ? {
              ...task,
              ...(updates.title !== undefined && {title: updates.title.trim()}),
              ...(updates.description !== undefined && {description: updates.description.trim() || undefined}),
              ...(updates.category !== undefined && {category: updates.category}),
              ...(updates.priority !== undefined && {priority: updates.priority}),
            }
          : task,
      ),
    );
  };

  const getTaskStats = () => {
    const completed = tasks.filter(task => task.completed).length;
    const pending = tasks.filter(task => !task.completed).length;
    return {
      total: tasks.length,
      completed,
      pending,
    };
  };

  const addCustomCategory = async (name: string, emoji: string) => {
    const newCategory: CustomCategory = {
      id: `custom_${Date.now()}`,
      name: name.trim(),
      emoji: emoji.trim() || '📌',
    };
    
    const updatedCategories = [...customCategories, newCategory];
    setCustomCategories(updatedCategories);
    
    try {
      await AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updatedCategories));
    } catch (error) {
      console.log('Erro ao salvar categorias:', error);
    }
  };

  const deleteCustomCategory = async (id: string) => {
    const updatedCategories = customCategories.filter(cat => cat.id !== id);
    setCustomCategories(updatedCategories);
    
    try {
      await AsyncStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(updatedCategories));
    } catch (error) {
      console.log('Erro ao salvar categorias:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !task.completed) ||
      (filter === 'completed' && task.completed);

    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || (task.category && task.category === categoryFilter);
    const matchesPriority = priorityFilter === 'all' || (task.priority && task.priority === priorityFilter);

    return matchesFilter && matchesSearch && matchesCategory && matchesPriority;
  });

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredTasks,
        filter,
        searchQuery,
        categoryFilter,
        priorityFilter,
        customCategories,
        addTask,
        toggleTask,
        deleteTask,
        editTask,
        setFilter,
        setSearchQuery,
        setCategoryFilter,
        setPriorityFilter,
        getTaskStats,
        addCustomCategory,
        deleteCustomCategory,
      }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};

