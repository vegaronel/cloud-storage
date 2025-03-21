import { useState, useEffect } from "react";
import { supabase } from "../config/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { File, Download } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component

type File = {
  name: string;
  url: string;
  metadata: {
    size: number;
    mimetype: string;
  };
};

export default function MyFiles() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase.storage
        .from("images")
        .list(`${user.id}/`);

      if (data) {
        // Construct the full public URL for each file
        const filesWithUrl: any = data.map((file) => ({
          name: file.name,
          url: `https://xxiwuhcamidoadfkamrs.supabase.co/storage/v1/object/public/images/${user.id}/${file.name}`,
          metadata: file.metadata,
        }));
        setFiles(filesWithUrl);
      } else {
        console.error("Error fetching files:", error);
      }
      setLoading(false);
    };

    fetchFiles();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <div className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-2">
            {/* Skeleton Loading State */}
            {[...Array(20)].map((_, index) => (
              <Card key={index} className="border rounded-lg p-1">
                <CardContent className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-12 w-12 rounded" />{" "}
                    {/* Image Skeleton */}
                    <Skeleton className="h-4 w-[100px]" />{" "}
                    {/* File Name Skeleton */}
                  </div>
                  <Skeleton className="h-8 w-8 rounded" />{" "}
                  {/* Button Skeleton */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mt-4">
        {files.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-2">
            {files.map((file) => (
              <Card key={file.name} className="border rounded-lg p-1">
                <CardContent className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {file.metadata.mimetype.startsWith("image/") ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded">
                        <File className="w-8 h-8 text-gray-500" />
                      </div>
                    )}
                    <p className="mt-2 text-sm truncate">{file.name}</p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(file.url, "_blank")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No files found.</p>
        )}
      </div>
    </div>
  );
}
