import { useState, useMemo } from 'react';
import { Filter, Grid3X3, List } from 'lucide-react';
import { Header } from '@/components/Layout/Header';
import { FilterSidebar } from '@/components/Filters/FilterSidebar';
import { ProductGrid } from '@/components/Products/ProductGrid';
import { CartSidebar } from '@/components/Cart/CartSidebar';
import { mockProducts, categories, brands } from '@/data/mockProducts';
import { Product, FilterOptions } from '@/types';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(false);

  const [activeFilters, setActiveFilters] = useState({
    categories: [] as string[],
    brands: [] as string[],
    priceRange: { min: 0, max: 2000 },
    availability: [] as string[]
  });

  const filterOptions: FilterOptions = {
    categories,
    brands,
    priceRange: { min: 0, max: 2000 },
    availability: ['in-stock', 'limited', 'out-of-stock']
  };

  // Filter and search products
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter((product: Product) => {
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.brand.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.category.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (activeFilters.categories.length > 0 && !activeFilters.categories.includes(product.category)) {
        return false;
      }

      // Brand filter
      if (activeFilters.brands.length > 0 && !activeFilters.brands.includes(product.brand)) {
        return false;
      }

      // Price filter
      if (product.price < activeFilters.priceRange.min || product.price > activeFilters.priceRange.max) {
        return false;
      }

      // Availability filter
      if (activeFilters.availability.length > 0 && !activeFilters.availability.includes(product.availability)) {
        return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, activeFilters, sortBy]);

  const handleQuickView = (product: Product) => {
    // TODO: Implement quick view modal
    console.log('Quick view:', product);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        onSearchChange={setSearchQuery}
        onCartClick={() => setIsCartOpen(true)}
        onMenuClick={() => setIsFilterOpen(true)}
      />

      {/* Main Content */}
      <div className="container-responsive py-6">
        <div className="flex gap-6">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar
                filters={filterOptions}
                activeFilters={activeFilters}
                onFilterChange={setActiveFilters}
                isOpen={true}
                onClose={() => {}}
              />
            </div>
          </div>

          {/* Product Area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden btn-secondary flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Filtros
                </button>
                
                <span className="text-sm text-muted-foreground">
                  {filteredProducts.length} productos encontrados
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="name">Ordenar por nombre</option>
                  <option value="price-low">Precio: menor a mayor</option>
                  <option value="price-high">Precio: mayor a menor</option>
                  <option value="rating">Mejor valorados</option>
                </select>

                {/* View Mode */}
                <div className="hidden sm:flex items-center gap-1 border border-border rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            <ProductGrid
              products={filteredProducts}
              isLoading={isLoading}
              onQuickView={handleQuickView}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        filters={filterOptions}
        activeFilters={activeFilters}
        onFilterChange={setActiveFilters}
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* WhatsApp Float Button */}
      <button
        onClick={() => window.open('https://wa.me/1234567890', '_blank')}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-30"
        aria-label="Contactar por WhatsApp"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </button>
    </div>
  );
};

export default Index;