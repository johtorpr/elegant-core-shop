import { useState } from 'react';
import { ChevronDown, Home, Package, Users, Settings, BarChart3 } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  children?: NavigationItem[];
}

interface MainNavigationProps {
  userRole?: 'admin' | 'customer' | 'guest';
  onNavigate?: (item: NavigationItem) => void;
}

export const MainNavigation = ({ userRole = 'guest', onNavigate }: MainNavigationProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const navigationItems: NavigationItem[] = [
    {
      id: 'home',
      label: 'Inicio',
      icon: <Home className="h-4 w-4" />,
      href: '/'
    },
    {
      id: 'catalog',
      label: 'Catálogo',
      icon: <Package className="h-4 w-4" />,
      children: [
        { id: 'all-products', label: 'Todas las zapatillas', icon: null },
        { id: 'running', label: 'Running', icon: null },
        { id: 'casual', label: 'Casual', icon: null },
        { id: 'basketball', label: 'Basketball', icon: null },
        { id: 'lifestyle', label: 'Lifestyle', icon: null },
      ]
    },
    ...(userRole === 'admin' ? [
      {
        id: 'admin',
        label: 'Administración',
        icon: <Settings className="h-4 w-4" />,
        children: [
          { id: 'products-admin', label: 'Gestión de productos', icon: null },
          { id: 'categories-admin', label: 'Gestión de categorías', icon: null },
          { id: 'orders-admin', label: 'Pedidos', icon: null },
          { id: 'customers-admin', label: 'Clientes', icon: null },
        ]
      },
      {
        id: 'analytics',
        label: 'Reportes',
        icon: <BarChart3 className="h-4 w-4" />,
        children: [
          { id: 'sales-report', label: 'Ventas', icon: null },
          { id: 'inventory-report', label: 'Inventario', icon: null },
          { id: 'customers-report', label: 'Clientes', icon: null },
        ]
      }
    ] : []),
    ...(userRole === 'customer' ? [
      {
        id: 'account',
        label: 'Mi cuenta',
        icon: <Users className="h-4 w-4" />,
        children: [
          { id: 'profile', label: 'Perfil', icon: null },
          { id: 'orders', label: 'Mis pedidos', icon: null },
          { id: 'wishlist', label: 'Lista de deseos', icon: null },
        ]
      }
    ] : [])
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleItemClick = (item: NavigationItem) => {
    if (item.children) {
      toggleExpanded(item.id);
    } else {
      onNavigate?.(item);
    }
  };

  const renderNavigationItem = (item: NavigationItem, level: number = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id} className="w-full">
        <button
          onClick={() => handleItemClick(item)}
          className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-primary/10 hover:text-primary group ${
            level > 0 ? 'pl-8 py-2' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            {item.icon && (
              <span className="text-muted-foreground group-hover:text-primary transition-colors">
                {item.icon}
              </span>
            )}
            <span className={`font-medium ${level > 0 ? 'text-sm' : ''}`}>
              {item.label}
            </span>
          </div>
          {hasChildren && (
            <ChevronDown 
              className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`} 
            />
          )}
        </button>
        
        {hasChildren && isExpanded && (
          <div className="animate-accordion-down">
            {item.children!.map(child => renderNavigationItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-card border-r border-border h-full">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-foreground">Navegación</h2>
      </div>
      <div className="py-2">
        {navigationItems.map(item => renderNavigationItem(item))}
      </div>
    </nav>
  );
};