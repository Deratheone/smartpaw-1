
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, ShoppingBag, Users, Activity, Plus, Package, Clock } from "lucide-react";

const SellerDashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <p className="text-gray-600">Welcome back, Pawsome Grooming</p>
          </div>
          <Button className="bg-smartpaw-purple hover:bg-smartpaw-dark-purple">
            <Plus className="mr-2 h-4 w-4" /> Add New Listing
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,550.32</div>
              <p className="text-xs text-gray-500">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-gray-500">+12.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Products Sold</CardTitle>
              <ShoppingBag className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-gray-500">+8.2% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-gray-500">+4.9% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="appointments" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Manage your scheduled services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center p-4 border rounded-lg">
                      <div className="mr-4">
                        <div className="w-10 h-10 bg-smartpaw-purple bg-opacity-10 rounded-full flex items-center justify-center">
                          <Clock className="h-5 w-5 text-smartpaw-purple" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Full Grooming - Max (Golden Retriever)</p>
                            <p className="text-sm text-gray-500">April 20, 2025 • 10:00 AM</p>
                          </div>
                          <Button size="sm" variant="outline">Manage</Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 border rounded-lg">
                      <div className="mr-4">
                        <div className="w-10 h-10 bg-smartpaw-purple bg-opacity-10 rounded-full flex items-center justify-center">
                          <Clock className="h-5 w-5 text-smartpaw-purple" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Basic Bath - Bella (Siamese Cat)</p>
                            <p className="text-sm text-gray-500">April 20, 2025 • 1:30 PM</p>
                          </div>
                          <Button size="sm" variant="outline">Manage</Button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 border rounded-lg">
                      <div className="mr-4">
                        <div className="w-10 h-10 bg-smartpaw-purple bg-opacity-10 rounded-full flex items-center justify-center">
                          <Clock className="h-5 w-5 text-smartpaw-purple" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Nail Trimming - Charlie (Beagle)</p>
                            <p className="text-sm text-gray-500">April 21, 2025 • 9:15 AM</p>
                          </div>
                          <Button size="sm" variant="outline">Manage</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="listings">
            <Card>
              <CardHeader>
                <CardTitle>My Service Listings</CardTitle>
                <CardDescription>Manage your service offerings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center p-4 border rounded-lg">
                      <div className="mr-4">
                        <div className="w-10 h-10 bg-smartpaw-green bg-opacity-10 rounded-full flex items-center justify-center">
                          <Package className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Basic Bath</p>
                            <p className="text-sm text-gray-500">$35-$60 • 102 booked</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">Deactivate</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 border rounded-lg">
                      <div className="mr-4">
                        <div className="w-10 h-10 bg-smartpaw-green bg-opacity-10 rounded-full flex items-center justify-center">
                          <Package className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Full Grooming</p>
                            <p className="text-sm text-gray-500">$50-$90 • 87 booked</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">Deactivate</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 border rounded-lg">
                      <div className="mr-4">
                        <div className="w-10 h-10 bg-smartpaw-green bg-opacity-10 rounded-full flex items-center justify-center">
                          <Package className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Nail Trimming</p>
                            <p className="text-sm text-gray-500">$15 • 156 booked</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">Deactivate</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>See what customers are saying about your services</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-10 text-gray-500">Reviews component would be displayed here</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Business Analytics</CardTitle>
                <CardDescription>Track your performance and growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 w-full bg-gray-100 rounded-lg flex items-center justify-center">
                  <Activity className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-gray-500">Analytics charts would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SellerDashboard;
