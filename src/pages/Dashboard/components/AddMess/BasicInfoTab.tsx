import { MapPin, Building2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BasicInfo {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface BasicInfoTabProps {
  basicInfo: BasicInfo;
  handleBasicInfoChange: (field: string, value: string) => void;
  handleSaveBasicInfo: () => void;
}

export default function BasicInfoTab({
  basicInfo,
  handleBasicInfoChange,
  handleSaveBasicInfo,
}: BasicInfoTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            General Information
          </h2>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Mess Name *</label>
            <input
              type="text"
              value={basicInfo.name}
              onChange={(e) => handleBasicInfoChange("name", e.target.value)}
              placeholder="Enter mess name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              value={basicInfo.description}
              onChange={(e) => handleBasicInfoChange("description", e.target.value)}
              placeholder="Describe your mess..."
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Location Details
          </h2>

          <div className="space-y-2">
            <label className="text-sm font-medium">Address *</label>
            <input
              type="text"
              value={basicInfo.address}
              onChange={(e) => handleBasicInfoChange("address", e.target.value)}
              placeholder="Street address"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">City *</label>
              <input
                type="text"
                value={basicInfo.city}
                onChange={(e) => handleBasicInfoChange("city", e.target.value)}
                placeholder="City"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">State *</label>
              <input
                type="text"
                value={basicInfo.state}
                onChange={(e) => handleBasicInfoChange("state", e.target.value)}
                placeholder="State"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Pincode *</label>
            <input
              type="text"
              value={basicInfo.pincode}
              onChange={(e) => handleBasicInfoChange("pincode", e.target.value)}
              placeholder="6-digit pincode"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
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
  );
}
