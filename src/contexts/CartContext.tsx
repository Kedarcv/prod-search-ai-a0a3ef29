import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  title: string;
  price: string;
  image: string;
  quantity: number;
  link: string;
  originalPrice?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shoppingCart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    const existingItem = items.find(item => item.id === product.id);
    
    if (existingItem) {
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      const newItem: CartItem = { ...product, quantity: 1 };
      setItems(prev => [...prev, newItem]);
      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
      });
    }
  };

  const removeFromCart = (id: string) => {
    const item = items.find(item => item.id === id);
    setItems(prev => prev.filter(item => item.id !== id));
    if (item) {
      toast({
        title: "Removed from cart",
        description: `${item.title} has been removed from your cart.`,
      });
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};