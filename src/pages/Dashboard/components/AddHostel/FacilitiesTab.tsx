import { CheckCircle2, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FacilitiesTabProps {
  allFacilities: { id: number; name: string }[];
  selectedFacilities: number[];
  setSelectedFacilities: React.Dispatch<React.SetStateAction<number[]>>;
  handleSaveFacilities: () => void;
}

export default function FacilitiesTab({
  allFacilities,
  selectedFacilities,
  setSelectedFacilities,
  handleSaveFacilities,
}: FacilitiesTabProps) {
  return (
    <div className="space-y-6 mt-0">
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
    </div>
  );
}
