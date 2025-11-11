import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, Save, Trash, ArrowLeft } from "lucide-react";

export default function AddHostelPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5 cursor-pointer" />
          <h1 className="text-2xl font-semibold">Add New Hostel</h1>
        </div>
        <Button className="flex items-center gap-2">
          <Save className="h-4 w-4" /> Save Hostel
        </Button>
      </div>

      {/* Tabs Container */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Hostel Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-6">
            <div className="overflow-x-auto scrollbar-hide px-1 -mx-1 sm:mx-0">
              <TabsList
                className="flex min-w-max gap-2 px-3 sm:px-0"
                style={{
                  WebkitOverflowScrolling: "touch",
                  scrollSnapType: "x mandatory",
                  scrollBehavior: "smooth",
                }}
              >
                <TabsTrigger
                  value="basic"
                  className="scroll-snap-align-start whitespace-nowrap flex-shrink-0"
                >
                  Basic Info
                </TabsTrigger>
                <TabsTrigger
                  value="rooms"
                  className="scroll-snap-align-start whitespace-nowrap flex-shrink-0"
                >
                  Rooms
                </TabsTrigger>
                <TabsTrigger
                  value="mess"
                  className="scroll-snap-align-start whitespace-nowrap flex-shrink-0"
                >
                  Mess Menu
                </TabsTrigger>
                <TabsTrigger
                  value="rules"
                  className="scroll-snap-align-start whitespace-nowrap flex-shrink-0"
                >
                  Rules
                </TabsTrigger>
                <TabsTrigger
                  value="facilities"
                  className="scroll-snap-align-start whitespace-nowrap flex-shrink-0"
                >
                  Facilities
                </TabsTrigger>
                <TabsTrigger
                  value="nearby"
                  className="scroll-snap-align-start whitespace-nowrap flex-shrink-0"
                >
                  Nearby & Preview
                </TabsTrigger>
              </TabsList>
            </div>

            {/* BASIC INFO */}
            <TabsContent value="basic" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Hostel Name" />
                <Input placeholder="Rating (e.g., 4.5)" />
                <Input placeholder="Reviews Count" />
                <Input placeholder="Contact Number" />
                <Input placeholder="Email" />
                <Input placeholder="Address" />
                <Input placeholder="City" />
                <Input placeholder="State" />
                <Input placeholder="Pincode" />
                <Input placeholder="Google Map Link (optional)" />
              </div>
              <Textarea placeholder="Description" />
              <div className="grid md:grid-cols-3 gap-4">
                <Input placeholder="Latitude" />
                <Input placeholder="Longitude" />
                <Input placeholder="Total Rooms" />
              </div>
            </TabsContent>

            {/* OWNER INFO */}
            <TabsContent value="owner" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Owner Name" />
                <Input placeholder="Owner Contact" />
              </div>
              <Textarea placeholder="Owner Address" />
              <Input placeholder="Owner Email" />
            </TabsContent>

            {/* ROOMS INFO */}
            <TabsContent value="rooms" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Rooms</h2>
                <Button variant="outline" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Room
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 space-y-3">
                  <Input placeholder="Room Name (e.g., Deluxe Room)" />
                  <Input placeholder="Type (Single / Double / Dormitory)" />
                  <Input placeholder="Capacity" />
                  <Input placeholder="Rent per Month (₹)" />
                  <Textarea placeholder="Description" />
                  <Input placeholder="Image URL (optional)" />
                  <Button
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <Trash className="h-4 w-4" /> Remove
                  </Button>
                </Card>
              </div>
            </TabsContent>

            {/* MESS MENU */}
            <TabsContent value="mess" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Mess Menu</h2>
                <Button variant="outline" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Menu
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Veg Menu */}
                <Card className="p-4 space-y-3">
                  <h3 className="font-medium">Veg Menu</h3>
                  <Input placeholder="Veg Breakfast" />
                  <Input placeholder="Veg Lunch" />
                  <Input placeholder="Veg Dinner" />
                </Card>

                {/* Non-Veg Menu */}
                <Card className="p-4 space-y-3">
                  <h3 className="font-medium">Non-Veg Menu</h3>
                  <Input placeholder="Non-Veg Breakfast" />
                  <Input placeholder="Non-Veg Lunch" />
                  <Input placeholder="Non-Veg Dinner" />
                </Card>
              </div>
            </TabsContent>

            {/* RULES */}
            <TabsContent value="rules" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">Hostel Rules</h2>
                <Button variant="outline" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Rule
                </Button>
              </div>

              <div className="grid gap-3">
                <Textarea placeholder="Rule description..." />
                <Textarea placeholder="Rule description..." />
              </div>
            </TabsContent>

            {/* NEARBY + PREVIEW */}
            <TabsContent value="nearby" className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-2">Nearby Locations</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4 space-y-3">
                    <Input placeholder="Nearby Place Name (e.g., Metro Station)" />
                    <Input placeholder="Distance (in meters)" />
                    <Button
                      variant="destructive"
                      className="flex items-center gap-2"
                    >
                      <Trash className="h-4 w-4" /> Remove
                    </Button>
                  </Card>
                </div>
                <Button
                  variant="outline"
                  className="mt-3 flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" /> Add Nearby Place
                </Button>
              </div>

              <div>
                <h2 className="text-lg font-medium mb-2">Preview</h2>
                <Card className="p-4 border-dashed border">
                  <p className="text-muted-foreground">
                    This section will show a live preview of all hostel data
                    once functionality is added.
                  </p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
