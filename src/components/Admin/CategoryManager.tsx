import { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

interface CategoryManagerProps {
  categories: Category[];
  onCategoryAdd: (category: Omit<Category, 'id'>) => void;
  onCategoryEdit: (id: string, category: Partial<Category>) => void;
  onCategoryDelete: (id: string) => void;
}

export const CategoryManager = ({ 
  categories, 
  onCategoryAdd, 
  onCategoryEdit, 
  onCategoryDelete 
}: CategoryManagerProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    isActive: true
  });

  const handleSaveNew = () => {
    if (newCategory.name.trim()) {
      onCategoryAdd(newCategory);
      setNewCategory({ name: '', description: '', isActive: true });
      setIsAdding(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setNewCategory({
      name: category.name,
      description: category.description || '',
      isActive: category.isActive
    });
  };

  const handleSaveEdit = () => {
    if (editingId && newCategory.name.trim()) {
      onCategoryEdit(editingId, newCategory);
      setEditingId(null);
      setNewCategory({ name: '', description: '', isActive: true });
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setNewCategory({ name: '', description: '', isActive: true });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Gestión de Categorías</h2>
        <button
          onClick={() => setIsAdding(true)}
          disabled={isAdding || !!editingId}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Nueva Categoría
        </button>
      </div>

      <div className="space-y-4">
        {/* Add new category form */}
        {isAdding && (
          <div className="bg-muted/50 border border-border rounded-lg p-4 animate-scale-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre de la categoría
                </label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="input-field w-full"
                  placeholder="Ej: Zapatillas de running"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Descripción (opcional)
                </label>
                <input
                  type="text"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="input-field w-full"
                  placeholder="Descripción de la categoría"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newCategory.isActive}
                  onChange={(e) => setNewCategory({ ...newCategory, isActive: e.target.checked })}
                  className="rounded border-border w-4 h-4"
                />
                <span className="text-sm text-foreground">Categoría activa</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCancel}
                  className="btn-secondary flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancelar
                </button>
                <button
                  onClick={handleSaveNew}
                  className="btn-primary flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Categories list */}
        {categories.map((category) => (
          <div key={category.id} className="bg-background border border-border rounded-lg p-4">
            {editingId === category.id ? (
              // Edit form
              <div className="animate-scale-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Nombre de la categoría
                    </label>
                    <input
                      type="text"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      className="input-field w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Descripción (opcional)
                    </label>
                    <input
                      type="text"
                      value={newCategory.description}
                      onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                      className="input-field w-full"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newCategory.isActive}
                      onChange={(e) => setNewCategory({ ...newCategory, isActive: e.target.checked })}
                      className="rounded border-border w-4 h-4"
                    />
                    <span className="text-sm text-foreground">Categoría activa</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCancel}
                      className="btn-secondary flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Cancelar
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="btn-primary flex items-center gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Guardar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Display mode
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-foreground">{category.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      category.isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {category.isActive ? 'Activa' : 'Inactiva'}
                    </span>
                  </div>
                  {category.description && (
                    <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(category)}
                    disabled={isAdding || !!editingId}
                    className="btn-ghost p-2 hover:bg-primary/10"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onCategoryDelete(category.id)}
                    disabled={isAdding || !!editingId}
                    className="btn-ghost p-2 hover:bg-destructive/10 text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {categories.length === 0 && !isAdding && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No hay categorías configuradas.</p>
            <p className="text-sm">Crea tu primera categoría para organizar tus productos.</p>
          </div>
        )}
      </div>
    </div>
  );
};