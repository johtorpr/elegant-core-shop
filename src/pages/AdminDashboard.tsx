import { useState } from 'react';
import { Package, Users, ShoppingCart, TrendingUp, Plus } from 'lucide-react';
import { CategoryManager } from '@/components/Admin/CategoryManager';
import { useCategories } from '@/hooks/useCategories';

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { categories, addCategory, editCategory, deleteCategory } = useCategories();

  const stats = [
    {
      title: 'Total Productos',
      value: '124',
      change: '+12%',
      icon: <Package className="h-6 w-6" />,
      color: 'text-primary'
    },
    {
      title: 'Clientes Activos',
      value: '1,234',
      change: '+5%',
      icon: <Users className="h-6 w-6" />,
      color: 'text-secondary'
    },
    {
      title: 'Pedidos Hoy',
      value: '23',
      change: '+18%',
      icon: <ShoppingCart className="h-6 w-6" />,
      color: 'text-accent'
    },
    {
      title: 'Ventas del Mes',
      value: '$12,543',
      change: '+25%',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-primary'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Resumen' },
    { id: 'categories', label: 'Categorías' },
    { id: 'products', label: 'Productos' },
    { id: 'orders', label: 'Pedidos' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container-responsive py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Panel de Administración
          </h1>
          <p className="text-muted-foreground">
            Gestiona tu tienda de zapatillas desde aquí
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-primary font-medium">{stat.change}</p>
                </div>
                <div className={`${stat.color} bg-primary/10 p-3 rounded-full`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-border mb-8">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Productos Recientes</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg"></div>
                        <div className="flex-1">
                          <p className="font-medium text-foreground">Air Max Classic {item}</p>
                          <p className="text-sm text-muted-foreground">Nike • $129.99</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Pedidos Recientes</h3>
                  <div className="space-y-3">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg transition-colors">
                        <div>
                          <p className="font-medium text-foreground">Pedido #{1000 + item}</p>
                          <p className="text-sm text-muted-foreground">Cliente {item}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">$259.98</p>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            Procesando
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'categories' && (
            <CategoryManager
              categories={categories}
              onCategoryAdd={addCategory}
              onCategoryEdit={editCategory}
              onCategoryDelete={deleteCategory}
            />
          )}

          {activeTab === 'products' && (
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-foreground">Gestión de Productos</h2>
                <button className="btn-primary flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Nuevo Producto
                </button>
              </div>
              <p className="text-muted-foreground">
                La gestión de productos estará disponible próximamente.
              </p>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Gestión de Pedidos</h2>
              <p className="text-muted-foreground">
                La gestión de pedidos estará disponible próximamente.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};