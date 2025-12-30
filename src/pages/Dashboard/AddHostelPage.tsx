import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Building2,
  MapPin,
  FileText,
  Image as ImageIcon,
  Bed,
  Utensils,
  List,
  Save,
  Plus,
  Trash2,
  Upload,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { facilityService, hostelService } from "@/services/api";
export default function AddHostelPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;
  const [activeTab, setActiveTab] = useState("basic");
  const [completedSections, setCompletedSections] = useState<string[]>([]);

  // Basic Information State
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    description: "",
    hostelType: "Gents",
    address: "",
    city: "",
    state: "",
    pincode: "",
    latitude: "",
    longitude: "",
  });

  // Facilities State
  type Facility = {
    id: number;
    name: string;
  };

  const [allFacilities, setAllFacilities] = useState<Facility[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<number[]>([]);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const data = await facilityService.getFacilities();

        // If API returns paginated response
        const facilities = data.results ?? data;

        setAllFacilities(facilities);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load facilities");
      }
    };

    fetchFacilities();
  }, []);

  // Fetch Hostel Data for Edit Mode
  useEffect(() => {
    if (isEditMode && id) {
      const fetchHostelDetails = async () => {
        try {
          const data = await hostelService.getHostelById(id);
          
          // Populate Basic Info
          setBasicInfo({
            name: data.name,
            description: data.description,
            hostelType: data.hostel_type,
            address: data.address,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            latitude: "", // Not in interface currently, keep empty or check if API returns it
            longitude: "",
          });

          // Populate Facilities
          // Assuming facility IDs are numbers in the component state but strings in API interface
          // We need to handle this carefully. For now, converting to number if possible.
          if (data.facilities) {
            setSelectedFacilities(data.facilities.map((f: any) => Number(f.id)));
          }

          // Populate Images
          if (data.images) {
            setImages(data.images.map((img: any) => ({
              file: null,
              caption: img.caption || "",
              preview: img.image,
              id: img.id // Keep ID for reference if needed
            })));
          }

          // Populate Rooms
          if (data.rooms) {
            setRooms(data.rooms.map((room: any) => ({
              roomNumber: room.room_number,
              roomType: room.room_type,
              capacity: room.capacity?.toString() || "",
              monthlyPrice: room.monthly_price?.toString() || "",
              dailyPrice: room.daily_price?.toString() || "",
              description: room.description,
              isAvailable: room.is_available,
              facilities: room.facilities ? room.facilities.map((f: any) => Number(f.id)) : [],
              images: room.images ? room.images.map((img: any) => ({
                file: null,
                caption: "",
                preview: img.image
              })) : []
            })));
          }

          // Populate Mess Menus
          if (data.mess_menus) {
            setMessMenus(data.mess_menus.map((menu: any) => ({
              day: menu.day,
              vegBreakfast: menu.veg_menu?.breakfast || "",
              vegLunch: menu.veg_menu?.lunch || "",
              vegDinner: menu.veg_menu?.dinner || "",
              nonVegBreakfast: menu.nonveg_menu?.breakfast || "",
              nonVegLunch: menu.nonveg_menu?.lunch || "",
              nonVegDinner: menu.nonveg_menu?.dinner || "",
            })));
          }

          // Populate Rules
          if (data.rules) {
            setRules(data.rules.map((rule: any) => ({
              title: rule.title,
              description: rule.description,
              ruleType: rule.rule_type,
            })));
          }

        } catch (error) {
          console.error("Failed to fetch hostel details:", error);
          toast.error("Failed to load hostel details");
        }
      };

      fetchHostelDetails();
    }
  }, [isEditMode, id]);

  // Images State
  const [images, setImages] = useState<
    { file: File | null; caption: string; preview: string; id?: string }[]
  >([]);

  // Rooms State
  const [rooms, setRooms] = useState<
    {
      roomNumber: string;
      roomType: string;
      capacity: string;
      monthlyPrice: string;
      dailyPrice: string;
      description: string;
      isAvailable: boolean;
      facilities: number[];
      images: {
        file: File | null;
        caption: string;
        preview: string;
      }[];
    }[]
  >([]);

  // Mess Menu State
  const [messMenus, setMessMenus] = useState<
    {
      day: string;
      vegBreakfast: string;
      vegLunch: string;
      vegDinner: string;
      nonVegBreakfast: string;
      nonVegLunch: string;
      nonVegDinner: string;
    }[]
  >([]);

  // Rules State
  const [rules, setRules] = useState<
    {
      title: string;
      description: string;
      ruleType: string;
    }[]
  >([]);

  const handleBasicInfoChange = (field: string, value: string) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddImage = () => {
    setImages((prev) => [...prev, { file: null, caption: "", preview: "" }]);
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

  const handleRemoveImage = async (index: number) => {
    const image = images[index];
    if (isEditMode && image.id && id) {
      if (!window.confirm("Are you sure you want to delete this image?")) return;
      try {
        await hostelService.deleteHostelImage(id, image.id);
        toast.success("Image deleted successfully");
        setImages((prev) => prev.filter((_, i) => i !== index));
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete image");
      }
    } else {
      setImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleAddRoom = () => {
    setRooms((prev) => [
      ...prev,
      {
        roomNumber: "",
        roomType: "single",
        capacity: "",
        monthlyPrice: "",
        dailyPrice: "",
        description: "",
        isAvailable: true,
        facilities: [],
        images: [],
      },
    ]);
  };

  const handleAddRoomImage = (roomIndex: number) => {
    setRooms((prev) =>
      prev.map((room, i) =>
        i === roomIndex
          ? {
              ...room,
              images: [
                ...room.images,
                { file: null, caption: "", preview: "" },
              ],
            }
          : room
      )
    );
  };

  const handleRoomImageUpload = (
    roomIndex: number,
    imageIndex: number,
    file: File
  ) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setRooms((prev) =>
        prev.map((room, i) =>
          i === roomIndex
            ? {
                ...room,
                images: room.images.map((img, j) =>
                  j === imageIndex
                    ? { ...img, file, preview: reader.result as string }
                    : img
                ),
              }
            : room
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveRoomImage = (roomIndex: number, imageIndex: number) => {
    setRooms((prev) =>
      prev.map((room, i) =>
        i === roomIndex
          ? {
              ...room,
              images: room.images.filter((_, j) => j !== imageIndex),
            }
          : room
      )
    );
  };

  const handleRemoveRoom = (index: number) => {
    setRooms((prev) => prev.filter((_, i) => i !== index));
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

  const handleAddRule = () => {
    setRules((prev) => [
      ...prev,
      {
        title: "",
        description: "",
        ruleType: "general",
      },
    ]);
  };

  const handleRemoveRule = (index: number) => {
    setRules((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveBasicInfo = () => {
    // Validation
    if (
      !basicInfo.name ||
      !basicInfo.address ||
      !basicInfo.city ||
      !basicInfo.state ||
      !basicInfo.pincode
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setCompletedSections((prev) => [...new Set([...prev, "basic"])]);
    toast.success("Basic information saved!");
    setActiveTab("facilities");
  };

  const handleSaveFacilities = () => {
    setCompletedSections((prev) => [...new Set([...prev, "facilities"])]);
    toast.success("Facilities saved!");
    setActiveTab("images");
  };

  const handleSaveImages = async () => {
    if (isEditMode && id) {
      try {
        const updatePromises = images.map(async (img) => {
          if (img.id) {
            const formData = new FormData();
            if (img.file) {
              formData.append("image", img.file);
            }
            formData.append("caption", img.caption || "");
            
            // Only make the request if there's something to update (file or we assume caption might have changed)
            // Since we don't track dirty state, we'll send the update for all existing images to ensure captions are synced.
            await hostelService.updateHostelImage(id, img.id, formData);
          }
        });
        await Promise.all(updatePromises);
        toast.success("Images updated successfully!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update images");
      }
    } else {
      setCompletedSections((prev) => [...new Set([...prev, "images"])]);
      toast.success("Images saved!");
      setActiveTab("rooms");
    }
  };

  const handleSaveRooms = () => {
    setCompletedSections((prev) => [...new Set([...prev, "rooms"])]);
    toast.success("Rooms saved!");
    setActiveTab("mess");
  };

  const handleSaveMessMenus = () => {
    setCompletedSections((prev) => [...new Set([...prev, "mess"])]);
    toast.success("Mess menus saved!");
    setActiveTab("rules");
  };

  const handleSaveRules = () => {
    setCompletedSections((prev) => [...new Set([...prev, "rules"])]);
    toast.success("Rules saved!");
  };

  const handleSubmitAll = () => {
    // This will be connected to backend later
    toast.success("Hostel added successfully! (Backend integration pending)");
    navigate("/dashboard/hostels");
  };

  const isTabCompleted = (tab: string) => completedSections.includes(tab);

  return (
    <div className="min-h-screen p-4 sm:p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/dashboard/hostels")}
            className="hover:bg-primary hover:text-white transition-all"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {isEditMode ? "Edit Hostel" : "Add New Hostel"}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {isEditMode ? "Update the details of your hostel property" : "Fill in the details to register a new hostel property"}
            </p>
          </div>
        </div>

        <Button
          onClick={handleSubmitAll}
          className="bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl transition-all"
        >
          <Save className="mr-2 h-4 w-4" />
          {isEditMode ? "Update Hostel" : "Submit Hostel"}
        </Button>
      </div>

      {/* Progress Indicator */}
      <Card className="border-2 border-primary/20 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {[
              { id: "basic", label: "Basic Info", icon: Building2 },
              { id: "facilities", label: "Facilities", icon: CheckCircle2 },
              { id: "images", label: "Images", icon: ImageIcon },
              { id: "rooms", label: "Rooms", icon: Bed },
              { id: "mess", label: "Mess Menu", icon: Utensils },
              { id: "rules", label: "Rules", icon: List },
            ].map((step, index) => (
              <div
                key={step.id}
                className="flex items-center gap-2 flex-shrink-0"
              >
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
                  {isTabCompleted(step.id) && (
                    <CheckCircle2 className="h-3 w-3 ml-1" />
                  )}
                </div>
                {index < 5 && (
                  <div className="h-0.5 w-4 bg-border hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Form Card */}
      <Card className="shadow-xl border-2 rounded-2xl overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-accent/5">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full bg-white/50">
              <TabsTrigger
                value="basic"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Building2 className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Basic</span>
              </TabsTrigger>
              <TabsTrigger
                value="facilities"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <CheckCircle2 className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Facilities</span>
              </TabsTrigger>
              <TabsTrigger
                value="images"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <ImageIcon className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Images</span>
              </TabsTrigger>
              <TabsTrigger
                value="rooms"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Bed className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Rooms</span>
              </TabsTrigger>
              <TabsTrigger
                value="mess"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <Utensils className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Mess</span>
              </TabsTrigger>
              <TabsTrigger
                value="rules"
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <List className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Rules</span>
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="p-6">
            {/* BASIC INFORMATION TAB */}
            <TabsContent value="basic" className="space-y-6 mt-0">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Basic Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Hostel Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                      Hostel Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={basicInfo.name}
                      onChange={(e) =>
                        handleBasicInfoChange("name", e.target.value)
                      }
                      placeholder="Enter hostel name"
                      className="w-full px-4 py-2.5 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    />
                  </div>

                  {/* Hostel Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-1">
                      Hostel Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={basicInfo.hostelType}
                      onChange={(e) =>
                        handleBasicInfoChange("hostelType", e.target.value)
                      }
                      className="w-full px-4 py-2.5 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none capitalize"
                    >
                      <option value="Gents">Gents</option>
                      <option value="Ladies">Ladies</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={basicInfo.description}
                    onChange={(e) =>
                      handleBasicInfoChange("description", e.target.value)
                    }
                    placeholder="Describe your hostel..."
                    rows={4}
                    className="w-full px-4 py-2.5 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                  />
                </div>

                {/* Location Section */}
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-accent" />
                    Location Details
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Address */}
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={basicInfo.address}
                        onChange={(e) =>
                          handleBasicInfoChange("address", e.target.value)
                        }
                        placeholder="Street address"
                        className="w-full px-4 py-2.5 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                      />
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={basicInfo.city}
                        onChange={(e) =>
                          handleBasicInfoChange("city", e.target.value)
                        }
                        placeholder="City"
                        className="w-full px-4 py-2.5 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                      />
                    </div>

                    {/* State */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1">
                        State <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={basicInfo.state}
                        onChange={(e) =>
                          handleBasicInfoChange("state", e.target.value)
                        }
                        placeholder="State"
                        className="w-full px-4 py-2.5 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                      />
                    </div>

                    {/* Pincode */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-1">
                        Pincode <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={basicInfo.pincode}
                        onChange={(e) =>
                          handleBasicInfoChange("pincode", e.target.value)
                        }
                        placeholder="Pincode"
                        className="w-full px-4 py-2.5 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                      />
                    </div>

                    {/* Latitude */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Latitude</label>
                      <input
                        type="text"
                        value={basicInfo.latitude}
                        onChange={(e) =>
                          handleBasicInfoChange("latitude", e.target.value)
                        }
                        placeholder="e.g., 28.7041"
                        className="w-full px-4 py-2.5 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                      />
                    </div>

                    {/* Longitude */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Longitude</label>
                      <input
                        type="text"
                        value={basicInfo.longitude}
                        onChange={(e) =>
                          handleBasicInfoChange("longitude", e.target.value)
                        }
                        placeholder="e.g., 77.1025"
                        className="w-full px-4 py-2.5 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleSaveBasicInfo}
                    className="bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg transition-all"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save & Continue
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* FACILITIES TAB */}
            <TabsContent value="facilities" className="space-y-6 mt-0">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Hostel Facilities
                </h2>

                {/* Multi-select dropdown */}
                <select
                  className="w-full px-4 py-2.5 border border-input rounded-lg"
                  onChange={(e) => {
                    const id = Number(e.target.value);
                    if (!selectedFacilities.includes(id)) {
                      setSelectedFacilities((prev) => [...prev, id]);
                    }
                  }}
                  value=""
                >
                  <option value="">Select a facility</option>
                  {allFacilities.map((facility) => (
                    <option key={facility.id} value={facility.id}>
                      {facility.name}
                    </option>
                  ))}
                </select>

                {/* Selected facilities as chips */}
                {selectedFacilities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedFacilities.map((id) => {
                      const facility = allFacilities.find((f) => f.id === id);
                      return (
                        <Badge
                          key={id}
                          className="px-3 py-1.5 bg-primary/10 text-primary border border-primary/20"
                        >
                          {facility?.name}
                          <button
                            onClick={() =>
                              setSelectedFacilities((prev) =>
                                prev.filter((fid) => fid !== id)
                              )
                            }
                            className="ml-2 hover:text-red-600"
                          >
                            ×
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleSaveFacilities}
                    className="bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg transition-all"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save & Continue
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* IMAGES TAB */}
            <TabsContent value="images" className="space-y-6 mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    Hostel Images
                  </h2>
                  <Button
                    onClick={handleAddImage}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Image
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {images.map((image, index) => (
                    <Card
                      key={index}
                      className="border-2 border-dashed border-primary/30 hover:border-primary/60 transition-all"
                    >
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            Image {index + 1}
                          </span>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleRemoveImage(index)}
                            className="h-8 w-8 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <label className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-all bg-gray-50 hover:bg-gray-100">
                            {image.preview ? (
                              <img
                                src={image.preview}
                                alt="Preview"
                                className="h-full w-full object-cover rounded-lg"
                              />
                            ) : (
                              <div className="flex flex-col items-center">
                                <Upload className="h-8 w-8 text-gray-400" />
                                <span className="mt-2 text-sm text-gray-500">
                                  Upload Image
                                </span>
                              </div>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(index, file);
                              }}
                            />
                          </label>

                          <input
                            type="text"
                            value={image.caption}
                            onChange={(e) =>
                              setImages((prev) =>
                                prev.map((img, i) =>
                                  i === index
                                    ? { ...img, caption: e.target.value }
                                    : img
                                )
                              )
                            }
                            placeholder="Image caption (optional)"
                            className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-sm"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {images.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/10">
                    <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">No images added yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Click "Add Image" to upload hostel photos
                    </p>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleSaveImages}
                    className="bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg transition-all"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isEditMode ? "Save Images" : "Save & Continue"}
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* ROOMS TAB */}
            <TabsContent value="rooms" className="space-y-6 mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Bed className="h-5 w-5 text-primary" />
                    Room Details
                  </h2>
                  <Button
                    onClick={handleAddRoom}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Room
                  </Button>
                </div>

                <div className="space-y-4">
                  {rooms.map((room, index) => (
                    <Card
                      key={index}
                      className="border-2 border-primary/20 shadow-md"
                    >
                      <CardHeader className="bg-primary/5 border-b">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">
                            Room {index + 1}
                          </CardTitle>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleRemoveRoom(index)}
                            className="h-8 w-8 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Room Number
                            </label>
                            <input
                              type="text"
                              value={room.roomNumber}
                              onChange={(e) =>
                                setRooms((prev) =>
                                  prev.map((r, i) =>
                                    i === index
                                      ? { ...r, roomNumber: e.target.value }
                                      : r
                                  )
                                )
                              }
                              placeholder="e.g., 101"
                              className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Room Type
                            </label>
                            <select
                              value={room.roomType}
                              onChange={(e) =>
                                setRooms((prev) =>
                                  prev.map((r, i) =>
                                    i === index
                                      ? { ...r, roomType: e.target.value }
                                      : r
                                  )
                                )
                              }
                              className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none capitalize"
                            >
                              <option value="single">Single</option>
                              <option value="double">Double</option>
                              <option value="triple">Triple</option>
                              <option value="dormitory">Dormitory</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Capacity
                            </label>
                            <input
                              type="number"
                              value={room.capacity}
                              onChange={(e) =>
                                setRooms((prev) =>
                                  prev.map((r, i) =>
                                    i === index
                                      ? { ...r, capacity: e.target.value }
                                      : r
                                  )
                                )
                              }
                              placeholder="Number of beds"
                              className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Monthly Price (₹)
                            </label>
                            <input
                              type="number"
                              value={room.monthlyPrice}
                              onChange={(e) =>
                                setRooms((prev) =>
                                  prev.map((r, i) =>
                                    i === index
                                      ? { ...r, monthlyPrice: e.target.value }
                                      : r
                                  )
                                )
                              }
                              placeholder="Monthly rent"
                              className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-medium">
                              Daily Price (₹)
                            </label>
                            <input
                              type="number"
                              value={room.dailyPrice}
                              onChange={(e) =>
                                setRooms((prev) =>
                                  prev.map((r, i) =>
                                    i === index
                                      ? { ...r, dailyPrice: e.target.value }
                                      : r
                                  )
                                )
                              }
                              placeholder="Daily rent"
                              className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                            />
                          </div>

                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={room.isAvailable}
                              onChange={(e) =>
                                setRooms((prev) =>
                                  prev.map((r, i) =>
                                    i === index
                                      ? { ...r, isAvailable: e.target.checked }
                                      : r
                                  )
                                )
                              }
                              className="h-4 w-4 accent-primary"
                            />
                            <label className="text-sm font-medium">
                              Room is Available
                            </label>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Description
                          </label>
                          <textarea
                            value={room.description}
                            onChange={(e) =>
                              setRooms((prev) =>
                                prev.map((r, i) =>
                                  i === index
                                    ? { ...r, description: e.target.value }
                                    : r
                                )
                              )
                            }
                            placeholder="Room description..."
                            rows={2}
                            className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                          />
                        </div>

                        {/* ROOM FACILITIES */}
                        <div className="space-y-3 pt-4 border-t">
                          <h4 className="font-semibold text-sm flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Room Facilities
                          </h4>

                          <select
                            className="w-full px-3 py-2 border border-input rounded-lg text-sm"
                            onChange={(e) => {
                              const facilityId = Number(e.target.value);
                              if (
                                facilityId &&
                                !room.facilities.includes(facilityId)
                              ) {
                                setRooms((prev) =>
                                  prev.map((r, i) =>
                                    i === index
                                      ? {
                                          ...r,
                                          facilities: [
                                            ...r.facilities,
                                            facilityId,
                                          ],
                                        }
                                      : r
                                  )
                                );
                              }
                              e.target.value = ""; // Reset select
                            }}
                          >
                            <option value="">Select a facility</option>
                            {allFacilities.map((facility) => (
                              <option key={facility.id} value={facility.id}>
                                {facility.name}
                              </option>
                            ))}
                          </select>

                          {room.facilities.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {room.facilities.map((facilityId) => {
                                const facility = allFacilities.find(
                                  (f) => f.id === facilityId
                                );
                                return (
                                  <Badge
                                    key={facilityId}
                                    variant="secondary"
                                    className="px-2 py-1 text-xs gap-1"
                                  >
                                    {facility?.name}
                                    <button
                                      onClick={() =>
                                        setRooms((prev) =>
                                          prev.map((r, i) =>
                                            i === index
                                              ? {
                                                  ...r,
                                                  facilities:
                                                    r.facilities.filter(
                                                      (id) => id !== facilityId
                                                    ),
                                                }
                                              : r
                                          )
                                        )
                                      }
                                      className="hover:text-red-600 ml-1"
                                    >
                                      ×
                                    </button>
                                  </Badge>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* ROOM IMAGES */}
                        <div className="space-y-3 pt-4 border-t">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm">
                              Room Images
                            </h4>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAddRoomImage(index)}
                            >
                              <Plus className="h-4 w-4 mr-1" />
                              Add Image
                            </Button>
                          </div>

                          <div className="grid md:grid-cols-2 gap-3">
                            {room.images.map((img, imgIndex) => (
                              <Card
                                key={imgIndex}
                                className="border-2 border-dashed border-primary/30"
                              >
                                <CardContent className="p-3 space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs font-medium">
                                      Image {imgIndex + 1}
                                    </span>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      onClick={() =>
                                        handleRemoveRoomImage(index, imgIndex)
                                      }
                                      className="h-7 w-7 text-red-600"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>

                                  <label className="flex items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:border-primary">
                                    {img.preview ? (
                                      <img
                                        src={img.preview}
                                        alt="Room Preview"
                                        className="h-full w-full object-cover rounded-lg"
                                      />
                                    ) : (
                                      <Upload className="h-6 w-6 text-muted-foreground" />
                                    )}
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file)
                                          handleRoomImageUpload(
                                            index,
                                            imgIndex,
                                            file
                                          );
                                      }}
                                    />
                                  </label>

                                  <input
                                    type="text"
                                    value={img.caption}
                                    onChange={(e) =>
                                      setRooms((prev) =>
                                        prev.map((r, i) =>
                                          i === index
                                            ? {
                                                ...r,
                                                images: r.images.map((im, j) =>
                                                  j === imgIndex
                                                    ? {
                                                        ...im,
                                                        caption: e.target.value,
                                                      }
                                                    : im
                                                ),
                                              }
                                            : r
                                        )
                                      )
                                    }
                                    placeholder="Image caption"
                                    className="w-full px-2 py-1 text-xs border rounded-lg"
                                  />
                                </CardContent>
                              </Card>
                            ))}
                          </div>

                          {room.images.length === 0 && (
                            <p className="text-xs text-muted-foreground">
                              No room images added
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {rooms.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/10">
                    <Bed className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">No rooms added yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Click "Add Room" to add room details
                    </p>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleSaveRooms}
                    className="bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg transition-all"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save & Continue
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* MESS MENU TAB */}
            <TabsContent value="mess" className="space-y-6 mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-primary" />
                    Mess Menu
                  </h2>
                  <Button
                    onClick={handleAddMessMenu}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Day Menu
                  </Button>
                </div>

                <div className="space-y-4">
                  {messMenus.map((menu, index) => (
                    <Card
                      key={index}
                      className="border-2 border-primary/20 shadow-md"
                    >
                      <CardHeader className="bg-primary/5 border-b">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <CardTitle className="text-lg">
                              Day {index + 1}
                            </CardTitle>
                            <select
                              value={menu.day}
                              onChange={(e) =>
                                setMessMenus((prev) =>
                                  prev.map((m, i) =>
                                    i === index
                                      ? { ...m, day: e.target.value }
                                      : m
                                  )
                                )
                              }
                              className="px-3 py-1.5 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-sm"
                            >
                              <option value="">Select Day</option>
                              <option value="Monday">Monday</option>
                              <option value="Tuesday">Tuesday</option>
                              <option value="Wednesday">Wednesday</option>
                              <option value="Thursday">Thursday</option>
                              <option value="Friday">Friday</option>
                              <option value="Saturday">Saturday</option>
                              <option value="Sunday">Sunday</option>
                            </select>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleRemoveMessMenu(index)}
                            className="h-8 w-8 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 space-y-4">
                        {/* Veg Menu */}
                        <div className="space-y-3 p-4 bg-green-50/50 rounded-lg border border-green-100">
                          <h4 className="font-semibold text-green-700 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-green-600"></span>
                            Vegetarian Menu
                          </h4>
                          <div className="grid md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-green-700">
                                Breakfast
                              </label>
                              <input
                                type="text"
                                value={menu.vegBreakfast}
                                onChange={(e) =>
                                  setMessMenus((prev) =>
                                    prev.map((m, i) =>
                                      i === index
                                        ? { ...m, vegBreakfast: e.target.value }
                                        : m
                                    )
                                  )
                                }
                                placeholder="e.g., Idli, Sambar"
                                className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-green-700">
                                Lunch
                              </label>
                              <input
                                type="text"
                                value={menu.vegLunch}
                                onChange={(e) =>
                                  setMessMenus((prev) =>
                                    prev.map((m, i) =>
                                      i === index
                                        ? { ...m, vegLunch: e.target.value }
                                        : m
                                    )
                                  )
                                }
                                placeholder="e.g., Rice, Dal, Sabzi"
                                className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-green-700">
                                Dinner
                              </label>
                              <input
                                type="text"
                                value={menu.vegDinner}
                                onChange={(e) =>
                                  setMessMenus((prev) =>
                                    prev.map((m, i) =>
                                      i === index
                                        ? { ...m, vegDinner: e.target.value }
                                        : m
                                    )
                                  )
                                }
                                placeholder="e.g., Roti, Paneer"
                                className="w-full px-3 py-2 border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none text-sm"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Non-Veg Menu */}
                        <div className="space-y-3 p-4 bg-orange-50/50 rounded-lg border border-orange-100">
                          <h4 className="font-semibold text-orange-700 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-orange-600"></span>
                            Non-Vegetarian Menu
                          </h4>
                          <div className="grid md:grid-cols-3 gap-3">
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-orange-700">
                                Breakfast
                              </label>
                              <input
                                type="text"
                                value={menu.nonVegBreakfast}
                                onChange={(e) =>
                                  setMessMenus((prev) =>
                                    prev.map((m, i) =>
                                      i === index
                                        ? {
                                            ...m,
                                            nonVegBreakfast: e.target.value,
                                          }
                                        : m
                                    )
                                  )
                                }
                                placeholder="e.g., Egg Curry"
                                className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-orange-700">
                                Lunch
                              </label>
                              <input
                                type="text"
                                value={menu.nonVegLunch}
                                onChange={(e) =>
                                  setMessMenus((prev) =>
                                    prev.map((m, i) =>
                                      i === index
                                        ? { ...m, nonVegLunch: e.target.value }
                                        : m
                                    )
                                  )
                                }
                                placeholder="e.g., Chicken Curry"
                                className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-sm"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-medium text-orange-700">
                                Dinner
                              </label>
                              <input
                                type="text"
                                value={menu.nonVegDinner}
                                onChange={(e) =>
                                  setMessMenus((prev) =>
                                    prev.map((m, i) =>
                                      i === index
                                        ? { ...m, nonVegDinner: e.target.value }
                                        : m
                                    )
                                  )
                                }
                                placeholder="e.g., Fish Fry"
                                className="w-full px-3 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all outline-none text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {messMenus.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/10">
                    <Utensils className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">
                      No mess menus added yet
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Click "Add Day Menu" to add daily meal plans
                    </p>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleSaveMessMenus}
                    className="bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg transition-all"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save & Continue
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* RULES TAB */}
            <TabsContent value="rules" className="space-y-6 mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <List className="h-5 w-5 text-primary" />
                    Hostel Rules
                  </h2>
                  <Button
                    onClick={handleAddRule}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Rule
                  </Button>
                </div>

                <div className="space-y-4">
                  {rules.map((rule, index) => (
                    <Card
                      key={index}
                      className="border-2 border-primary/20 shadow-md"
                    >
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex-1 space-y-3">
                            <div className="grid md:grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Rule Title
                                </label>
                                <input
                                  type="text"
                                  value={rule.title}
                                  onChange={(e) =>
                                    setRules((prev) =>
                                      prev.map((r, i) =>
                                        i === index
                                          ? { ...r, title: e.target.value }
                                          : r
                                      )
                                    )
                                  }
                                  placeholder="e.g., Visiting Hours"
                                  className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Rule Type
                                </label>
                                <select
                                  value={rule.ruleType}
                                  onChange={(e) =>
                                    setRules((prev) =>
                                      prev.map((r, i) =>
                                        i === index
                                          ? { ...r, ruleType: e.target.value }
                                          : r
                                      )
                                    )
                                  }
                                  className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none capitalize"
                                >
                                  <option value="general">General</option>
                                  <option value="safety">Safety</option>
                                  <option value="timings">Timings</option>
                                  <option value="behavior">Behavior</option>
                                </select>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium">
                                Description
                              </label>
                              <textarea
                                value={rule.description}
                                onChange={(e) =>
                                  setRules((prev) =>
                                    prev.map((r, i) =>
                                      i === index
                                        ? { ...r, description: e.target.value }
                                        : r
                                    )
                                  )
                                }
                                placeholder="Describe the rule..."
                                rows={2}
                                className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                              />
                            </div>
                          </div>

                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleRemoveRule(index)}
                            className="h-8 w-8 text-red-600 hover:bg-red-50 flex-shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {rules.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/10">
                    <List className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">No rules added yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Click "Add Rule" to define hostel rules
                    </p>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <Button
                    onClick={handleSaveRules}
                    className="bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg transition-all"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Rules
                  </Button>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
