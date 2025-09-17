import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
      navigate(redirectTo);
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <LogIn className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              AI Shop
            </span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>
              Sign in to your account to continue shopping
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Demo Accounts:</p>
              <div className="space-y-1 text-xs">
                <div>john@example.com / password123</div>
                <div>jane@example.com / password123</div>
                <div>admin@example.com / admin123</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;