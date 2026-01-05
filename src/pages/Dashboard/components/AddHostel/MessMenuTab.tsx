import { Utensils, Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface MessMenu {
  day: string;
  vegBreakfast: string;
  vegLunch: string;
  vegDinner: string;
  nonVegBreakfast: string;
  nonVegLunch: string;
  nonVegDinner: string;
}

interface MessMenuTabProps {
  messMenus: MessMenu[];
  setMessMenus: React.Dispatch<React.SetStateAction<MessMenu[]>>;
  handleAddMessMenu: () => void;
  handleRemoveMessMenu: (index: number) => void;
  handleSaveMessMenus: () => void;
}

export default function MessMenuTab({
  messMenus,
  setMessMenus,
  handleAddMessMenu,
  handleRemoveMessMenu,
  handleSaveMessMenus,
}: MessMenuTabProps) {
  return (
    <div className="space-y-6 mt-0">
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
                    <CardTitle className="text-lg">Day {index + 1}</CardTitle>
                    <select
                      value={menu.day}
                      onChange={(e) =>
                        setMessMenus((prev) =>
                          prev.map((m, i) =>
                            i === index ? { ...m, day: e.target.value } : m
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
            <p className="text-muted-foreground">No mess menus added yet</p>
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
    </div>
  );
}
