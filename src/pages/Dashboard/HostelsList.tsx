import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, MapPin, Bed, Users } from 'lucide-react';
import { AddHostelModal } from '@/components/Modals/AddHostelModal';

const mockHostels = [
  {
    id: 1,
    name: 'Sunrise Hostel',
    location: 'Mumbai, Maharashtra',
    totalRooms: 45,
    availableRooms: 12,
    occupancy: 73,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    name: 'City Center PG',
    location: 'Pune, Maharashtra',
    totalRooms: 32,
    availableRooms: 8,
    occupancy: 75,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=250&fit=crop'
  },
  {
    id: 3,
    name: 'Metro Hostel',
    location: 'Delhi NCR',
    totalRooms: 58,
    availableRooms: 15,
    occupancy: 74,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&h=250&fit=crop'
  },
  {
    id: 4,
    name: 'Green Valley Hostel',
    location: 'Bangalore, Karnataka',
    totalRooms: 40,
    availableRooms: 5,
    occupancy: 87,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=250&fit=crop'
  },
];

export default function HostelsList() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Hostels Management</h1>
          <p className="text-muted-foreground">Manage all your hostel properties</p>
        </div>
        <Button 
          onClick={() => setAddModalOpen(true)}
          className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Hostel
        </Button>
      </div>

      {/* Hostels Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockHostels.map((hostel) => (
          <Card key={hostel.id} className="overflow-hidden hover-scale group">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={hostel.image} 
                alt={hostel.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <Badge 
                className="absolute top-3 right-3 bg-success text-success-foreground"
              >
                {hostel.status}
              </Badge>
            </div>

            {/* Content */}
            <CardHeader>
              <CardTitle className="text-xl">{hostel.name}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {hostel.location}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Total Rooms</p>
                    <p className="font-semibold">{hostel.totalRooms}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Available</p>
                    <p className="font-semibold">{hostel.availableRooms}</p>
                  </div>
                </div>
              </div>

              {/* Occupancy Bar */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-muted-foreground">Occupancy</span>
                  <span className="font-semibold">{hostel.occupancy}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                    style={{ width: `${hostel.occupancy}%` }}
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

      <AddHostelModal 
        open={addModalOpen} 
        onOpenChange={setAddModalOpen}
        onSuccess={() => {}}
      />
    </div>
  );
}
