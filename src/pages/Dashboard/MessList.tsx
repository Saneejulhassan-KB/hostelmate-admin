import { useState } from "react";
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
} from "lucide-react";
import { messDummyData } from "@/data/messDummyData";
import { useNavigate } from "react-router-dom";

export default function MessDashboard() {
  const [messList] = useState(messDummyData.results);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % messList.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? messList.length - 1 : prev - 1));
  };

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
                </TabsList>
              </div>

              {/* MENU TAB */}
              <TabsContent value="menu" className="pt-4">
                <div className="grid gap-4">
                  {currentMess.mess_menus.map((menu) => (
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
                            {menu.veg_menu?.breakfast}
                          </p>
                          <p>
                            <strong>Lunch:</strong> {menu.veg_menu?.lunch}
                          </p>
                          <p>
                            <strong>Dinner:</strong> {menu.veg_menu?.dinner}
                          </p>
                        </div>

                        {menu.nonveg_menu ? (
                          <div>
                            <h4 className="font-semibold text-orange-600 mb-1">
                              Non-Veg Menu
                            </h4>
                            <p>
                              <strong>Breakfast:</strong>{" "}
                              {menu.nonveg_menu?.breakfast}
                            </p>
                            <p>
                              <strong>Lunch:</strong> {menu.nonveg_menu?.lunch}
                            </p>
                            <p>
                              <strong>Dinner:</strong>{" "}
                              {menu.nonveg_menu?.dinner}
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center text-muted-foreground">
                            <XCircle className="mr-2 h-4 w-4" /> No Non-Veg Menu
                          </div>
                        )}
                      </div>

                      {/* Images */}
                      {menu.images && (
                        <div className="flex gap-3 mt-3 overflow-x-auto pb-2">
                          {Object.entries(menu.images).map(([key, value]) => (
                            <div
                              key={key}
                              className="flex-shrink-0 w-24 sm:w-40 rounded-lg overflow-hidden border shadow-sm"
                            >
                              <img
                                src={value}
                                alt={key}
                                className="h-24 sm:h-28 w-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* MEAL PLANS TAB */}
              <TabsContent value="plans" className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentMess.meal_plans.map((plan) => (
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
                  ))}
                </div>
              </TabsContent>

              {/* FEATURES TAB */}
              <TabsContent value="features" className="pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {currentMess.features.map((feature) => (
                    <Card key={feature.id} className="border p-4 rounded-xl">
                      <div className="flex items-start gap-3">
                        <img
                          src={feature.icon}
                          alt=""
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-cover"
                        />
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
                  ))}
                </div>
              </TabsContent>

              {/* DELIVERY AREAS TAB */}
              <TabsContent value="delivery" className="pt-4">
                <div className="flex flex-wrap gap-2">
                  {currentMess.delivery_areas.map((area) => (
                    <Badge
                      key={area.id}
                      className="text-xs sm:text-sm bg-gradient-to-r from-primary to-accent text-white"
                    >
                      {area.area_name}
                    </Badge>
                  ))}
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
