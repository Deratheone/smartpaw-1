
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, IndianRupee, ShoppingBag, Users } from "lucide-react";
import { BookingStats } from "@/types/service";

interface StatsCardsProps {
  stats: BookingStats;
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <IndianRupee className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{stats.totalRevenue.toFixed(2)}</div>
          <p className="text-xs text-gray-500">Lifetime earnings</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Bookings</CardTitle>
          <Calendar className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalBookings}</div>
          <p className="text-xs text-gray-500">Total bookings</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Active Services</CardTitle>
          <ShoppingBag className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeServices}</div>
          <p className="text-xs text-gray-500">Live listings</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Services</CardTitle>
          <Users className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalServices}</div>
          <p className="text-xs text-gray-500">All listings</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
