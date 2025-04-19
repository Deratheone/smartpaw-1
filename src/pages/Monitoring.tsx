
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Clock,
  Calendar as CalendarIcon,
  Check,
  Plus,
  Dog,
  Cat,
  PawPrint,
  ListFilter,
  Heart
} from "lucide-react";

// Mock data for pet activity logs
const initialLogs = [
  {
    id: 1,
    timestamp: "2025-04-19T08:30:00",
    type: "feeding",
    petName: "Max",
    details: "Morning kibble - 1 cup",
    notes: "Ate well, finished everything quickly.",
    caretaker: "John"
  },
  {
    id: 2,
    timestamp: "2025-04-19T10:15:00",
    type: "medication",
    petName: "Max",
    details: "Heartworm prevention pill",
    notes: "Given with treat, no issues.",
    caretaker: "John"
  },
  {
    id: 3,
    timestamp: "2025-04-19T12:00:00",
    type: "activity",
    petName: "Max",
    details: "30 minute walk in the park",
    notes: "Played with other dogs, very energetic today.",
    caretaker: "Sarah"
  },
  {
    id: 4,
    timestamp: "2025-04-19T14:30:00",
    type: "feeding",
    petName: "Max",
    details: "Afternoon snack - dental chew",
    notes: "",
    caretaker: "Sarah"
  },
  {
    id: 5,
    timestamp: "2025-04-19T15:45:00",
    type: "grooming",
    petName: "Bella",
    details: "Brushed coat, cleaned ears",
    notes: "Coat looks healthy, no issues with ears.",
    caretaker: "Sarah"
  },
  {
    id: 6,
    timestamp: "2025-04-19T17:00:00",
    type: "feeding",
    petName: "Bella",
    details: "Evening meal - wet food",
    notes: "Only ate half portion, will monitor.",
    caretaker: "John"
  },
  {
    id: 7,
    timestamp: "2025-04-19T18:30:00",
    type: "activity",
    petName: "Max",
    details: "Indoor play time - fetch",
    notes: "Played for 15 minutes, seems tired today.",
    caretaker: "John"
  },
  {
    id: 8,
    timestamp: "2025-04-19T20:00:00",
    type: "health",
    petName: "Bella",
    details: "Checked temperature - normal",
    notes: "Drinking more water than usual.",
    caretaker: "Sarah"
  }
];

// Mock data for pets
const pets = [
  {
    id: 1,
    name: "Max",
    type: "dog",
    breed: "Golden Retriever",
    age: 3,
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Bella",
    type: "cat",
    breed: "Siamese",
    age: 2,
    image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
];

// Activity log types with their icons and colors
const activityTypes = {
  feeding: {
    icon: <PawPrint className="h-5 w-5" />,
    color: "bg-green-100 text-green-800",
    label: "Feeding"
  },
  medication: {
    icon: <Heart className="h-5 w-5" />,
    color: "bg-red-100 text-red-800",
    label: "Medication"
  },
  activity: {
    icon: <Dog className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-800",
    label: "Activity"
  },
  grooming: {
    icon: <Dog className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-800",
    label: "Grooming"
  },
  health: {
    icon: <Heart className="h-5 w-5" />,
    color: "bg-orange-100 text-orange-800",
    label: "Health Check"
  }
};

const Monitoring = () => {
  const [logs, setLogs] = useState(initialLogs);
  const [activeTab, setActiveTab] = useState("timeline");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedPet, setSelectedPet] = useState("all");
  const [selectedActivityType, setSelectedActivityType] = useState("all");

  // Form state for adding new log
  const [newLog, setNewLog] = useState({
    petName: "",
    type: "feeding",
    details: "",
    notes: ""
  });

  // Filter logs based on selected date, pet, and activity type
  const filteredLogs = logs.filter(log => {
    const logDate = new Date(log.timestamp);
    const isSameDate = 
      logDate.getDate() === selectedDate.getDate() &&
      logDate.getMonth() === selectedDate.getMonth() &&
      logDate.getFullYear() === selectedDate.getFullYear();
    
    const matchesPet = selectedPet === "all" || log.petName === selectedPet;
    const matchesType = selectedActivityType === "all" || log.type === selectedActivityType;
    
    return isSameDate && matchesPet && matchesType;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const handleAddNewLog = () => {
    if (!newLog.petName || !newLog.details) return;
    
    const now = new Date();
    const newLogEntry = {
      id: logs.length + 1,
      timestamp: now.toISOString(),
      type: newLog.type,
      petName: newLog.petName,
      details: newLog.details,
      notes: newLog.notes,
      caretaker: "You" // In a real app, this would come from the logged-in user
    };
    
    setLogs([newLogEntry, ...logs]);
    setNewLog({
      petName: "",
      type: "feeding",
      details: "",
      notes: ""
    });
    
    // Switch to timeline view after adding
    setActiveTab("timeline");
  };

  return (
    <Layout>
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Pet Monitoring Dashboard</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Track and monitor your pets' activities, health, and caretaking records.
            </p>
          </div>

          {/* Main Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Your Pets</h2>
                <div className="space-y-4">
                  {pets.map(pet => (
                    <div key={pet.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedPet(pet.name === selectedPet ? "all" : pet.name)}>
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                        <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{pet.name}</h3>
                        <p className="text-sm text-gray-600">
                          {pet.breed}, {pet.age} {pet.age === 1 ? "year" : "years"} old
                        </p>
                      </div>
                      {pet.name === selectedPet && (
                        <div className="ml-auto">
                          <div className="bg-smartpaw-purple text-white p-1 rounded-full">
                            <Check className="h-4 w-4" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Calendar</h2>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                />
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Filter Activities</h2>
                <div className="space-y-2">
                  <div 
                    className={`flex items-center p-2 rounded-md cursor-pointer ${selectedActivityType === "all" ? "bg-smartpaw-purple bg-opacity-10" : "hover:bg-gray-50"}`}
                    onClick={() => setSelectedActivityType("all")}
                  >
                    <ListFilter className="h-5 w-5 mr-2 text-gray-700" />
                    <span className="text-gray-800">All Activities</span>
                  </div>
                  {Object.entries(activityTypes).map(([type, { icon, label }]) => (
                    <div 
                      key={type}
                      className={`flex items-center p-2 rounded-md cursor-pointer ${selectedActivityType === type ? "bg-smartpaw-purple bg-opacity-10" : "hover:bg-gray-50"}`}
                      onClick={() => setSelectedActivityType(type === selectedActivityType ? "all" : type)}
                    >
                      <span className="mr-2 text-gray-700">{icon}</span>
                      <span className="text-gray-800">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <div className="px-6 pt-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">Activity Logs</h2>
                      <div className="flex space-x-2">
                        <TabsList>
                          <TabsTrigger value="timeline">Timeline</TabsTrigger>
                          <TabsTrigger value="add">Add New</TabsTrigger>
                        </TabsList>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {format(selectedDate, "MMMM d, yyyy")}
                      </div>
                      {selectedPet !== "all" && (
                        <div>
                          Filtered by: <span className="font-medium">{selectedPet}</span>
                        </div>
                      )}
                      {selectedActivityType !== "all" && (
                        <div>
                          Activity type: <span className="font-medium">{activityTypes[selectedActivityType as keyof typeof activityTypes]?.label}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <TabsContent value="timeline" className="p-0">
                    <div className="max-h-[600px] overflow-y-auto p-6 pt-0">
                      {filteredLogs.length > 0 ? (
                        <div className="relative">
                          <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gray-200"></div>
                          <div className="space-y-6">
                            {filteredLogs.map(log => {
                              const logTime = new Date(log.timestamp);
                              const activityType = activityTypes[log.type as keyof typeof activityTypes];
                              
                              return (
                                <div key={log.id} className="relative pl-10">
                                  <div className="absolute left-0 top-2 flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-white z-10">
                                    <div className={`p-2 rounded-full ${activityType?.color.split(' ')[0]}`}>
                                      {activityType?.icon}
                                    </div>
                                  </div>
                                  <div className="bg-white border rounded-lg p-4 shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                      <div>
                                        <h3 className="text-lg font-bold text-gray-900">{activityType?.label} - {log.petName}</h3>
                                        <p className="text-gray-600 text-sm flex items-center">
                                          <Clock className="h-3 w-3 mr-1" />
                                          {format(logTime, "h:mm a")}
                                          <span className="mx-2">•</span>
                                          Logged by {log.caretaker}
                                        </p>
                                      </div>
                                      <div className={`px-2 py-1 rounded text-xs font-medium ${activityType?.color}`}>
                                        {activityType?.label}
                                      </div>
                                    </div>
                                    <p className="text-gray-800 font-medium mb-2">{log.details}</p>
                                    {log.notes && (
                                      <div className="bg-gray-50 p-3 rounded-md text-gray-700 text-sm">
                                        <p className="font-medium text-gray-900 mb-1">Notes:</p>
                                        {log.notes}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <PawPrint className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg">No activity logs found for this day.</p>
                          <p className="text-sm mt-2">Try selecting a different date or add a new log.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="add" className="p-6 pt-0">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold mb-4 text-gray-900">Add New Activity Log</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pet
                          </label>
                          <select 
                            className="w-full rounded-md border border-gray-300 p-2"
                            value={newLog.petName}
                            onChange={(e) => setNewLog({...newLog, petName: e.target.value})}
                          >
                            <option value="">Select a pet</option>
                            {pets.map(pet => (
                              <option key={pet.id} value={pet.name}>{pet.name}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Activity Type
                          </label>
                          <select 
                            className="w-full rounded-md border border-gray-300 p-2"
                            value={newLog.type}
                            onChange={(e) => setNewLog({...newLog, type: e.target.value})}
                          >
                            {Object.entries(activityTypes).map(([type, { label }]) => (
                              <option key={type} value={type}>{label}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Details
                          </label>
                          <Input
                            placeholder="Enter activity details"
                            value={newLog.details}
                            onChange={(e) => setNewLog({...newLog, details: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Notes (Optional)
                          </label>
                          <Textarea
                            placeholder="Add any additional notes here"
                            value={newLog.notes}
                            onChange={(e) => setNewLog({...newLog, notes: e.target.value})}
                            rows={4}
                          />
                        </div>
                        
                        <Button 
                          className="w-full bg-smartpaw-purple hover:bg-smartpaw-dark-purple text-white"
                          onClick={handleAddNewLog}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Log Entry
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Monitoring;
