import { ProductCard } from "./ProductCard";
import { Sparkles, TrendingUp } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  image: string;
  link: string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
}

interface ProductResultsProps {
  products: Product[];
  query: string;
  isLoading: boolean;
}

export const ProductResults = ({ products, query, isLoading }: ProductResultsProps) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          <span>AI is analyzing your request and finding the best products...</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card rounded-lg p-4 space-y-4 animate-pulse">
              <div className="aspect-square bg-secondary/20 rounded-md" />
              <div className="space-y-2">
                <div className="h-4 bg-secondary/20 rounded w-3/4" />
                <div className="h-4 bg-secondary/20 rounded w-1/2" />
                <div className="h-6 bg-secondary/20 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto text-center py-12">
        <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-foreground mb-2">No results found</h2>
        <p className="text-muted-foreground">
          Try rephrasing your search or using different keywords.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-3 text-left">
        <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            AI Results
          </span>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Found {products.length} products for "{query}"
          </h2>
          <p className="text-sm text-muted-foreground">
            Powered by AI • Real-time results
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};