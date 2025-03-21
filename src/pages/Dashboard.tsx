import { useState, useEffect } from "react";
import { supabase } from "../config/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadCloud } from "lucide-react";

// Define types
type User = {
  id: string;
};

type Image = {
  name: string;
  url: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [progress, setProgress] = useState<number>(0); // State for upload progress
  const [storageUsed, setStorageUsed] = useState<number>(0); // State for storage used (in bytes)
  const [storageLimit, setStorageLimit] = useState<number>(50 * 1024 * 1024); // 50MB in bytes

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user as User);
      }
    };

    fetchUser();
  }, []);

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;

    const file = e.target.files?.[0];
    if (!file) return;

    // Check if the file size exceeds the remaining storage space
    if (file.size + storageUsed > storageLimit) {
      alert("Upload failed: Exceeds storage limit (50MB)");
      return;
    }

    const fileName = crypto.randomUUID(); // Use crypto.randomUUID()

    // Simulate upload progress (for demonstration purposes)
    let simulatedProgress = 0;
    const interval = setInterval(() => {
      simulatedProgress += 10;
      setProgress(simulatedProgress);
      if (simulatedProgress >= 100) clearInterval(interval);
    }, 300);

    const { data, error } = await supabase.storage
      .from("images")
      .upload(`${user.id}/${fileName}`, file);

    clearInterval(interval); // Stop the progress simulation
    setProgress(100); // Set progress to 100% when upload is complete

    if (data) {
      console.log("File uploaded successfully:", data);
      getImages();
      getStorageUsage(); // Update storage usage after upload
    } else {
      console.error("Upload error:", error);
      setProgress(0); // Reset progress on error
    }
  };

  const getImages = async () => {
    if (!user) return;

    const { data, error } = await supabase.storage
      .from("images")
      .list(`${user.id}/`);

    if (data) {
      // Construct the full public URL for each image
      const imagesWithUrl = data.map((image) => ({
        ...image,
        url: `https://xxiwuhcamidoadfkamrs.supabase.co/storage/v1/object/public/images/${user.id}/${image.name}`,
      }));
      setImages(imagesWithUrl);
    } else {
      console.error("Error fetching images:", error);
    }
  };

  const getStorageUsage = async () => {
    if (!user) return 0;

    const { data, error } = await supabase.storage
      .from("images")
      .list(`${user.id}/`);

    if (data) {
      // Calculate the total size of all files
      const totalSize = data.reduce(
        (acc, file) => acc + (file.metadata?.size || 0),
        0
      );
      setStorageUsed(totalSize); // Update storage used
    } else {
      console.error("Error fetching storage usage:", error);
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${
      sizes[i]
    }`;
  };

  useEffect(() => {
    getImages();
    getStorageUsage();
  }, [user]);

  const storagePercentage = (storageUsed / storageLimit) * 100;

  return (
    <div className="">
      {/* Main Content */}
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Storage Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Storage Used</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={storagePercentage} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                {formatBytes(storageUsed)} of {formatBytes(storageLimit)} used
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Files</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {images.length > 0 ? (
                images.map((image) => (
                  <div key={image.name} className="flex items-center gap-2">
                    <img
                      src={image.url} // Use the full public URL
                      alt={image.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <p>{image.name}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No recent files</p>
              )}
            </CardContent>
          </Card>
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                className="w-full flex items-center gap-2"
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <UploadCloud className="w-4 h-4" /> Upload File
              </Button>
              <input
                id="file-input"
                type="file"
                style={{ display: "none" }}
                onChange={uploadImage}
              />
              {/* Progress Bar */}
              {progress > 0 && progress < 100 && (
                <Progress value={progress} className="h-2" />
              )}
              {progress === 100 && (
                <p className="text-sm text-green-500">Upload complete!</p>
              )}
              {/* <Button
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <Folder className="w-4 h-4" /> Create Folder
              </Button> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
