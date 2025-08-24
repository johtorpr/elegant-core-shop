import { useState } from 'react';
import { ChevronDown, ChevronUp, Filter, X } from 'lucide-react';
import { FilterOptions } from '@/types';

interface FilterSidebarProps {
  filters: FilterOptions;
  activeFilters: {
    categories: string[];
    brands: string[];
    priceRange: { min: number; max: number };
    availability: string[];
  };
  onFilterChange: (filters: any) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const FilterSidebar = ({
  filters,
  activeFilters,
  onFilterChange,
  isOpen,
  onClose
}: FilterSidebarProps) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true,
    availability: true,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter(c => c !== category)
      : [...activeFilters.categories, category];
    
    onFilterChange({
      ...activeFilters,
      categories: newCategories
    });
  };

  const handleBrandChange = (brand: string) => {
    const newBrands = activeFilters.brands.includes(brand)
      ? activeFilters.brands.filter(b => b !== brand)
      : [...activeFilters.brands, brand];
    
    onFilterChange({
      ...activeFilters,
      brands: newBrands
    });
  };

  const handlePriceChange = (min: number, max: number) => {
    onFilterChange({
      ...activeFilters,
      priceRange: { min, max }
    });
  };

  const handleAvailabilityChange = (availability: string) => {
    const newAvailability = activeFilters.availability.includes(availability)
      ? activeFilters.availability.filter(a => a !== availability)
      : [...activeFilters.availability, availability];
    
    onFilterChange({
      ...activeFilters,
      availability: newAvailability
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      brands: [],
      priceRange: { min: 0, max: 2000 },
      availability: []
    });
  };

  const availabilityOptions = [
    { value: 'in-stock', label: 'En stock' },
    { value: 'limited', label: 'Stock limitado' },
    { value: 'out-of-stock', label: 'Agotado' }
  ];

  const hasActiveFilters = activeFilters.categories.length > 0 || 
                          activeFilters.brands.length > 0 || 
                          activeFilters.availability.length > 0 ||
                          activeFilters.priceRange.min > 0 ||
                          activeFilters.priceRange.max < 2000;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 lg:w-full
        bg-background border-r border-border lg:border-r-0
        z-50 lg:z-0 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-foreground" />
              <h2 className="text-lg font-semibold text-foreground">Filtros</h2>
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Limpiar
                </button>
              )}
              <button
                onClick={onClose}
                className="lg:hidden btn-ghost p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full mb-3 text-left"
            >
              <h3 className="font-medium text-foreground">Categorías</h3>
              {expandedSections.categories ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            {expandedSections.categories && (
              <div className="space-y-2">
                {filters.categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeFilters.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-ring"
                    />
                    <span className="text-sm text-foreground">{category}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Brands */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('brands')}
              className="flex items-center justify-between w-full mb-3 text-left"
            >
              <h3 className="font-medium text-foreground">Marcas</h3>
              {expandedSections.brands ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            {expandedSections.brands && (
              <div className="space-y-2">
                {filters.brands.map((brand) => (
                  <label key={brand} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeFilters.brands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                      className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-ring"
                    />
                    <span className="text-sm text-foreground">{brand}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full mb-3 text-left"
            >
              <h3 className="font-medium text-foreground">Precio</h3>
              {expandedSections.price ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            {expandedSections.price && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Mín</label>
                    <input
                      type="number"
                      value={activeFilters.priceRange.min}
                      onChange={(e) => handlePriceChange(Number(e.target.value), activeFilters.priceRange.max)}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Máx</label>
                    <input
                      type="number"
                      value={activeFilters.priceRange.max}
                      onChange={(e) => handlePriceChange(activeFilters.priceRange.min, Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="mb-6">
            <button
              onClick={() => toggleSection('availability')}
              className="flex items-center justify-between w-full mb-3 text-left"
            >
              <h3 className="font-medium text-foreground">Disponibilidad</h3>
              {expandedSections.availability ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
            {expandedSections.availability && (
              <div className="space-y-2">
                {availabilityOptions.map((option) => (
                  <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeFilters.availability.includes(option.value)}
                      onChange={() => handleAvailabilityChange(option.value)}
                      className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-ring"
                    />
                    <span className="text-sm text-foreground">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};