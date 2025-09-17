import { useState } from 'react';
import { User, Settings, Package, MapPin, Bell, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Mock order data
const mockOrders = [
  {
    id: 'ORD-1702134567',
    date: '2024-01-15',
    status: 'delivered',
    total: 459.99,
    items: [
      { name: 'ASUS VivoBook 15 Laptop', quantity: 1, price: 459.99 }
    ]
  },
  {
    id: 'ORD-1702034567',
    date: '2024-01-10',
    status: 'shipped',
    total: 139.99,
    items: [
      { name: 'Nike Air Max 270 Running Shoes', quantity: 1, price: 139.99 }
    ]
  },
  {
    id: 'ORD-1701934567',
    date: '2024-01-05',
    status: 'processing',
    total: 89.99,
    items: [
      { name: 'Sony WH-CH720N Headphones', quantity: 1, price: 89.99 }
    ]
  }
];

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States'
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully.",
    });
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-success text-success-foreground';
      case 'shipped': return 'bg-primary text-primary-foreground';
      case 'processing': return 'bg-accent text-accent-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Please sign in</h1>
          <p className="text-muted-foreground">You need to be signed in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Account</h1>
          <p className="text-muted-foreground">Manage your account settings and order history</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{user.name}</h3>
                    <p className="text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={profileData.country}
                      onChange={(e) => setProfileData(prev => ({ ...prev, country: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground">{order.id}</h4>
                          <p className="text-sm text-muted-foreground">
                            Ordered on {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                          <p className="text-lg font-bold text-foreground mt-1">
                            ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              {item.name} (x{item.quantity})
                            </span>
                            <span className="font-medium">${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses">
            <Card>
              <CardHeader>
                <CardTitle>Saved Addresses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No saved addresses</h3>
                  <p className="text-muted-foreground mb-4">
                    Add an address to make checkout faster next time.
                  </p>
                  <Button variant="outline">Add New Address</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about your orders via email
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Marketing Emails</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive promotional offers and product updates
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Disabled
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Download My Data
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;