import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin, UtensilsCrossed, Users } from 'lucide-react';
import { AddMessModal } from '@/components/Modals/AddMessModal';

const mockMessData = [
  {
    id: 1,
    name: 'Green Valley Mess',
    location: 'Pune, Maharashtra',
    capacity: 120,
    activeSubscribers: 95,
    occupancy: 79,
    status: 'active',
    mealTypes: ['Breakfast', 'Lunch', 'Dinner'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    name: 'Campus Mess',
    location: 'Mumbai, Maharashtra',
    capacity: 150,
    activeSubscribers: 142,
    occupancy: 95,
    status: 'active',
    mealTypes: ['Breakfast', 'Lunch', 'Dinner'],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop'
  },
  {
    id: 3,
    name: 'Healthy Bites Mess',
    location: 'Bangalore, Karnataka',
    capacity: 80,
    activeSubscribers: 65,
    occupancy: 81,
    status: 'active',
    mealTypes: ['Breakfast', 'Lunch', 'Dinner'],
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=250&fit=crop'
  },
];

export default function MessList() {
  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mess Management</h1>
          <p className="text-muted-foreground">Manage all your mess facilities</p>
        </div>
        <Button 
          onClick={() => setAddModalOpen(true)}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Mess
        </Button>
      </div>

      {/* Mess Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockMessData.map((mess) => (
          <Card key={mess.id} className="overflow-hidden hover-scale group">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={mess.image} 
                alt={mess.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <Badge className="absolute top-3 right-3 bg-success text-success-foreground">
                {mess.status}
              </Badge>
            </div>

            {/* Content */}
            <CardHeader>
              <CardTitle className="text-xl">{mess.name}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {mess.location}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <UtensilsCrossed className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Capacity</p>
                    <p className="font-semibold">{mess.capacity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Subscribers</p>
                    <p className="font-semibold">{mess.activeSubscribers}</p>
                  </div>
                </div>
              </div>

              {/* Meal Types */}
              <div className="flex flex-wrap gap-2">
                {mess.mealTypes.map((meal) => (
                  <Badge key={meal} variant="outline" className="text-xs">
                    {meal}
                  </Badge>
                ))}
              </div>

              {/* Occupancy Bar */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted-foreground">Occupancy</span>
                  <span className="font-semibold">{mess.occupancy}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-accent to-accent-light transition-all duration-300"
                    style={{ width: `${mess.occupancy}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1">View Details</Button>
                <Button variant="outline" className="flex-1">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddMessModal 
        open={addModalOpen} 
        onOpenChange={setAddModalOpen}
        onSuccess={() => {}}
      />
    </div>
  );
}
