import { hostelDetailDummyData as hostel } from "../../data/hostelDetailDummyData";
import {
  MapPin,
  Phone,
  Star,
  Wifi,
  ShieldCheck,
  Bed,
  Ruler,
  IndianRupee,
  Home,
  Building,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function HostelDetailPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* ===== Header ===== */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b pb-5">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-1">{hostel.name}</h1>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            <MapPin className="h-4 w-4 text-primary" />
            {hostel.address}, {hostel.city}, {hostel.state}
          </p>
          {/* <div className="flex items-center gap-2 mt-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-lg">4.6</span>
            <span className="text-muted-foreground text-sm">(256 reviews)</span>
          </div> */}
        </div>

        <div className="flex gap-2">
          <Button variant="outline">Edit Details</Button>
          <Button>Manage Hostel</Button>
        </div>
      </div>

      {/* ===== Image Gallery ===== */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Hostel Photos</h2>
        <div className="flex flex-wrap md:flex-nowrap gap-2 md:gap-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 pb-2">
          {hostel.images.map((img) => (
            <img
              key={img.id}
              src={img.image}
              alt={`Hostel ${img.id}`}
              className="w-28 h-24 sm:w-32 sm:h-28 lg:w-40 lg:h-32 object-cover rounded-lg border shadow-sm flex-shrink-0"
            />
          ))}
        </div>
      </section>

      {/* ===== Basic Info ===== */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
        <InfoCard icon={<Building />} label="Hostel Type" value={hostel.hostel_type} />
        <InfoCard icon={<MapPin />} label="City" value={hostel.city} />
        <InfoCard
          icon={<Calendar />}
          label="Created At"
          value={hostel.created_at}
        />
        {/* <InfoCard
          icon={<ShieldCheck />}
          label="Verification"
          value={
            hostel.is_verified ? (
              <span className="text-green-600 flex items-center gap-1">
                <CheckCircle className="h-4 w-4" /> Verified
              </span>
            ) : (
              <span className="text-red-500 flex items-center gap-1">
                <XCircle className="h-4 w-4" /> Not Verified
              </span>
            )
          }
        /> */}
      </section>

      {/* ===== Description ===== */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <Card>
          <CardContent className="p-5 text-sm text-muted-foreground leading-relaxed">
            {hostel.description}
          </CardContent>
        </Card>
      </section>

      {/* ===== Facilities & Rules ===== */}
      <section className="grid md:grid-cols-2 gap-5">
        <Card className="shadow-sm">
          <CardContent className="p-5">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Wifi className="h-5 w-5 text-primary" /> Facilities
            </h3>
            <ul className="grid grid-cols-2 gap-y-2 text-sm text-muted-foreground">
              {hostel.facilities.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span className="capitalize">{item.name.replace(/_/g, " ")}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-5">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" /> House Rules
            </h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              {hostel.rules.map((rule) => (
                <li key={rule.id}>{rule.title}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* ===== Rooms Section ===== */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Rooms</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hostel.rooms.map((room) => (
            <Card key={room.id} className="hover:shadow-md transition-all border">
              <CardContent className="p-0">
                {room.images && room.images.length > 0 ? (
                  <img
                    src={room.images[0].image}
                    alt={room.room_type}
                    className="w-full h-36 object-cover rounded-t-md"
                  />
                ) : (
                  <div className="w-full h-36 bg-muted flex items-center justify-center text-xs text-muted-foreground rounded-t-md">
                    No Image
                  </div>
                )}
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold capitalize">
                      {room.room_type} Room
                    </h3>
                    <Badge
                      variant={room.is_available ? "default" : "secondary"}
                    >
                      {room.is_available ? "Available" : "Booked"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Capacity: {room.capacity} person(s)
                  </p>
                  <p className="flex items-center gap-1 text-sm font-medium text-primary">
                    <IndianRupee className="h-4 w-4" />
                    {room.monthly_price} / month
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {room.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== Mess Menu Section ===== */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Weekly Mess Menu</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hostel.mess_menus.map((menu) => (
            <Card key={menu.id} className="shadow-sm border">
              <CardContent className="p-4 text-sm space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-foreground">{menu.day}</h3>
                  <Badge variant="outline">{menu.created_at}</Badge>
                </div>

                <div>
                  <p className="font-medium text-foreground">Veg Menu</p>
                  <ul className="text-muted-foreground text-xs space-y-1 pl-3">
                    <li><b>Breakfast:</b> {menu.veg_menu.breakfast}</li>
                    <li><b>Lunch:</b> {menu.veg_menu.lunch}</li>
                    <li><b>Dinner:</b> {menu.veg_menu.dinner}</li>
                  </ul>
                </div>

                <div className="pt-2 border-t">
                  <p className="font-medium text-foreground">Non-Veg Menu</p>
                  <ul className="text-muted-foreground text-xs space-y-1 pl-3">
                    <li><b>Breakfast:</b> {menu.nonveg_menu.breakfast}</li>
                    <li><b>Lunch:</b> {menu.nonveg_menu.lunch}</li>
                    <li><b>Dinner:</b> {menu.nonveg_menu.dinner}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ===== Availability Summary ===== */}
      <section className="pt-4">
        <Card className="bg-primary/10 border-none">
          <CardContent className="p-5 text-center">
            <p className="text-lg font-semibold text-primary">
              Availability: {hostel.availability_summary}
            </p>
            <p className="text-sm text-muted-foreground">
              Total Rooms: {hostel.total_rooms_count} | Available:{" "}
              {hostel.available_rooms_count}
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="text-primary">{icon}</div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {label}
          </p>
          <p className="text-sm font-medium text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
