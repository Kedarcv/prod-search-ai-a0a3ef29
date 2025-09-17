import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import laptopImage from '@/assets/laptop-product.jpg';
import shoesImage from '@/assets/nike-shoes-product.jpg';
import phoneImage from '@/assets/smartphone-product.jpg';
import headphonesImage from '@/assets/headphones-product.jpg';

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
  description: string;
  features: string[];
  specs: Record<string, string>;
}

const PRODUCTS: Record<string, Product> = {
  '1': {
    id: '1',
    title: 'ASUS VivoBook 15 Thin and Light Laptop, 15.6" FHD Display',
    price: '$459.99',
    originalPrice: '$549.99',
    image: laptopImage,
    link: 'https://example.com/laptop1',
    rating: 4.3,
    reviewCount: 2847,
    badge: 'Best Seller',
    description: 'The ASUS VivoBook 15 is a powerful and portable laptop perfect for everyday computing, work, and entertainment. With its sleek design and reliable performance, it delivers exceptional value.',
    features: [
      '15.6" Full HD (1920 x 1080) display',
      'AMD Ryzen 5 processor',
      '8GB DDR4 RAM',
      '256GB SSD storage',
      'Windows 11 Home',
      'Lightweight at 3.97 lbs'
    ],
    specs: {
      'Processor': 'AMD Ryzen 5 5500U',
      'RAM': '8GB DDR4',
      'Storage': '256GB SSD',
      'Display': '15.6" FHD Anti-Glare',
      'Graphics': 'AMD Radeon Graphics',
      'OS': 'Windows 11 Home',
      'Weight': '3.97 lbs'
    }
  },
  '3': {
    id: '3',
    title: 'Nike Air Max 270 Men\'s Running Shoes',
    price: '$139.99',
    originalPrice: '$159.99',
    image: shoesImage,
    link: 'https://example.com/shoes1',
    rating: 4.5,
    reviewCount: 3521,
    badge: 'Popular',
    description: 'Experience ultimate comfort and style with the Nike Air Max 270. Featuring Nike\'s largest heel Air unit yet, these shoes provide exceptional cushioning for all-day wear.',
    features: [
      'Large heel Air unit for maximum cushioning',
      'Engineered mesh upper for breathability',
      'Rubber outsole with waffle pattern',
      'Foam midsole for lightweight support',
      'Available in multiple colorways',
      'Suitable for running and casual wear'
    ],
    specs: {
      'Upper Material': 'Engineered mesh',
      'Sole Material': 'Rubber with Air Max cushioning',
      'Closure': 'Lace-up',
      'Heel Height': '32mm',
      'Weight': '11.2 oz (size 9)',
      'Care': 'Spot clean with damp cloth'
    }
  }
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const product = id ? PRODUCTS[id] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      link: product.link,
      originalPrice: product.originalPrice
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Product link has been copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-card rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.badge && (
                <Badge variant="secondary" className="mb-3">
                  {product.badge}
                </Badge>
              )}
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating!) 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviewCount?.toLocaleString()} reviews)
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-primary">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="flex gap-3">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-primary hover:opacity-90"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Specifications</h3>
              <div className="bg-card/50 rounded-lg p-4 space-y-3">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border/30 last:border-0">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="text-foreground font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;