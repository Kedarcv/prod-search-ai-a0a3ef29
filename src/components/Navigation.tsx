import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const location = useLocation();
  
  const totalItems = getTotalItems();

  const navItems = [
    { path: '/', label: 'Search', icon: Search },
    { path: '/cart', label: 'Cart', icon: ShoppingCart, badge: totalItems > 0 ? totalItems : undefined },
    { path: '/contact', label: 'Contact', icon: null },
  ];

  const userItems = user ? [
    { path: '/profile', label: 'Profile', icon: User },
  ] : [
    { path: '/login', label: 'Login', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              AI Shop
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.label}</span>
                {item.badge && (
                  <Badge variant="destructive" className="ml-1 min-w-[1.25rem] h-5 flex items-center justify-center text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
            
            {userItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </Link>
            ))}

            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-muted-foreground hover:text-foreground"
              >
                Logout
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40">
            <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-3 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <Badge variant="destructive" className="min-w-[1.25rem] h-5 flex items-center justify-center text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            ))}
            
            {userItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-3 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                <span>{item.label}</span>
              </Link>
            ))}
              
              {user && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="justify-start text-muted-foreground hover:text-foreground"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};