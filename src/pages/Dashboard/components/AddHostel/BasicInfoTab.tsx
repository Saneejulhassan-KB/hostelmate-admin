import { Building2, MapPin, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BasicInfoTabProps {
  basicInfo: {
    name: string;
    description: string;
    hostelType: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    // latitude: string;
    // longitude: string;
  };
  handleBasicInfoChange: (field: string, value: string) => void;
  handleSaveBasicInfo: () => void;
}

export default function BasicInfoTab({
  basicInfo,
  handleBasicInfoChange,
  handleSaveBasicInfo,
}: BasicInfoTabProps) {
  return (
    <div className="space-y-6 mt-0">
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
              onChange={(e) => handleBasicInfoChange("name", e.target.value)}
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
                onChange={(e) => handleBasicInfoChange("city", e.target.value)}
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
                onChange={(e) => handleBasicInfoChange("state", e.target.value)}
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
            {/* <div className="space-y-2">
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
            </div> */}

            {/* Longitude */}
            {/* <div className="space-y-2">
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
            </div> */}
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
    </div>
  );
}
