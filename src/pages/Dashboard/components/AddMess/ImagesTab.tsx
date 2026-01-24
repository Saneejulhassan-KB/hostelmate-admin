import { Image as ImageIcon, Plus, Trash2, Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface MessImage {
  file: File | null;
  preview: string;
  caption: string;
}

interface ImagesTabProps {
  images: MessImage[];
  setImages: React.Dispatch<React.SetStateAction<MessImage[]>>;
  handleAddImage: () => void;
  handleImageUpload: (index: number, file: File) => void;
  handleRemoveImage: (index: number) => void;
  handleSaveImages: () => void;
}

export default function ImagesTab({
  images,
  setImages,
  handleAddImage,
  handleImageUpload,
  handleRemoveImage,
  handleSaveImages,
}: ImagesTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          Mess Images
        </h2>
        <Button
          onClick={handleAddImage}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Image Slot
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <Card key={index} className="overflow-hidden border-2 border-primary/20 shadow-md group">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-muted flex items-center justify-center">
                {img.preview ? (
                  <img
                    src={img.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-xs text-muted-foreground">Click to upload image</p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(index, file);
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-3">
                <input
                  type="text"
                  value={img.caption}
                  onChange={(e) =>
                    setImages((prev) =>
                      prev.map((item, i) =>
                        i === index ? { ...item, caption: e.target.value } : item
                      )
                    )
                  }
                  placeholder="Image caption (e.g., Dining Area)"
                  className="w-full px-3 py-2 border rounded-lg text-sm outline-none"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg bg-muted/10">
          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No images added yet</p>
        </div>
      )}

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSaveImages}
          className="bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg transition-all"
        >
          <Save className="mr-2 h-4 w-4" />
          Save & Continue
        </Button>
      </div>
    </div>
  );
}
