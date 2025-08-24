import { useState } from 'react';
import { Search, ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onCartClick: () => void;
  onMenuClick: () => void;
}

export const Header = ({ onSearchChange, onCartClick, onMenuClick }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { getItemCount } = useCart();

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange(value);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="btn-ghost p-2 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold text-foreground">
              Sneaker<span className="text-primary">Hub</span>
            </h1>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar zapatillas..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="search-input w-full pl-10"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="btn-ghost p-2 md:hidden"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* User Account */}
            <button className="btn-ghost p-2">
              <User className="h-5 w-5" />
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="bg-primary text-primary-foreground hover:bg-primary-hover p-3 rounded-full relative transition-all hover:scale-105 shadow-lg"
            >
              <ShoppingCart className="h-5 w-5" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {getItemCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Expanded */}
        {isSearchExpanded && (
          <div className="md:hidden pb-4 fade-in">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar zapatillas..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="search-input w-full pl-10"
                autoFocus
              />
              <button
                onClick={() => setIsSearchExpanded(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};