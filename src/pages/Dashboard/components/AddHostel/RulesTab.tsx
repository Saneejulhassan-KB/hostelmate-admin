import { List, Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Rule {
  title: string;
  description: string;
  ruleType: string;
}

interface RulesTabProps {
  rules: Rule[];
  setRules: React.Dispatch<React.SetStateAction<Rule[]>>;
  handleAddRule: () => void;
  handleRemoveRule: (index: number) => void;
  handleSaveRules: () => void;
}

export default function RulesTab({
  rules,
  setRules,
  handleAddRule,
  handleRemoveRule,
  handleSaveRules,
}: RulesTabProps) {
  return (
    <div className="space-y-6 mt-0">
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
                        <label className="text-sm font-medium">Rule Type</label>
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
                      <label className="text-sm font-medium">Description</label>
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
    </div>
  );
}
