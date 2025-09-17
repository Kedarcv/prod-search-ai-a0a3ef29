import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded users for demo
const USERS: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Doe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
  },
  {
    id: '2', 
    email: 'jane@example.com',
    name: 'Jane Smith',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane'
  },
  {
    id: '3',
    email: 'admin@example.com', 
    name: 'Admin User',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  }
];

const VALID_PASSWORDS = new Map([
  ['john@example.com', 'password123'],
  ['jane@example.com', 'password123'],
  ['admin@example.com', 'admin123']
]);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const validPassword = VALID_PASSWORDS.get(email);
    const foundUser = USERS.find(u => u.email === email);
    
    if (foundUser && validPassword === password) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};