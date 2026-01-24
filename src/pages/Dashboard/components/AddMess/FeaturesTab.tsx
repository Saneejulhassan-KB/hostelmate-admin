import { CheckCircle2, Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Feature {
  title: string;
  description: string;
}

interface FeaturesTabProps {
  features: Feature[];
  setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
  handleAddFeature: () => void;
  handleRemoveFeature: (index: number) => void;
  handleSaveFeatures: () => void;
}

export default function FeaturesTab({
  features,
  setFeatures,
  handleAddFeature,
  handleRemoveFeature,
  handleSaveFeatures,
}: FeaturesTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          Mess Features
        </h2>
        <Button
          onClick={handleAddFeature}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Feature
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="border-2 border-primary/20 shadow-md">
            <CardContent className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div className="space-y-3 flex-1 mr-4">
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) =>
                      setFeatures((prev) =>
                        prev.map((f, i) =>
                          i === index ? { ...f, title: e.target.value } : f
                        )
                      )
                    }
                    placeholder="Feature Title (e.g., Hygienic Kitchen)"
                    className="w-full px-3 py-2 border rounded-lg font-medium"
                  />
                  <textarea
                    value={feature.description}
                    onChange={(e) =>
                      setFeatures((prev) =>
                        prev.map((f, i) =>
                          i === index ? { ...f, description: e.target.value } : f
                        )
                      )
                    }
                    placeholder="Brief description..."
                    rows={2}
                    className="w-full px-3 py-2 border rounded-lg text-sm resize-none"
                  />
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleRemoveFeature(index)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {features.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/10">
          <CheckCircle2 className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No features added yet</p>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSaveFeatures}
          className="bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg transition-all"
        >
          <Save className="mr-2 h-4 w-4" />
          Save & Continue
        </Button>
      </div>
    </div>
  );
}
