import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface AddMessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export const AddMessModal = ({ open, onOpenChange, onSuccess }: AddMessModalProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: '',
    mealTypes: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.capacity) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Mess added successfully!');
    setLoading(false);
    onOpenChange(false);
    setFormData({ name: '', location: '', capacity: '', mealTypes: '', description: '' });
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Mess</DialogTitle>
          <DialogDescription>Fill in the details to add a new mess facility</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="mess-name">Mess Name *</Label>
              <Input
                id="mess-name"
                placeholder="e.g., Green Valley Mess"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mess-location">Location *</Label>
              <Input
                id="mess-location"
                placeholder="e.g., Pune, Maharashtra"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Seating Capacity *</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="e.g., 100"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mealTypes">Meal Types</Label>
              <Input
                id="mealTypes"
                placeholder="e.g., Breakfast, Lunch, Dinner"
                value={formData.mealTypes}
                onChange={(e) => setFormData({ ...formData, mealTypes: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mess-description">Description</Label>
            <Textarea
              id="mess-description"
              placeholder="Describe your mess facility..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-gradient-to-r from-primary to-accent">
              {loading ? 'Adding...' : 'Add Mess'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
