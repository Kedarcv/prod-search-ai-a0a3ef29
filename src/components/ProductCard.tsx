import { ExternalLink, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
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
  title, 
  price, 
  originalPrice,
  image, 
  link, 
  rating,
  reviewCount,
  badge
}: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden bg-gradient-card hover:shadow-card transition-all duration-300 hover:-translate-y-2 border-border/50">
      <CardContent className="p-0">
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
        
        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-foreground line-clamp-2 leading-tight">
            {title}
          </h3>
          
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
          
          <Button 
            variant="outline" 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
            onClick={() => window.open(link, '_blank')}
          >
            View Product
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};