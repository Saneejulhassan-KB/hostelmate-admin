import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Star,
  Bed,
  Users,
  Wifi,
  Utensils,
  ShieldCheck,
  List,
  Plus,
  Pencil,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { hostelDetailDummyData } from "@/data/hostelDetailDummyData"; // Import your data file

export default function HostelsDashboard() {
  const [hostels] = useState([hostelDetailDummyData]); // Later, replace with API list
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-8 animate-fade-in">
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
      {hostels.map((hostel) => (
        <Card key={hostel.id} className="shadow-lg border rounded-2xl">
          <CardHeader className="border-b p-4 flex justify-between items-left ">
            <div>
              <CardTitle className="text-2xl font-semibold">
                {hostel.name}
              </CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {hostel.address}, {hostel.city}, {hostel.state}
              </div>
            </div>
            {/* <Badge
              variant={hostel.is_verified ? "default" : "outline"}
              className={hostel.is_verified ? "bg-green-600 text-white" : ""}
            >
              {hostel.is_verified ? "Verified" : "Pending Verification"}
            </Badge> */}
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h2 className="font-semibold text-lg">Hostel Info</h2>
                <p>{hostel.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {hostel.facilities.map((f) => (
                    <Badge key={f.id} className="capitalize bg-muted">
                      {f.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="rooms" className="w-full">
              <TabsList className="grid grid-cols-4 lg:w-1/2">
                <TabsTrigger value="rooms">
                  <Bed className="mr-1 h-4 w-4" /> Rooms
                </TabsTrigger>
                <TabsTrigger value="mess">
                  <Utensils className="mr-1 h-4 w-4" /> Menu
                </TabsTrigger>
                <TabsTrigger value="rules">
                  <List className="mr-1 h-4 w-4" /> Rules
                </TabsTrigger>
                <TabsTrigger value="gallery">
                  <ImageIcon className="mr-1 h-4 w-4" /> Gallery
                </TabsTrigger>
              </TabsList>

              {/* ROOMS */}
              <TabsContent value="rooms" className="pt-4">
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {hostel.rooms.map((room) => (
                    <Card
                      key={room.id}
                      className="border hover:shadow-lg transition-all rounded-xl"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold">
                          Room {room.room_number} ({room.room_type})
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-3 p-4">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {room.description}
                        </p>

                        <div className="text-sm space-y-1">
                          <p>
                            <span className="font-medium text-foreground">
                              Capacity:
                            </span>{" "}
                            {room.capacity}
                          </p>
                          <p>
                            <span className="font-medium text-foreground">
                              Price:
                            </span>{" "}
                            ₹{room.monthly_price} / month
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {room.facilities.map((f) => (
                            <Badge
                              key={f.id}
                              className="text-xs capitalize bg-gradient-to-r from-primary to-accent text-white px-2 py-1"
                            >
                              {f.name}
                            </Badge>
                          ))}
                        </div>

                        {/* Scrollable Images */}
                        {room.images?.length > 0 && (
                          <div className="w-full overflow-hidden rounded-lg mt-3">
                            <div className="flex gap-3 overflow-x-scroll scrollbar-hide touch-pan-x -mx-4 px-4 pb-2">
                              {room.images.map((img) => (
                                <div
                                  key={img.id}
                                  className="flex-shrink-0 snap-start"
                                >
                                  <img
                                    src={img.image}
                                    alt=""
                                    className="h-28 w-40 object-cover rounded-lg shadow-sm"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* MESS MENU */}
              <TabsContent value="mess" className="pt-4">
                <div className="grid gap-4">
                  {hostel.mess_menus.map((menu) => (
                    <Card key={menu.id} className="border p-4">
                      <h3 className="font-semibold mb-2">{menu.day}</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-semibold text-green-600 mb-1">
                            Veg Menu
                          </h4>
                          <p>
                            <strong>Breakfast:</strong>{" "}
                            {menu.veg_menu.breakfast}
                          </p>
                          <p>
                            <strong>Lunch:</strong> {menu.veg_menu.lunch}
                          </p>
                          <p>
                            <strong>Dinner:</strong> {menu.veg_menu.dinner}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-orange-600 mb-1">
                            Non-Veg Menu
                          </h4>
                          <p>
                            <strong>Breakfast:</strong>{" "}
                            {menu.nonveg_menu.breakfast}
                          </p>
                          <p>
                            <strong>Lunch:</strong> {menu.nonveg_menu.lunch}
                          </p>
                          <p>
                            <strong>Dinner:</strong> {menu.nonveg_menu.dinner}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* RULES */}
              <TabsContent value="rules" className="pt-4">
                <div className="grid gap-3">
                  {hostel.rules.map((rule) => (
                    <div
                      key={rule.id}
                      className="relative rounded-xl overflow-hidden shadow-sm"
                      style={{
                        borderRadius: "0.75rem",
                        paddingLeft: "4px",
                        paddingRight: "2px",
                        paddingTop: "2px",
                        paddingBottom: "2px",
                        background:
                          "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--accent)))",
                      }}
                    >
                      <div
                        className="bg-background rounded-xl h-full w-full p-3"
                        style={{
                          background: "hsl(var(--background))",
                        }}
                      >
                        <h4 className="font-semibold">{rule.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {rule.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* GALLERY */}
              <TabsContent value="gallery" className="pt-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {hostel.images.map((img) => (
                    <img
                      key={img.id}
                      src={img.image}
                      alt=""
                      className="rounded-lg shadow-sm object-cover h-40 w-full hover:scale-[1.03] transition-transform"
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
