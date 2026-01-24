import { Truck, Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DeliveryAreasTabProps {
  deliveryAreas: string[];
  setDeliveryAreas: React.Dispatch<React.SetStateAction<string[]>>;
  handleSaveDeliveryAreas: () => void;
}

export default function DeliveryAreasTab({
  deliveryAreas,
  setDeliveryAreas,
  handleSaveDeliveryAreas,
}: DeliveryAreasTabProps) {
  const [newArea, setNewArea] = React.useState("");

  const handleAddArea = () => {
    if (newArea.trim()) {
      setDeliveryAreas((prev) => [...new Set([...prev, newArea.trim()])]);
      setNewArea("");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Truck className="h-5 w-5 text-primary" />
          Delivery Areas
        </h2>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddArea()}
            placeholder="Enter area name..."
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none transition-all"
          />
          <Button onClick={handleAddArea} className="bg-primary text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Area
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 p-4 border-2 border-dashed rounded-lg min-h-[100px]">
          {deliveryAreas.map((area, index) => (
            <Badge
              key={index}
              className="px-3 py-1.5 bg-primary/10 text-primary border-primary/20 flex items-center gap-2 text-sm"
            >
              {area}
              <Trash2
                className="h-3 w-3 cursor-pointer hover:text-red-600"
                onClick={() =>
                  setDeliveryAreas((prev) => prev.filter((_, i) => i !== index))
                }
              />
            </Badge>
          ))}
          {deliveryAreas.length === 0 && (
            <p className="text-muted-foreground text-sm w-full text-center py-4">
              No delivery areas added yet.
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSaveDeliveryAreas}
          className="bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg transition-all"
        >
          <Save className="mr-2 h-4 w-4" />
          Save & Continue
        </Button>
      </div>
    </div>
  );
}

import React from "react";
