import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Building2,
  Image as ImageIcon,
  Bed,
  Utensils,
  List,
  Save,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { facilityService, hostelService } from "@/services/api";
import BasicInfoTab from "./components/AddHostel/BasicInfoTab";
import FacilitiesTab from "./components/AddHostel/FacilitiesTab";
import ImagesTab from "./components/AddHostel/ImagesTab";
import RoomsTab from "./components/AddHostel/RoomsTab";
import MessMenuTab from "./components/AddHostel/MessMenuTab";
import RulesTab from "./components/AddHostel/RulesTab";
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
          if (data.hostel_facilities) {
            setSelectedFacilities(
              data.hostel_facilities.map((hf: any) => hf.facility.id)
            );
          }

          // Populate Images
          if (data.images) {
            setImages(
              data.images.map((img: any) => ({
                file: null,
                caption: img.caption || "",
                preview: img.image,
                id: img.id, // Keep ID for reference if needed
              }))
            );
          }

          // Populate Rooms
          if (data.rooms) {
            setRooms(
              data.rooms.map((room: any) => ({
                roomNumber: room.room_number,
                roomType: room.room_type,
                capacity: room.capacity?.toString() || "",
                monthlyPrice: room.monthly_price?.toString() || "",
                dailyPrice: room.daily_price?.toString() || "",
                description: room.description,
                isAvailable: room.is_available,
                facilities: room.facilities
                  ? room.facilities.map((f: any) => Number(f.id))
                  : [],
                images: room.images
                  ? room.images.map((img: any) => ({
                      file: null,
                      caption: "",
                      preview: img.image,
                    }))
                  : [],
              }))
            );
          }

          // Populate Mess Menus
          if (data.mess_menus) {
            setMessMenus(
              data.mess_menus.map((menu: any) => ({
                day: menu.day,
                vegBreakfast: menu.veg_menu?.breakfast || "",
                vegLunch: menu.veg_menu?.lunch || "",
                vegDinner: menu.veg_menu?.dinner || "",
                nonVegBreakfast: menu.nonveg_menu?.breakfast || "",
                nonVegLunch: menu.nonveg_menu?.lunch || "",
                nonVegDinner: menu.nonveg_menu?.dinner || "",
              }))
            );
          }

          // Populate Rules
          if (data.rules) {
            setRules(
              data.rules.map((rule: any) => ({
                title: rule.title,
                description: rule.description,
                ruleType: rule.rule_type,
              }))
            );
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
      if (!window.confirm("Are you sure you want to delete this image?"))
        return;
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

  const handleSubmitAll = async () => {
    try {
      // ✅ Validation
      if (!basicInfo.name || !basicInfo.address) {
        toast.error("Basic information is incomplete");
        return;
      }

      if (selectedFacilities.length === 0) {
        toast.error("Please select at least one facility");
        return;
      }

      // ✅ STEP 1: Create Hostel (JSON)
      const hostelPayload = {
        name: basicInfo.name,
        description: basicInfo.description,
        hostel_type: basicInfo.hostelType.toLowerCase(),
        address: basicInfo.address,
        city: basicInfo.city,
        state: basicInfo.state,
        pincode: basicInfo.pincode,
        latitude: basicInfo.latitude ? Number(basicInfo.latitude) : undefined,
        longitude: basicInfo.longitude
          ? Number(basicInfo.longitude)
          : undefined,

        hostel_facilities: selectedFacilities.map((id) => ({
          facility_id: id,
        })),

        rules: rules.map((r) => ({
          title: r.title,
          description: r.description,
        })),
      };

      const createdHostel = await hostelService.createHostel(hostelPayload);

      // ✅ STEP 2: Upload Hostel Images
      for (const img of images) {
        if (!img.file) continue;

        const fd = new FormData();
        fd.append("image", img.file);
        fd.append("caption", img.caption || "");

        await hostelService.uploadHostelImage(createdHostel.id, fd);
      }

      toast.success("Hostel created successfully!");
      navigate("/dashboard/hostels");
    } catch (error: any) {
      console.error(error);

      if (error?.response?.data) {
        console.error("Backend errors:", error.response.data);
        toast.error("Validation error from server");
      } else {
        toast.error("Failed to create hostel");
      }
    }
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
              {isEditMode
                ? "Update the details of your hostel property"
                : "Fill in the details to register a new hostel property"}
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
            <BasicInfoTab
              basicInfo={basicInfo}
              handleBasicInfoChange={handleBasicInfoChange}
              handleSaveBasicInfo={handleSaveBasicInfo}
            />
            </TabsContent>

            {/* FACILITIES TAB */}
            <TabsContent value="facilities" className="space-y-6 mt-0">
            <FacilitiesTab
              allFacilities={allFacilities}
              selectedFacilities={selectedFacilities}
              setSelectedFacilities={setSelectedFacilities}
              handleSaveFacilities={handleSaveFacilities}
            />
            </TabsContent>

            {/* IMAGES TAB */}
            <TabsContent value="images" className="space-y-6 mt-0">
            <ImagesTab
              images={images}
              setImages={setImages}
              handleAddImage={handleAddImage}
              handleImageUpload={handleImageUpload}
              handleRemoveImage={handleRemoveImage}
              handleSaveImages={handleSaveImages}
              isEditMode={isEditMode}
            />
            </TabsContent>

            {/* ROOMS TAB */}
            <TabsContent value="rooms" className="space-y-6 mt-0">
            <RoomsTab
              rooms={rooms}
              setRooms={setRooms}
              allFacilities={allFacilities}
              handleAddRoom={handleAddRoom}
              handleRemoveRoom={handleRemoveRoom}
              handleAddRoomImage={handleAddRoomImage}
              handleRoomImageUpload={handleRoomImageUpload}
              handleRemoveRoomImage={handleRemoveRoomImage}
              handleSaveRooms={handleSaveRooms}
            />
            </TabsContent>

            {/* MESS MENU TAB */}
            <TabsContent value="mess" className="space-y-6 mt-0">
            <MessMenuTab
              messMenus={messMenus}
              setMessMenus={setMessMenus}
              handleAddMessMenu={handleAddMessMenu}
              handleRemoveMessMenu={handleRemoveMessMenu}
              handleSaveMessMenus={handleSaveMessMenus}
            />
            </TabsContent>

            {/* RULES TAB */}
            <TabsContent value="rules" className="space-y-6 mt-0">
            <RulesTab
              rules={rules}
              setRules={setRules}
              handleAddRule={handleAddRule}
              handleRemoveRule={handleRemoveRule}
              handleSaveRules={handleSaveRules}
            />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
}
