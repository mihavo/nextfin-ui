import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAppSelector } from '@/store/hooks';
import {
  Calendar,
  Camera,
  Edit,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserDetailsPage() {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, State 12345',
    joinDate: 'January 2024',
  });

  const handleSave = () => {
    // Here you would typically dispatch an action to update user details
    console.log('Saving user details:', editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({
      username: user?.username || '',
      email: user?.email || '',
      phone: '+1 (555) 123-4567',
      address: '123 Main St, City, State 12345',
      joinDate: 'January 2024',
    });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">User Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Picture & Basic Info */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-3">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {user?.username?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">
                {user?.username || 'User'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {user?.email || 'user@nextfin.com'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* User Details Form */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Personal Information</CardTitle>
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button size="sm" onClick={handleSave} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Username
                </Label>
                <Input
                  id="username"
                  value={editedUser.username}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, username: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={editedUser.email}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={editedUser.phone}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, phone: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="joinDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Member Since
                </Label>
                <Input id="joinDate" value={editedUser.joinDate} disabled />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </Label>
              <Input
                id="address"
                value={editedUser.address}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, address: e.target.value })
                }
                disabled={!isEditing}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Account Statistics</h4>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">3</div>
                  <div className="text-sm text-muted-foreground">
                    Active Accounts
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">24</div>
                  <div className="text-sm text-muted-foreground">
                    Transactions This Month
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    $12,450
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Balance
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <Button variant="outline" className="justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="justify-start">
              Two-Factor Authentication
            </Button>
            <Button variant="outline" className="justify-start">
              Login History
            </Button>
            <Button variant="outline" className="justify-start">
              Privacy Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
