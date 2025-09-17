import { useState } from "react";
import { SearchInterface } from "@/components/SearchInterface";
import { ProductResults } from "@/components/ProductResults";
import { useToast } from "@/hooks/use-toast";
import laptopImage from "@/assets/laptop-product.jpg";
import shoesImage from "@/assets/nike-shoes-product.jpg";
import phoneImage from "@/assets/smartphone-product.jpg";
import headphonesImage from "@/assets/headphones-product.jpg";

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

// Mock product data for demonstration
const mockProducts: Record<string, Product[]> = {
  laptop: [
    {
      id: "1",
      title: "ASUS VivoBook 15 Thin and Light Laptop, 15.6\" FHD Display",
      price: "$459.99",
      originalPrice: "$549.99",
      image: laptopImage,
      link: "https://example.com/laptop1",
      rating: 4.3,
      reviewCount: 2847,
      badge: "Best Seller"
    },
    {
      id: "2", 
      title: "Acer Aspire 5 A515-46-R3UB | 15.6\" Full HD IPS Display",
      price: "$399.99",
      originalPrice: "$499.99",
      image: laptopImage,
      link: "https://example.com/laptop2",
      rating: 4.1,
      reviewCount: 1923
    }
  ],
  shoes: [
    {
      id: "3",
      title: "Nike Air Max 270 Men's Running Shoes",
      price: "$139.99",
      originalPrice: "$159.99", 
      image: shoesImage,
      link: "https://example.com/shoes1",
      rating: 4.5,
      reviewCount: 3521,
      badge: "Popular"
    },
    {
      id: "4",
      title: "Nike Revolution 6 Next Nature Men's Road Running Shoes",
      price: "$79.99",
      image: shoesImage,
      link: "https://example.com/shoes2",
      rating: 4.2,
      reviewCount: 1847
    }
  ],
  headphones: [
    {
      id: "5",
      title: "Sony WH-CH720N Noise Canceling Wireless Headphones",
      price: "$89.99",
      originalPrice: "$119.99",
      image: headphonesImage,
      link: "https://example.com/headphones1",
      rating: 4.4,
      reviewCount: 2156,
      badge: "Great Deal"
    }
  ],
  phone: [
    {
      id: "6",
      title: "Samsung Galaxy A54 5G 128GB Unlocked Android Smartphone",
      price: "$349.99",
      originalPrice: "$449.99",
      image: phoneImage,
      link: "https://example.com/phone1", 
      rating: 4.3,
      reviewCount: 4231,
      badge: "Top Rated"
    }
  ]
};

const Index = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setCurrentQuery(query);

    // Simulate realistic search processing with multiple steps
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Enhanced mock AI query processing - simulates Google Search API + GPT analysis
    const queryLower = query.toLowerCase();
    let results: Product[] = [];

    // More sophisticated query matching
    if (queryLower.includes('laptop') || queryLower.includes('computer') || queryLower.includes('$500') || queryLower.includes('budget')) {
      results = mockProducts.laptop;
    } else if (queryLower.includes('shoes') || queryLower.includes('nike') || queryLower.includes('running') || queryLower.includes('men')) {
      results = mockProducts.shoes;
    } else if (queryLower.includes('headphone') || queryLower.includes('audio') || queryLower.includes('noise') || queryLower.includes('wireless')) {
      results = mockProducts.headphones;
    } else if (queryLower.includes('phone') || queryLower.includes('smartphone') || queryLower.includes('samsung') || queryLower.includes('android')) {
      results = mockProducts.phone;
    } else if (queryLower.includes('gaming') || queryLower.includes('monitor')) {
      // For gaming queries, return tech products
      results = [...mockProducts.laptop, ...mockProducts.phone];
    } else {
      // AI-style mixed results based on popularity and relevance
      results = [
        ...mockProducts.laptop.slice(0, 1),
        ...mockProducts.shoes.slice(0, 1), 
        ...mockProducts.headphones,
        ...mockProducts.phone
      ];
    }

    setSearchResults(results);
    setIsSearching(false);

    if (results.length > 0) {
      toast({
        title: "AI Search Complete",
        description: `Found ${results.length} products using AI-powered search.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,theme(colors.primary.DEFAULT/0.1),transparent_70%)]" />
        
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <SearchInterface onSearch={handleSearch} isSearching={isSearching} />
        </div>
      </div>

      {/* Results Section */}
      {(searchResults.length > 0 || isSearching) && (
        <div className="container mx-auto px-4 py-12">
          <ProductResults 
            products={searchResults} 
            query={currentQuery}
            isLoading={isSearching}
          />
        </div>
      )}

      {/* Backend Integration Notice */}
      {!isSearching && searchResults.length === 0 && (
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center space-y-6 bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
            <h3 className="text-2xl font-semibold text-foreground">Ready for AI Integration</h3>
            <p className="text-muted-foreground">
              This MVP demonstrates the UI and user experience. To enable real AI-powered search with OpenAI GPT, LangChain agents, and live product data from Google/Bing Search APIs, you'll need to connect to Supabase for secure API key management and backend functionality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="px-4 py-2 bg-primary/10 rounded-lg text-sm text-primary font-medium">
                ✨ OpenAI GPT Integration Ready
              </div>
              <div className="px-4 py-2 bg-accent/10 rounded-lg text-sm text-accent font-medium">
                🔗 LangChain Agent Framework
              </div>
              <div className="px-4 py-2 bg-success/10 rounded-lg text-sm text-success font-medium">
                🔍 Real-time Product Search
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;