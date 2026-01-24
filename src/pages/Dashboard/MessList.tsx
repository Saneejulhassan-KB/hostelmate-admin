import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Utensils,
  CheckCircle2,
  XCircle,
  List,
  Truck,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { messService, Mess } from "@/services/api";

export default function MessDashboard() {
  const [messList, setMessList] = useState<Mess[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessData = async () => {
      try {
        setLoading(true);
        const data = await messService.getMessHomes();
        setMessList(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching mess data:", err);
        setError("Failed to load mess data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessData();
  }, []);

  const handleNext = () => {
    if (messList.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % messList.length);
  };

  const handlePrev = () => {
    if (messList.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? messList.length - 1 : prev - 1));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-lg font-medium">Loading mess data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <XCircle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p className="text-muted-foreground mb-6">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  if (messList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <Utensils className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold mb-2">No Mess Found</h2>
        <p className="text-muted-foreground mb-6">You haven't added any mess properties yet.</p>
        <Button onClick={() => navigate("/dashboard/add-mess")}>
          <Plus className="mr-2 h-4 w-4" /> Add Your First Mess
        </Button>
      </div>
    );
  }

  const currentMess = messList[currentIndex];

  return (
    <div className="relative min-h-screen p-4 sm:p-6 space-y-8 animate-fade-in pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-1">
            Mess Management Dashboard
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage, edit, or remove your registered mess properties
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 sm:flex-nowrap">
          <Button
            size="sm"
            onClick={() => navigate("/dashboard/add-mess")}
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

      {/* Mess Card Carousel */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute -left-4 sm:-left-8 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow hover:bg-gray-100 z-10"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Mess Card */}
        <Card
          key={currentMess.id}
          className="shadow-lg border rounded-2xl transition-all duration-300"
        >
          <CardHeader className="border-b p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-xl sm:text-2xl font-semibold break-words">
                  {currentMess.name}
                </CardTitle>
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground flex-wrap">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="truncate">
                    {currentMess.address}, {currentMess.city},{" "}
                    {currentMess.state}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 sm:p-6 space-y-6">
            {/* Description */}
            <div>
              <h2 className="font-semibold text-base sm:text-lg">
                Description
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                {currentMess.description}
              </p>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="menu" className="w-full">
              <div className="overflow-x-auto">
                <TabsList className="inline-flex min-w-max sm:min-w-0">
                  <TabsTrigger value="menu" className="flex items-center">
                    <Utensils className="mr-1 h-4 w-4" /> Menu
                  </TabsTrigger>
                  <TabsTrigger value="plans" className="flex items-center">
                    <List className="mr-1 h-4 w-4" /> Meal Plans
                  </TabsTrigger>
                  <TabsTrigger value="features" className="flex items-center">
                    <CheckCircle2 className="mr-1 h-4 w-4" /> Features
                  </TabsTrigger>
                  <TabsTrigger value="delivery" className="flex items-center">
                    <Truck className="mr-1 h-4 w-4" /> Delivery
                  </TabsTrigger>
                  <TabsTrigger value="images" className="flex items-center">
                    <ImageIcon className="mr-1 h-4 w-4" /> Images
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* MENU TAB */}
              <TabsContent value="menu" className="pt-4">
                <div className="grid gap-4">
                  {currentMess.mess_menus.length > 0 ? (
                    currentMess.mess_menus.map((menu) => (
                      <Card key={menu.id} className="border p-4">
                        <h3 className="font-semibold mb-2 text-primary text-sm sm:text-base">
                          {menu.day}
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2 text-sm">
                          <div>
                            <h4 className="font-semibold text-green-600 mb-1">
                              Veg Menu
                            </h4>
                            <p>
                              <strong>Breakfast:</strong>{" "}
                              {menu.veg_breakfast}
                            </p>
                            <p>
                              <strong>Lunch:</strong> {menu.veg_lunch}
                            </p>
                            <p>
                              <strong>Dinner:</strong> {menu.veg_dinner}
                            </p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-orange-600 mb-1">
                              Non-Veg Menu
                            </h4>
                            <p>
                              <strong>Breakfast:</strong>{" "}
                              {menu.nonveg_breakfast}
                            </p>
                            <p>
                              <strong>Lunch:</strong> {menu.nonveg_lunch}
                            </p>
                            <p>
                              <strong>Dinner:</strong>{" "}
                              {menu.nonveg_dinner}
                            </p>
                          </div>
                        </div>

                        {/* Images */}
                        {(menu.breakfast_image || menu.lunch_image || menu.dinner_image) && (
                          <div className="flex gap-3 mt-3 overflow-x-auto pb-2">
                            {menu.breakfast_image && (
                              <div className="flex-shrink-0 w-24 sm:w-40 rounded-lg overflow-hidden border shadow-sm">
                                <img
                                  src={menu.breakfast_image.startsWith('http') ? menu.breakfast_image : `http://195.250.31.216:7000${menu.breakfast_image}`}
                                  alt="Breakfast"
                                  className="h-24 sm:h-28 w-full object-cover"
                                />
                              </div>
                            )}
                            {menu.lunch_image && (
                              <div className="flex-shrink-0 w-24 sm:w-40 rounded-lg overflow-hidden border shadow-sm">
                                <img
                                  src={menu.lunch_image.startsWith('http') ? menu.lunch_image : `http://195.250.31.216:7000${menu.lunch_image}`}
                                  alt="Lunch"
                                  className="h-24 sm:h-28 w-full object-cover"
                                />
                              </div>
                            )}
                            {menu.dinner_image && (
                              <div className="flex-shrink-0 w-24 sm:w-40 rounded-lg overflow-hidden border shadow-sm">
                                <img
                                  src={menu.dinner_image.startsWith('http') ? menu.dinner_image : `http://195.250.31.216:7000${menu.dinner_image}`}
                                  alt="Dinner"
                                  className="h-24 sm:h-28 w-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No menu available for this mess.
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* MEAL PLANS TAB */}
              <TabsContent value="plans" className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentMess.meal_plans.length > 0 ? (
                    currentMess.meal_plans.map((plan) => (
                      <Card
                        key={plan.id}
                        className="border hover:shadow-lg transition-all p-4 rounded-xl"
                      >
                        <h3 className="font-semibold text-base sm:text-lg mb-1">
                          {plan.name}
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm mb-2">
                          Plan ID: {plan.plan_id}
                        </p>
                        <p>
                          <strong>Meals:</strong> {plan.meals}
                        </p>
                        <p>
                          <strong>Price:</strong> ₹{plan.price}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {plan.features.map((f, i) => (
                            <Badge key={i} className="bg-muted text-xs">
                              {f}
                            </Badge>
                          ))}
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      No meal plans available.
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* FEATURES TAB */}
              <TabsContent value="features" className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {currentMess.features.length > 0 ? (
                    currentMess.features.map((feature) => (
                      <Card key={feature.id} className="border p-4 rounded-xl">
                        <div className="flex items-start gap-3">
                          {feature.icon && (
                            <img
                              src={feature.icon.startsWith('http') ? feature.icon : `http://195.250.31.216:7000${feature.icon}`}
                              alt=""
                              className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <h4 className="font-semibold text-sm sm:text-base">
                              {feature.title}
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      No features listed.
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* DELIVERY AREAS TAB */}
              <TabsContent value="delivery" className="pt-4">
                <div className="flex flex-wrap gap-2">
                  {currentMess.delivery_areas.length > 0 ? (
                    currentMess.delivery_areas.map((area) => (
                      <Badge
                        key={area.id}
                        className="text-xs sm:text-sm bg-gradient-to-r from-primary to-accent text-white"
                      >
                        {area.area_name}
                      </Badge>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground w-full">
                      No delivery areas specified.
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* IMAGES TAB */}
              <TabsContent value="images" className="pt-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {currentMess.images.length > 0 ? (
                    currentMess.images.map((img) => (
                      <div
                        key={img.id}
                        className="relative group rounded-xl overflow-hidden border shadow-sm aspect-square"
                      >
                        <img
                          src={
                            img.image.startsWith("http")
                              ? img.image
                              : `http://195.250.31.216:7000${img.image}`
                          }
                          alt={img.alt_text || "Mess Image"}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {img.alt_text && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2 truncate opacity-0 group-hover:opacity-100 transition-opacity">
                            {img.alt_text}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8 text-muted-foreground">
                      No images available for this mess.
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute -right-4 sm:-right-8 top-1/2 -translate-y-1/2 bg-white border rounded-full p-2 shadow hover:bg-gray-100 z-10"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Bottom Fixed Pagination */}
      <div className="fixed bottom-4 left-0 right-0 flex items-center justify-center gap-2 overflow-x-auto px-4">
        {messList.map((mess, index) => (
          <Button
            key={mess.id}
            variant={index === currentIndex ? "default" : "outline"}
            size="sm"
            className={`text-xs sm:text-sm whitespace-nowrap rounded-full shadow-md transition-all ${
              index === currentIndex
                ? "bg-gradient-to-r from-primary to-accent text-white"
                : "border-primary text-primary bg-transparent hover:bg-primary hover:text-white"
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            {mess.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
