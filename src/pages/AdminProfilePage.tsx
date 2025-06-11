import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { isAdminAuthenticated, clearAdminSession } from "@/hooks/auth/adminAuth";
import { useQuery } from "@tanstack/react-query";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { 
  Droplet, 
  Egg, 
  Pill, 
  Camera, 
  MessageSquare,
  Trash2,
  Clock,
  Shield
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import LiveFeed from "@/components/ui/LiveFeed";
import { useEffect } from "react";

// Placeholder for when we implement the camera component
const CameraFeed = () => (
  <div className="bg-gray-100 rounded-md p-6 flex flex-col items-center justify-center text-center h-48">
    <Camera size={48} className="text-gray-400 mb-2" />
    <p className="text-gray-500">Live camera feed will be available soon</p>
  </div>
);

// Mock admin pet data for demo
const ADMIN_PETS = [
  {
    id: 'admin-pet-1',
    name: 'Demo Dog',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    weight: 30,
    color: 'Golden',
    microchip_id: 'DEMO123456789',
    medical_notes: 'Healthy, up to date on all vaccinations',
    emergency_contact: 'SmartPaw Emergency Line: (555) 123-4567',
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'admin-pet-2', 
    name: 'Demo Cat',
    species: 'Cat',
    breed: 'Maine Coon',
    age: 2,
    weight: 12,
    color: 'Tabby',
    microchip_id: 'DEMO987654321',
    medical_notes: 'Indoor cat, very friendly',
    emergency_contact: 'SmartPaw Emergency Line: (555) 123-4567',
    created_at: '2024-02-20T14:30:00Z'
  }
];

// Mock pet monitoring data
const ADMIN_MONITORING = [
  {
    id: 'monitor-1',
    pet_id: 'admin-pet-1',
    pet_name: 'Demo Dog',
    water_level: 75,
    food_level: 60,
    last_fed: '2 hours ago',
    last_watered: '30 minutes ago',
    last_activity: '15 minutes ago',
    temperature: 72,
    humidity: 45,
    air_quality: 'Good'
  },
  {
    id: 'monitor-2',
    pet_id: 'admin-pet-2',
    pet_name: 'Demo Cat',
    water_level: 90,
    food_level: 80,
    last_fed: '1 hour ago',
    last_watered: '45 minutes ago', 
    last_activity: '5 minutes ago',
    temperature: 70,
    humidity: 50,
    air_quality: 'Excellent'
  }
];

// Mock booking data
const ADMIN_BOOKINGS = [
  {
    id: 'booking-1',
    service_title: 'Premium Pet Boarding',
    service_type: 'boarding',
    provider_name: 'SmartPaw Demo Services',
    start_date: '2024-12-20',
    end_date: '2024-12-25',
    total_price: 250,
    status: 'confirmed',
    pet_names: ['Demo Dog'],
    created_at: '2024-12-10T09:00:00Z'
  },
  {
    id: 'booking-2',
    service_title: 'Smart Pet Monitoring',
    service_type: 'monitoring',
    provider_name: 'SmartPaw Demo Services',
    start_date: '2024-12-01',
    end_date: '2024-12-31',
    total_price: 29.99,
    status: 'active',
    pet_names: ['Demo Cat'],
    created_at: '2024-11-25T14:30:00Z'
  }
];

const AdminProfilePage = () => {
  const navigate = useNavigate();

  // Check admin authentication
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    clearAdminSession();
    toast({
      title: "Logged out",
      description: "Admin session ended.",
    });
    navigate('/admin/login');
  };

  // Mock queries for demo data
  const { data: pets } = useQuery({
    queryKey: ['admin-pets'],
    queryFn: async () => ADMIN_PETS,
    enabled: isAdminAuthenticated()
  });

  const { data: petMonitoring } = useQuery({
    queryKey: ['admin-pet-monitoring'],
    queryFn: async () => ADMIN_MONITORING,
    enabled: isAdminAuthenticated()
  });

  const { data: bookings } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => ADMIN_BOOKINGS,
    enabled: isAdminAuthenticated()
  });

  const handleDeleteAccount = () => {
    toast({
      title: "Demo Account Deletion",
      description: "This is a demo - account would be deleted in a real environment.",
      variant: "default"
    });
  };

  if (!isAdminAuthenticated()) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">        {/* Admin Header */}
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                <div>
                  <CardTitle className="text-xl sm:text-2xl text-red-900">Admin User Profile</CardTitle>
                  <p className="text-red-700 text-sm">Demo Environment - All actions are simulated</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout} className="border-red-300 text-red-700 hover:bg-red-100 w-full sm:w-auto">
                Logout
              </Button>
            </div>
          </CardHeader>
        </Card>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Pet Owner Profile</h1>
            <Tabs defaultValue="pets" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1">
              <TabsTrigger value="pets" className="text-xs sm:text-sm px-2 py-2">
                <span className="hidden sm:inline">My Pets</span>
                <span className="sm:hidden">Pets</span>
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="text-xs sm:text-sm px-2 py-2">
                <span className="hidden sm:inline">Pet Monitoring</span>
                <span className="sm:hidden">Monitor</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="text-xs sm:text-sm px-2 py-2">
                <span className="hidden sm:inline">My Bookings</span>
                <span className="sm:hidden">Bookings</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="text-xs sm:text-sm px-2 py-2">
                <span className="hidden sm:inline">Account Settings</span>
                <span className="sm:hidden">Account</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pets" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Pets</CardTitle>
                  <CardDescription>
                    Manage your pet profiles and information
                  </CardDescription>
                </CardHeader>
                <CardContent>                  <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                    {pets?.map((pet) => (
                      <Card key={pet.id} className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <span className="text-lg">{pet.name}</span>
                            <span className="text-sm font-normal text-gray-500">
                              {pet.species} • {pet.breed}
                            </span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <p><strong>Age:</strong> {pet.age} years</p>
                            <p><strong>Weight:</strong> {pet.weight} lbs</p>
                            <p><strong>Color:</strong> {pet.color}</p>
                            <p className="sm:col-span-2"><strong>Microchip:</strong> {pet.microchip_id}</p>
                          </div>
                          <div className="pt-2 space-y-2">
                            <p className="text-sm"><strong>Medical Notes:</strong> {pet.medical_notes}</p>
                            <p className="text-sm"><strong>Emergency Contact:</strong> {pet.emergency_contact}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pet Monitoring Dashboard</CardTitle>
                  <CardDescription>
                    Real-time monitoring of your pets' health and activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {petMonitoring?.map((monitor) => (
                      <Card key={monitor.id} className="border border-gray-200">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span>{monitor.pet_name} - Live Monitoring</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-sm text-green-600">Online</span>
                            </div>
                          </CardTitle>
                        </CardHeader>                        <CardContent>
                          <div className="grid gap-4 sm:gap-6">
                            {/* Stats Grid - Mobile Responsive */}
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                              {/* Water Level */}
                              <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
                                <div className="flex items-center space-x-1 sm:space-x-2 mb-2">
                                  <Droplet className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                                  <span className="font-medium text-xs sm:text-sm">Water</span>
                                </div>
                                <div className="text-lg sm:text-2xl font-bold text-blue-600">{monitor.water_level}%</div>
                                <p className="text-xs text-gray-600 hidden sm:block">Last watered: {monitor.last_watered}</p>
                                <p className="text-xs text-gray-600 sm:hidden">{monitor.last_watered}</p>
                              </div>

                              {/* Food Level */}
                              <div className="bg-orange-50 p-3 sm:p-4 rounded-lg">
                                <div className="flex items-center space-x-1 sm:space-x-2 mb-2">
                                  <Egg className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                                  <span className="font-medium text-xs sm:text-sm">Food</span>
                                </div>
                                <div className="text-lg sm:text-2xl font-bold text-orange-600">{monitor.food_level}%</div>
                                <p className="text-xs text-gray-600 hidden sm:block">Last fed: {monitor.last_fed}</p>
                                <p className="text-xs text-gray-600 sm:hidden">{monitor.last_fed}</p>
                              </div>

                              {/* Activity */}
                              <div className="bg-green-50 p-3 sm:p-4 rounded-lg">
                                <div className="flex items-center space-x-1 sm:space-x-2 mb-2">
                                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                                  <span className="font-medium text-xs sm:text-sm">Activity</span>
                                </div>
                                <div className="text-sm sm:text-lg font-bold text-green-600">{monitor.last_activity}</div>
                                <p className="text-xs text-gray-600 hidden sm:block">Currently active</p>
                                <p className="text-xs text-gray-600 sm:hidden">Active</p>
                              </div>

                              {/* Environmental */}
                              <div className="bg-purple-50 p-3 sm:p-4 rounded-lg">
                                <div className="flex items-center space-x-1 sm:space-x-2 mb-2">
                                  <Pill className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                                  <span className="font-medium text-xs sm:text-sm">Environment</span>
                                </div>
                                <div className="space-y-1">
                                  <p className="text-xs sm:text-sm">Temp: {monitor.temperature}°F</p>
                                  <p className="text-xs sm:text-sm">Humidity: {monitor.humidity}%</p>
                                  <p className="text-xs sm:text-sm">{monitor.air_quality}</p>
                                </div>
                              </div>
                            </div>

                            {/* Camera Feed - Mobile Optimized */}
                            <div className="w-full">
                              <h4 className="font-medium mb-3 text-sm sm:text-base">Live Camera Feed - Admin Demo</h4>
                              <div className="w-full">
                                <LiveFeed 
                                  username="MohdShan105" 
                                  domain="smartpaw.vercel.app"
                                  title="Admin Demo - Live Pet Monitoring"
                                />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Bookings</CardTitle>
                  <CardDescription>
                    View and manage your pet service bookings
                  </CardDescription>
                </CardHeader>                <CardContent>
                  {/* Mobile-first responsive table */}
                  <div className="overflow-x-auto">
                    <Table className="min-w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[140px]">Service</TableHead>
                          <TableHead className="hidden sm:table-cell min-w-[120px]">Provider</TableHead>
                          <TableHead className="min-w-[80px]">Pets</TableHead>
                          <TableHead className="hidden md:table-cell min-w-[100px]">Dates</TableHead>
                          <TableHead className="min-w-[70px]">Price</TableHead>
                          <TableHead className="min-w-[80px]">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings?.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium text-sm">{booking.service_title}</p>
                                <p className="text-xs text-gray-500 capitalize">{booking.service_type}</p>
                                {/* Show provider on mobile */}
                                <p className="text-xs text-gray-500 sm:hidden mt-1">{booking.provider_name}</p>
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{booking.provider_name}</TableCell>
                            <TableCell className="text-sm">{booking.pet_names.join(', ')}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="text-sm">
                                <p>{new Date(booking.start_date).toLocaleDateString()}</p>
                                <p className="text-gray-500">to {new Date(booking.end_date).toLocaleDateString()}</p>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm font-medium">
                              <div>
                                ${booking.total_price}
                                {/* Show dates on mobile */}
                                <div className="md:hidden text-xs text-gray-500 mt-1">
                                  {new Date(booking.start_date).toLocaleDateString()} - {new Date(booking.end_date).toLocaleDateString()}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                booking.status === 'active' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {booking.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences and data
                  </CardDescription>
                </CardHeader>                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Profile Information</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                          <p><strong>Name:</strong> SmartPaw Admin</p>
                          <p><strong>Account Type:</strong> Pet Owner (Admin Demo)</p>
                          <p><strong>Email:</strong> admin@smartpaw.demo</p>
                          <p><strong>Member Since:</strong> January 2024</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Account Actions</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full justify-start">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Contact Support (Demo)
                        </Button>
                        
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" className="w-full justify-start">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Account (Demo)
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="mx-4 max-w-md">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Demo Account</AlertDialogTitle>
                              <AlertDialogDescription className="text-sm">
                                This is a demo environment. In a real application, this would permanently delete your account and all associated data. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                              <AlertDialogCancel className="w-full sm:w-auto">Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDeleteAccount} className="w-full sm:w-auto bg-red-600 hover:bg-red-700">
                                Delete Demo Account
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProfilePage;
