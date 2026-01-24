import { List, Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface MealPlan {
  name: string;
  price: string;
  meals: string;
  features: string[];
}

interface MealPlansTabProps {
  mealPlans: MealPlan[];
  setMealPlans: React.Dispatch<React.SetStateAction<MealPlan[]>>;
  handleAddMealPlan: () => void;
  handleRemoveMealPlan: (index: number) => void;
  handleSaveMealPlans: () => void;
}

export default function MealPlansTab({
  mealPlans,
  setMealPlans,
  handleAddMealPlan,
  handleRemoveMealPlan,
  handleSaveMealPlans,
}: MealPlansTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <List className="h-5 w-5 text-primary" />
          Meal Plans
        </h2>
        <Button
          onClick={handleAddMealPlan}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Plan
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {mealPlans.map((plan, index) => (
          <Card key={index} className="border-2 border-primary/20 shadow-md">
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1 mr-4">
                  <input
                    type="text"
                    value={plan.name}
                    onChange={(e) =>
                      setMealPlans((prev) =>
                        prev.map((p, i) =>
                          i === index ? { ...p, name: e.target.value } : p
                        )
                      )
                    }
                    placeholder="Plan Name (e.g., Monthly Veg)"
                    className="w-full px-3 py-2 border rounded-lg font-semibold"
                  />
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleRemoveMealPlan(index)}
                  className="text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium">Price (₹)</label>
                  <input
                    type="text"
                    value={plan.price}
                    onChange={(e) =>
                      setMealPlans((prev) =>
                        prev.map((p, i) =>
                          i === index ? { ...p, price: e.target.value } : p
                        )
                      )
                    }
                    placeholder="2500"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium">Meals/Day</label>
                  <input
                    type="text"
                    value={plan.meals}
                    onChange={(e) =>
                      setMealPlans((prev) =>
                        prev.map((p, i) =>
                          i === index ? { ...p, meals: e.target.value } : p
                        )
                      )
                    }
                    placeholder="3"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium">Features (comma separated)</label>
                <input
                  type="text"
                  value={plan.features.join(", ")}
                  onChange={(e) =>
                    setMealPlans((prev) =>
                      prev.map((p, i) =>
                        i === index
                          ? {
                              ...p,
                              features: e.target.value
                                .split(",")
                                .map((f) => f.trim()),
                            }
                          : p
                      )
                    )
                  }
                  placeholder="Free Delivery, Sunday Special"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mealPlans.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/10">
          <List className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No meal plans added yet</p>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSaveMealPlans}
          className="bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg transition-all"
        >
          <Save className="mr-2 h-4 w-4" />
          Save & Continue
        </Button>
      </div>
    </div>
  );
}
