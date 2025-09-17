import { Link } from "react-router-dom";
import { ExternalLink, Star, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
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

export const ProductCard = ({ 
  id,
  title, 
  price, 
  originalPrice,
  image, 
  link, 
  rating,
  reviewCount,
  badge
}: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id,
      title,
      price,
      image,
      link,
      originalPrice
    });
  };

  return (
    <Card className="group overflow-hidden bg-gradient-card hover:shadow-card transition-all duration-300 hover:-translate-y-2 border-border/50">
      <CardContent className="p-0">
        <Link to={`/product/${id}`}>
          <div className="relative aspect-square overflow-hidden bg-secondary/20">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {badge && (
              <Badge className="absolute top-3 left-3 bg-success text-success-foreground">
                {badge}
              </Badge>
            )}
          </div>
        </Link>
        
        <div className="p-4 space-y-3">
          <Link to={`/product/${id}`}>
            <h3 className="font-semibold text-foreground line-clamp-2 leading-tight group-hover:text-primary transition-colors">
              {title}
            </h3>
          </Link>
          
          {rating && (
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-foreground font-medium">{rating}</span>
              </div>
              <span className="text-muted-foreground">
                ({reviewCount?.toLocaleString()} reviews)
              </span>
            </div>
          )}
          
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">{price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice}
              </span>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button 
              variant="outline"
              size="icon"
              onClick={() => window.open(link, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};