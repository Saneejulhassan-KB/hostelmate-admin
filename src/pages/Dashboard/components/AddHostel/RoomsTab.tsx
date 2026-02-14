import {
  Bed,
  Plus,
  Trash2,
  Upload,
  Save,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Room {
  id?: string;
  roomNumber: string;
  roomType: string;
  capacity: string;
  monthlyPrice: string;
  dailyPrice: string;
  description: string;
  isAvailable: boolean;
  facilities: number[];
  images: {
    id?: string;
    file: File | null;
    caption: string;
    preview: string;
  }[];
  deletedImages?: string[];
  deletedFacilities?: number[];
}

interface RoomsTabProps {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
  allFacilities: { id: number; name: string }[];
  handleAddRoom: () => void;
  handleRemoveRoom: (index: number) => void;
  handleAddRoomImage: (roomIndex: number) => void;
  handleRoomImageUpload: (
    roomIndex: number,
    imageIndex: number,
    file: File
  ) => void;
  handleRemoveRoomImage: (roomIndex: number, imageIndex: number) => void;
  handleSaveRooms: () => void;
}

export default function RoomsTab({
  rooms,
  setRooms,
  allFacilities,
  handleAddRoom,
  handleRemoveRoom,
  handleAddRoomImage,
  handleRoomImageUpload,
  handleRemoveRoomImage,
  handleSaveRooms,
}: RoomsTabProps) {
  return (
    <div className="space-y-6 mt-0">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Bed className="h-5 w-5 text-primary" />
            Room Details
          </h2>
          <Button
            onClick={handleAddRoom}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Room
          </Button>
        </div>

        <div className="space-y-4">
          {rooms.map((room, index) => (
            <Card
              key={index}
              className="border-2 border-primary/20 shadow-md"
            >
              <CardHeader className="bg-primary/5 border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Room {index + 1}</CardTitle>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveRoom(index)}
                    className="h-8 w-8 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Room Number</label>
                    <input
                      type="text"
                      value={room.roomNumber}
                      onChange={(e) =>
                        setRooms((prev) =>
                          prev.map((r, i) =>
                            i === index
                              ? { ...r, roomNumber: e.target.value }
                              : r
                          )
                        )
                      }
                      placeholder="e.g., 101"
                      className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Room Type</label>
                    <select
                      value={room.roomType}
                      onChange={(e) =>
                        setRooms((prev) =>
                          prev.map((r, i) =>
                            i === index
                              ? { ...r, roomType: e.target.value }
                              : r
                          )
                        )
                      }
                      className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none capitalize"
                    >
                      <option value="single">Single</option>
                      <option value="double">Double</option>
                      <option value="triple">Triple</option>
                      <option value="dormitory">Dormitory</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Capacity</label>
                    <input
                      type="number"
                      value={room.capacity}
                      onChange={(e) =>
                        setRooms((prev) =>
                          prev.map((r, i) =>
                            i === index
                              ? { ...r, capacity: e.target.value }
                              : r
                          )
                        )
                      }
                      placeholder="Number of beds"
                      className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Monthly Price (₹)
                    </label>
                    <input
                      type="number"
                      value={room.monthlyPrice}
                      onChange={(e) =>
                        setRooms((prev) =>
                          prev.map((r, i) =>
                            i === index
                              ? { ...r, monthlyPrice: e.target.value }
                              : r
                          )
                        )
                      }
                      placeholder="Monthly rent"
                      className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Daily Price (₹)
                    </label>
                    <input
                      type="number"
                      value={room.dailyPrice}
                      onChange={(e) =>
                        setRooms((prev) =>
                          prev.map((r, i) =>
                            i === index
                              ? { ...r, dailyPrice: e.target.value }
                              : r
                          )
                        )
                      }
                      placeholder="Daily rent"
                      className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={room.isAvailable}
                      onChange={(e) =>
                        setRooms((prev) =>
                          prev.map((r, i) =>
                            i === index
                              ? { ...r, isAvailable: e.target.checked }
                              : r
                          )
                        )
                      }
                      className="h-4 w-4 accent-primary"
                    />
                    <label className="text-sm font-medium">
                      Room is Available
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    value={room.description}
                    onChange={(e) =>
                      setRooms((prev) =>
                        prev.map((r, i) =>
                          i === index
                            ? { ...r, description: e.target.value }
                            : r
                        )
                      )
                    }
                    placeholder="Room description..."
                    rows={2}
                    className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                  />
                </div>

                {/* ROOM FACILITIES */}
                <div className="space-y-3 pt-4 border-t">
                  <h4 className="font-semibold text-sm flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Room Facilities
                  </h4>

                  <select
                    className="w-full px-3 py-2 border border-input rounded-lg text-sm"
                    onChange={(e) => {
                      const facilityId = Number(e.target.value);
                      if (
                        facilityId &&
                        !room.facilities.includes(facilityId)
                      ) {
                        setRooms((prev) =>
                          prev.map((r, i) =>
                            i === index
                              ? {
                                  ...r,
                                  facilities: [...r.facilities, facilityId],
                                }
                              : r
                          )
                        );
                      }
                      e.target.value = ""; // Reset select
                    }}
                  >
                    <option value="">Select a facility</option>
                    {allFacilities.map((facility) => (
                      <option key={facility.id} value={facility.id}>
                        {facility.name}
                      </option>
                    ))}
                  </select>

                  {room.facilities.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {room.facilities.map((facilityId) => {
                        const facility = allFacilities.find(
                          (f) => f.id === facilityId
                        );
                        return (
                          <Badge
                            key={facilityId}
                            variant="secondary"
                            className="px-2 py-1 text-xs gap-1"
                          >
                            {facility?.name}
                            <button
                              onClick={() =>
                                setRooms((prev) =>
                                  prev.map((r, i) =>
                                    i === index
                                      ? {
                                          ...r,
                                          facilities: r.facilities.filter(
                                            (id) => id !== facilityId
                                          ),
                                          deletedFacilities: [
                                            ...(r.deletedFacilities || []),
                                            facilityId,
                                          ],
                                        }
                                      : r
                                  )
                                )
                              }
                              className="hover:text-red-600 ml-1"
                            >
                              ×
                            </button>
                          </Badge>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* ROOM IMAGES */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm">Room Images</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddRoomImage(index)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Image
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3">
                    {room.images.map((img, imgIndex) => (
                      <Card
                        key={imgIndex}
                        className="border-2 border-dashed border-primary/30"
                      >
                        <CardContent className="p-3 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium">
                              Image {imgIndex + 1}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                handleRemoveRoomImage(index, imgIndex);
                                if (img.id) {
                                  setRooms((prev) =>
                                    prev.map((r, i) =>
                                      i === index
                                        ? {
                                            ...r,
                                            deletedImages: [
                                              ...(r.deletedImages || []),
                                              img.id!,
                                            ],
                                          }
                                        : r
                                    )
                                  );
                                }
                              }}
                              className="h-7 w-7 text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <label className="flex items-center justify-center h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:border-primary">
                            {img.preview ? (
                              <img
                                src={img.preview}
                                alt="Room Preview"
                                className="h-full w-full object-cover rounded-lg"
                              />
                            ) : (
                              <Upload className="h-6 w-6 text-muted-foreground" />
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file)
                                  handleRoomImageUpload(
                                    index,
                                    imgIndex,
                                    file
                                  );
                              }}
                            />
                          </label>

                          <input
                            type="text"
                            value={img.caption}
                            onChange={(e) =>
                              setRooms((prev) =>
                                prev.map((r, i) =>
                                  i === index
                                    ? {
                                        ...r,
                                        images: r.images.map((im, j) =>
                                          j === imgIndex
                                            ? {
                                                ...im,
                                                caption: e.target.value,
                                              }
                                            : im
                                        ),
                                      }
                                    : r
                                )
                              )
                            }
                            placeholder="Image caption"
                            className="w-full px-2 py-1 text-xs border rounded-lg"
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {room.images.length === 0 && (
                    <p className="text-xs text-muted-foreground">
                      No room images added
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {rooms.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/10">
            <Bed className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No rooms added yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Click "Add Room" to add room details
            </p>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSaveRooms}
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
