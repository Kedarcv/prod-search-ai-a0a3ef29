import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchInterfaceProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

export const SearchInterface = ({ onSearch, isSearching }: SearchInterfaceProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const suggestionQueries = [
    "Budget laptops under $500",
    "Nike running shoes for men", 
    "Wireless headphones with noise canceling",
    "Gaming monitors 27 inch"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-primary rounded-full text-primary-foreground text-sm font-medium shadow-glow">
          <Sparkles className="w-4 h-4" />
          AI-Powered Product Search
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
          Find Anything with AI
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Describe what you're looking for in natural language. Our AI will find the perfect products for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., 'Show me budget laptops under $500' or 'Find wireless earbuds for running'"
            className="pl-12 pr-32 h-14 text-lg bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50 focus:ring-primary/20"
          />
          <Button
            type="submit"
            disabled={!query.trim() || isSearching}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            {isSearching ? (
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              "Search"
            )}
          </Button>
        </div>
      </form>

      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center">Try these examples:</p>
        <div className="flex flex-wrap gap-2 justify-center">
          {suggestionQueries.map((suggestion, index) => (
            <Button
              key={index}
              variant="secondary"
              size="sm"
              onClick={() => setQuery(suggestion)}
              className="text-xs bg-secondary/50 hover:bg-secondary/80 transition-colors"
            >
              {suggestion}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};