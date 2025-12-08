import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Bed,
  Utensils,
  List,
  Plus,
  Pencil,
  Trash2,
  Image as ImageIcon,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { hostelService, Hostel } from "@/services/api";
import { toast } from "sonner";

export default function HostelsDashboard() {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [prevPage, setPrevPage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHostels = async () => {
      setLoading(true);
      try {
        const data = await hostelService.getHostels(currentPage);
        setHostels(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
        setTotalPages(Math.ceil(data.count / 8));
        setCurrentIndex(0); // Reset to first item on new page
      } catch (error) {
        console.error("Failed to fetch hostels:", error);
        toast.error("Failed to load hostels. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHostels();
  }, [currentPage]);

  const handleNextPage = () => {
    if (nextPage) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextHostel = () => {
    setCurrentIndex((prev) => (prev + 1) % hostels.length);
  };

  const handlePrevHostel = () => {
    setCurrentIndex((prev) => (prev === 0 ? hostels.length - 1 : prev - 1));
  };

  if (loading && hostels.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const currentHostel = hostels[currentIndex];

  return (
    <div className="relative min-h-screen p-4 sm:p-6 space-y-8 animate-fade-in pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">
            Hostel Management Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage, edit, or remove your registered hostel properties
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <Button
            size="sm"
            onClick={() => navigate("/dashboard/add-hostel")}
            className="bg-gradient-to-r from-primary to-accent shadow-md hover:shadow-lg transition-all flex-shrink-0"
          >
            <Plus className="mr-1 h-4 w-4" /> Add
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white transition-all flex-shrink-0"
          >
            <Pencil className="mr-1 h-4 w-4" /> Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white shadow-sm flex-shrink-0"
          >
            <Trash2 className="mr-1 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>

      {/* Hostels Section */}
      {hostels.length === 0 && !loading ? (
        <div className="text-center py-12 border rounded-xl bg-muted/10">
          <p className="text-muted-foreground">No hostels found. Add your first hostel to get started.</p>
        </div>
      ) : (
        <div className="relative">
          {loading && (
             <div className="flex justify-center py-4 absolute inset-0 z-20 bg-white/50">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
             </div>
          )}
          
          {/* Left Arrow */}
          <button
            onClick={handlePrevHostel}
            className="absolute -left-4 sm:-left-8 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow hover:bg-gray-100 z-10"
            disabled={hostels.length <= 1}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {currentHostel && (
            <Card key={currentHostel.id} className="shadow-lg border rounded-2xl transition-all duration-300">
              <CardHeader className="border-b p-4 flex justify-between items-left ">
                <div className="flex justify-between w-full items-start">
                  <div>
                    <CardTitle className="text-2xl font-semibold">
                      {currentHostel.name}
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {currentHostel.address}, {currentHostel.city}, {currentHostel.state} - {currentHostel.pincode}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant={currentHostel.is_verified ? "default" : "outline"}
                      className={currentHostel.is_verified ? "bg-green-600 text-white" : "bg-yellow-100 text-yellow-800 border-yellow-200"}
                    >
                      {currentHostel.is_verified ? "Verified" : "Pending"}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-medium bg-secondary/50 px-2 py-1 rounded-md">
                      {currentHostel.availability_summary}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h2 className="font-semibold text-lg">Hostel Info</h2>
                    <p className="text-muted-foreground">{currentHostel.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary" className="capitalize">
                        Type: {currentHostel.hostel_type}
                      </Badge>
                      {currentHostel.facilities?.map((f) => (
                        <Badge key={f.id} className="capitalize bg-muted">
                          {f.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tabs Section */}
                <Tabs defaultValue="mess" className="w-full">
                  <TabsList className="grid grid-cols-4 lg:w-1/2">
                    <TabsTrigger value="mess">
                      <Utensils className="mr-1 h-4 w-4" /> Menu
                    </TabsTrigger>
                    <TabsTrigger value="rooms">
                      <Bed className="mr-1 h-4 w-4" /> Rooms
                    </TabsTrigger>
                    <TabsTrigger value="rules">
                      <List className="mr-1 h-4 w-4" /> Rules
                    </TabsTrigger>
                    <TabsTrigger value="gallery">
                      <ImageIcon className="mr-1 h-4 w-4" /> Gallery
                    </TabsTrigger>
                  </TabsList>

                  {/* MESS MENU */}
                  <TabsContent value="mess" className="pt-4">
                    {currentHostel.mess_menus && currentHostel.mess_menus.length > 0 ? (
                      <div className="grid gap-4">
                        {currentHostel.mess_menus.map((menu) => (
                          <Card key={menu.id} className="border p-4">
                            <h3 className="font-semibold mb-2 text-lg">{menu.day}</h3>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div className="bg-green-50/50 p-3 rounded-lg border border-green-100">
                                <h4 className="font-semibold text-green-700 mb-2">
                                  Veg Menu
                                </h4>
                                <div className="space-y-1">
                                  <p><strong>Breakfast:</strong> {menu.veg_menu.breakfast}</p>
                                  <p><strong>Lunch:</strong> {menu.veg_menu.lunch}</p>
                                  <p><strong>Dinner:</strong> {menu.veg_menu.dinner}</p>
                                </div>
                              </div>
                              <div className="bg-orange-50/50 p-3 rounded-lg border border-orange-100">
                                <h4 className="font-semibold text-orange-700 mb-2">
                                  Non-Veg Menu
                                </h4>
                                <div className="space-y-1">
                                  <p><strong>Breakfast:</strong> {menu.nonveg_menu.breakfast}</p>
                                  <p><strong>Lunch:</strong> {menu.nonveg_menu.lunch}</p>
                                  <p><strong>Dinner:</strong> {menu.nonveg_menu.dinner}</p>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No mess menu available.
                      </div>
                    )}
                  </TabsContent>

                  {/* ROOMS */}
                  <TabsContent value="rooms" className="pt-4">
                    {currentHostel.rooms && currentHostel.rooms.length > 0 ? (
                      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {currentHostel.rooms.map((room) => (
                          <Card key={room.id} className="border hover:shadow-lg transition-all rounded-xl overflow-hidden">
                            <CardHeader className="pb-2 bg-muted/20">
                              <div className="flex justify-between items-center">
                                <CardTitle className="text-lg font-semibold">
                                  Room {room.room_number}
                                </CardTitle>
                                <Badge variant={room.is_available ? "default" : "destructive"} className="text-xs">
                                  {room.is_available ? "Available" : "Full"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground capitalize">{room.room_type}</p>
                            </CardHeader>
                            <CardContent className="space-y-4 p-4">
                              {/* Room Images Carousel/Grid */}
                              {room.images && room.images.length > 0 && (
                                <div className="flex gap-2 overflow-x-auto pb-2 snap-x">
                                  {room.images.map((img) => (
                                    <img 
                                      key={img.id} 
                                      src={img.image} 
                                      alt={`Room ${room.room_number}`} 
                                      className="h-24 w-32 object-cover rounded-md flex-shrink-0 snap-center border"
                                    />
                                  ))}
                                </div>
                              )}

                              <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                                {room.description}
                              </p>
                              
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="bg-secondary/20 p-2 rounded">
                                  <p className="text-xs text-muted-foreground">Monthly</p>
                                  <p className="font-semibold">₹{room.monthly_price}</p>
                                </div>
                                <div className="bg-secondary/20 p-2 rounded">
                                  <p className="text-xs text-muted-foreground">Daily</p>
                                  <p className="font-semibold">₹{room.daily_price}</p>
                                </div>
                              </div>

                              <div className="text-sm">
                                <p className="mb-1 text-xs font-medium text-muted-foreground">Facilities:</p>
                                <div className="flex flex-wrap gap-1">
                                  {room.facilities && room.facilities.length > 0 ? (
                                    room.facilities.map(fac => (
                                      <span key={fac.id} className="text-[10px] bg-muted px-1.5 py-0.5 rounded border">
                                        {fac.name}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-[10px] text-muted-foreground italic">None listed</span>
                                  )}
                                </div>
                              </div>

                              <div className="pt-2 border-t flex justify-between items-center text-xs text-muted-foreground">
                                <span>Capacity: {room.capacity}</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No room details available.
                      </div>
                    )}
                  </TabsContent>

                  {/* RULES */}
                  <TabsContent value="rules" className="pt-4">
                    {currentHostel.rules && currentHostel.rules.length > 0 ? (
                      <div className="grid gap-3">
                        {currentHostel.rules.map((rule) => (
                          <div key={rule.id} className="bg-muted/30 p-4 rounded-lg border">
                            <div className="flex justify-between items-start mb-1">
                              <h4 className="font-semibold">{rule.title}</h4>
                              <Badge variant="outline" className="text-[10px] capitalize">{rule.rule_type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{rule.description}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No rules listed.
                      </div>
                    )}
                  </TabsContent>

                  {/* GALLERY */}
                  <TabsContent value="gallery" className="pt-4">
                    {currentHostel.images && currentHostel.images.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {currentHostel.images.map((img) => (
                          <div key={img.id} className="group relative">
                            <img
                              src={img.image}
                              alt={img.caption || "Hostel image"}
                              className="rounded-lg shadow-sm object-cover h-40 w-full hover:scale-[1.03] transition-transform"
                            />
                            {img.caption && (
                              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                {img.caption}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No images available.
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Right Arrow */}
          <button
            onClick={handleNextHostel}
            className="absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow hover:bg-gray-100 z-10"
            disabled={hostels.length <= 1}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* API Pagination Controls (Still needed to switch pages) */}
          <div className="flex items-center justify-between border-t pt-4 mt-4">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevPage}
                disabled={!prevPage || loading}
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous Page
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={!nextPage || loading}
              >
                Next Page
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Fixed Pagination for Current Page Items */}
      {hostels.length > 0 && (
        <div className="fixed bottom-4 left-0 lg:left-64 right-0 z-30 flex justify-center px-4 pointer-events-none transition-all duration-300">
          <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg border flex gap-2 overflow-x-auto max-w-full pointer-events-auto no-scrollbar">
            {hostels.map((hostel, index) => (
              <Button
                key={hostel.id}
                variant={index === currentIndex ? "default" : "outline"}
                size="sm"
                className={`text-xs sm:text-sm whitespace-nowrap rounded-full shadow-sm transition-all flex-shrink-0 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-primary to-accent text-white"
                    : "border-primary text-primary bg-transparent hover:bg-primary hover:text-white"
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                {hostel.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
