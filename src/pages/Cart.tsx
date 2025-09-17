import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const { user } = useAuth();
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto" />
            <h1 className="text-3xl font-bold text-foreground">Your cart is empty</h1>
            <p className="text-muted-foreground">
              Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Link to="/">
              <Button className="bg-gradient-primary hover:opacity-90">
                Start Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-primary">
                          {item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {item.originalPrice}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-foreground">Order Summary</h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>${(totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-2">
                    <div className="flex justify-between text-lg font-bold text-foreground">
                      <span>Total</span>
                      <span>${(totalPrice * 1.08).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  {user ? (
                    <Link to="/checkout">
                      <Button className="w-full bg-gradient-primary hover:opacity-90">
                        Proceed to Checkout
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/login?redirect=/checkout">
                      <Button className="w-full bg-gradient-primary hover:opacity-90">
                        Login to Checkout
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                  
                  <Link to="/">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;