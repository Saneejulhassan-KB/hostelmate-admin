import { Image as ImageIcon, Plus, Trash2, Upload, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ImagesTabProps {
  images: { file: File | null; caption: string; preview: string; id?: string }[];
  setImages: React.Dispatch<
    React.SetStateAction<
      { file: File | null; caption: string; preview: string; id?: string }[]
    >
  >;
  handleAddImage: () => void;
  handleImageUpload: (index: number, file: File) => void;
  handleRemoveImage: (index: number) => void;
  handleSaveImages: () => void;
  isEditMode: boolean;
}

export default function ImagesTab({
  images,
  setImages,
  handleAddImage,
  handleImageUpload,
  handleRemoveImage,
  handleSaveImages,
  isEditMode,
}: ImagesTabProps) {
  return (
    <div className="space-y-6 mt-0">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            Hostel Images
          </h2>
          <Button
            onClick={handleAddImage}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Image
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <Card
              key={index}
              className="border-2 border-dashed border-primary/30 hover:border-primary/60 transition-all"
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Image {index + 1}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveImage(index)}
                    className="h-8 w-8 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-all bg-gray-50 hover:bg-gray-100">
                    {image.preview ? (
                      <img
                        src={image.preview}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="mt-2 text-sm text-gray-500">
                          Upload Image
                        </span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(index, file);
                      }}
                    />
                  </label>

                  <input
                    type="text"
                    value={image.caption}
                    onChange={(e) =>
                      setImages((prev) =>
                        prev.map((img, i) =>
                          i === index
                            ? { ...img, caption: e.target.value }
                            : img
                        )
                      )
                    }
                    placeholder="Image caption (optional)"
                    className="w-full px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-sm"
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
            <p className="text-sm text-muted-foreground mt-1">
              Click "Add Image" to upload hostel photos
            </p>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSaveImages}
            className="bg-gradient-to-r from-primary to-accent text-white shadow-md hover:shadow-lg transition-all"
          >
            <Save className="mr-2 h-4 w-4" />
            {isEditMode ? "Save Images" : "Save & Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
