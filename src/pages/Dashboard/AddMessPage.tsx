import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Building2,
  Image as ImageIcon,
  Utensils,
  List,
  Save,
  CheckCircle2,
  Truck,
} from "lucide-react";
import { toast } from "sonner";

import BasicInfoTab from "./components/AddMess/BasicInfoTab";
import MessMenuTab from "./components/AddMess/MessMenuTab";
import MealPlansTab from "./components/AddMess/MealPlansTab";
import FeaturesTab from "./components/AddMess/FeaturesTab";
import DeliveryAreasTab from "./components/AddMess/DeliveryAreasTab";
import ImagesTab from "./components/AddMess/ImagesTab";

export default function AddMessPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("basic");
  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Basic Information State
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  // Mess Menu State
  const [messMenus, setMessMenus] = useState<any[]>([]);

  // Meal Plans State
  const [mealPlans, setMealPlans] = useState<any[]>([]);

  // Features State
  const [features, setFeatures] = useState<any[]>([]);

  // Delivery Areas State
  const [deliveryAreas, setDeliveryAreas] = useState<string[]>([]);

  // Images State
  const [images, setImages] = useState<any[]>([]);

  const handleBasicInfoChange = (field: string, value: string) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveBasicInfo = () => {
    if (!basicInfo.name || !basicInfo.address || !basicInfo.city) {
      toast.error("Please fill required fields");
      return;
    }
    setCompletedSections((prev) => [...new Set([...prev, "basic"])]);
    toast.success("Basic info saved!");
    setActiveTab("menu");
  };

  const handleAddMessMenu = () => {
    setMessMenus((prev) => [
      ...prev,
      {
        day: "",
        vegBreakfast: "",
        vegLunch: "",
        vegDinner: "",
        nonVegBreakfast: "",
        nonVegLunch: "",
        nonVegDinner: "",
      },
    ]);
  };

  const handleRemoveMessMenu = (index: number) => {
    setMessMenus((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveMessMenus = () => {
    setCompletedSections((prev) => [...new Set([...prev, "menu"])]);
    toast.success("Menu saved!");
    setActiveTab("plans");
  };

  const handleAddMealPlan = () => {
    setMealPlans((prev) => [
      ...prev,
      { name: "", price: "", meals: "", features: [] },
    ]);
  };

  const handleRemoveMealPlan = (index: number) => {
    setMealPlans((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveMealPlans = () => {
    setCompletedSections((prev) => [...new Set([...prev, "plans"])]);
    toast.success("Meal plans saved!");
    setActiveTab("features");
  };

  const handleAddFeature = () => {
    setFeatures((prev) => [...prev, { title: "", description: "" }]);
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveFeatures = () => {
    setCompletedSections((prev) => [...new Set([...prev, "features"])]);
    toast.success("Features saved!");
    setActiveTab("delivery");
  };

  const handleSaveDeliveryAreas = () => {
    setCompletedSections((prev) => [...new Set([...prev, "delivery"])]);
    toast.success("Delivery areas saved!");
    setActiveTab("images");
  };

  const handleAddImage = () => {
    setImages((prev) => [...prev, { file: null, preview: "", caption: "" }]);
  };

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages((prev) =>
        prev.map((img, i) =>
          i === index ? { ...img, file, preview: reader.result as string } : img
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveImages = () => {
    setCompletedSections((prev) => [...new Set([...prev, "images"])]);
    toast.success("Images saved!");
  };

  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    // Demo submission
    setTimeout(() => {
      toast.success("Mess property added successfully (Demo)!");
      setIsSubmitting(false);
      navigate("/dashboard/mess");
    }, 1500);
  };

  const isTabCompleted = (tab: string) => completedSections.includes(tab);

  return (
    <div className="min-h-screen p-4 sm:p-6 space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/dashboard/mess")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Add New Mess
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Register your mess property and menu details
            </p>
          </div>
        </div>

        <Button
          onClick={handleSubmitAll}
          disabled={isSubmitting}
          className="bg-gradient-to-r from-primary to-accent text-white shadow-lg"
        >
          {isSubmitting ? "Submitting..." : "Submit Mess"}
          {!isSubmitting && <Save className="ml-2 h-4 w-4" />}
        </Button>
      </div>

      {/* Progress Indicator */}
      <Card className="border-2 border-primary/20 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {[
              { id: "basic", label: "Basic Info", icon: Building2 },
              { id: "menu", label: "Menu", icon: Utensils },
              { id: "plans", label: "Plans", icon: List },
              { id: "features", label: "Features", icon: CheckCircle2 },
              { id: "delivery", label: "Delivery", icon: Truck },
              { id: "images", label: "Images", icon: ImageIcon },
            ].map((step, index) => (
              <div key={step.id} className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    activeTab === step.id
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-md"
                      : isTabCompleted(step.id)
                      ? "bg-green-100 text-green-700"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <step.icon className="h-4 w-4" />
                  <span className="text-xs font-medium hidden sm:inline">
                    {step.label}
                  </span>
                </div>
                {index < 5 && <div className="h-0.5 w-4 bg-border hidden md:block" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-2 rounded-2xl overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full bg-white/50">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="menu">Menu</TabsTrigger>
              <TabsTrigger value="plans">Plans</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="delivery">Delivery</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="p-6">
            <TabsContent value="basic">
              <BasicInfoTab
                basicInfo={basicInfo}
                handleBasicInfoChange={handleBasicInfoChange}
                handleSaveBasicInfo={handleSaveBasicInfo}
              />
            </TabsContent>
            <TabsContent value="menu">
              <MessMenuTab
                messMenus={messMenus}
                setMessMenus={setMessMenus}
                handleAddMessMenu={handleAddMessMenu}
                handleRemoveMessMenu={handleRemoveMessMenu}
                handleSaveMessMenus={handleSaveMessMenus}
              />
            </TabsContent>
            <TabsContent value="plans">
              <MealPlansTab
                mealPlans={mealPlans}
                setMealPlans={setMealPlans}
                handleAddMealPlan={handleAddMealPlan}
                handleRemoveMealPlan={handleRemoveMealPlan}
                handleSaveMealPlans={handleSaveMealPlans}
              />
            </TabsContent>
            <TabsContent value="features">
              <FeaturesTab
                features={features}
                setFeatures={setFeatures}
                handleAddFeature={handleAddFeature}
                handleRemoveFeature={handleRemoveFeature}
                handleSaveFeatures={handleSaveFeatures}
              />
            </TabsContent>
            <TabsContent value="delivery">
              <DeliveryAreasTab
                deliveryAreas={deliveryAreas}
                setDeliveryAreas={setDeliveryAreas}
                handleSaveDeliveryAreas={handleSaveDeliveryAreas}
              />
            </TabsContent>
            <TabsContent value="images">
              <ImagesTab
                images={images}
                setImages={setImages}
                handleAddImage={handleAddImage}
                handleImageUpload={handleImageUpload}
                handleRemoveImage={handleRemoveImage}
                handleSaveImages={handleSaveImages}
              />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
