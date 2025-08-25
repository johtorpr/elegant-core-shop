import { useState, useEffect } from 'react';

export interface Category {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Zapatillas',
      description: 'Categoría principal de calzado deportivo',
      isActive: true
    }
  ]);

  // Load categories from localStorage on mount
  useEffect(() => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      try {
        const parsedCategories = JSON.parse(savedCategories);
        setCategories(parsedCategories);
      } catch (error) {
        console.error('Error loading categories from localStorage:', error);
      }
    }
  }, []);

  // Save categories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString()
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const editCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === id ? { ...cat, ...updates } : cat
      )
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const getActiveCategories = () => {
    return categories.filter(cat => cat.isActive);
  };

  return {
    categories,
    activeCategories: getActiveCategories(),
    addCategory,
    editCategory,
    deleteCategory
  };
};