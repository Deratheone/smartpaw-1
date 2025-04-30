
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
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
  Clock
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Placeholder for when we implement the camera component
const CameraFeed = () => (
  <div className="bg-gray-100 rounded-md p-6 flex flex-col items-center justify-center text-center h-48">
    <Camera size={48} className="text-gray-400 mb-2" />
    <p className="text-gray-500">Live camera feed will be available soon</p>
  </div>
);

// Mock data for pet status - would be replaced with real data from the backend
const petStatus = {
  name: "Buddy",
  water: "2 hours ago",
  food: "4 hours ago", 
  medicine: "8 hours ago"
};

// Questions component
const Questions = () => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim()) {
      toast({
        title: "Question Submitted",
        description: "Your question has been sent to the service provider."
      });
      setQuestion("");
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full border border-gray-300 rounded-md p-3 min-h-[100px]"
          placeholder="Ask a question about your pet's care..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button type="submit">
          <MessageSquare className="mr-2 h-4 w-4" />
          Send Question
        </Button>
      </form>
      <div className="space-y-2">
        <h3 className="font-medium">Previous Questions</h3>
        <div className="border-t pt-2">
          <p className="text-sm text-gray-500">No previous questions</p>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const { user, deleteAccount } = useAuth();
  const navigate = useNavigate();

  // Fetch service history
  const { data: serviceHistory, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['serviceHistory', user?.id],
    queryFn: async () => {
      // Replace with actual API call to get service history
      // This is just a placeholder
      return [
        { id: 1, serviceName: "Pet Boarding - Premium", date: "2025-03-15", provider: "Happy Paws Resort", status: "Completed" },
        { id: 2, serviceName: "Pet Boarding - Standard", date: "2025-04-20", provider: "Furry Friends Care", status: "Active" }
      ];
    },
    enabled: !!user
  });

  // Current active service - would be fetched from the backend
  const activeService = serviceHistory?.find(service => service.status === "Active");

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto p-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User info section */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>My Information</CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p>{user.user_metadata.full_name || "Not provided"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Account Type</p>
                <p className="capitalize">{(user.user_metadata.user_type || "").replace(/-/g, " ")}</p>
              </div>

              {/* Delete Account Button */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full mt-4">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your account
                      and remove all your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => deleteAccount()} 
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          {/* Main content area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active service section - only show if there's an active service */}
            {activeService && (
              <Card>
                <CardHeader>
                  <CardTitle>Current Active Service</CardTitle>
                  <CardDescription>
                    {activeService.serviceName} - Started on {activeService.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="status">
                    <TabsList className="mb-4">
                      <TabsTrigger value="status">Pet Status</TabsTrigger>
                      <TabsTrigger value="camera">Camera Feed</TabsTrigger>
                      <TabsTrigger value="questions">Questions</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="status" className="space-y-4">
                      <div className="rounded-lg bg-gray-50 p-4">
                        <h3 className="font-medium mb-4">Pet: {petStatus.name}</h3>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Droplet className="mr-2 h-5 w-5 text-blue-500" />
                              <span>Water</span>
                            </div>
                            <span className="text-sm text-gray-500">{petStatus.water}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Egg className="mr-2 h-5 w-5 text-yellow-500" />
                              <span>Food</span>
                            </div>
                            <span className="text-sm text-gray-500">{petStatus.food}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Pill className="mr-2 h-5 w-5 text-purple-500" />
                              <span>Medicine</span>
                            </div>
                            <span className="text-sm text-gray-500">{petStatus.medicine}</span>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="camera">
                      <CameraFeed />
                    </TabsContent>
                    
                    <TabsContent value="questions">
                      <Questions />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}

            {/* Service history section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Service History
                </CardTitle>
                <CardDescription>
                  Your past and current services
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingHistory ? (
                  <p>Loading service history...</p>
                ) : serviceHistory && serviceHistory.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {serviceHistory.map((service) => (
                        <TableRow key={service.id}>
                          <TableCell>{service.serviceName}</TableCell>
                          <TableCell>{service.date}</TableCell>
                          <TableCell>{service.provider}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              service.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                            }`}>
                              {service.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center py-4">No service history found</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
