import { useState } from "react";
import { supabase } from "../config/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

export default function UploadFile() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setUploading(true);

    const filePath = `uploads/${file.name}`; // Store inside the uploads folder

    const { error } = await supabase.storage
      .from("files") // Change "files" if your bucket name is different
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error("Upload error:", error.message);
      alert("Upload failed!");
    } else {
      const publicUrl = supabase.storage.from("files").getPublicUrl(filePath)
        .data.publicUrl;
      setUploadedUrl(publicUrl);
      alert("Upload successful!");
    }

    setUploading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Upload a File</h2>
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={uploadFile} disabled={uploading} className="mt-4">
        {uploading ? (
          "Uploading..."
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" /> Upload
          </>
        )}
      </Button>

      {uploadedUrl && (
        <p className="mt-4">
          <strong>Uploaded File:</strong>{" "}
          <a
            href={uploadedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {uploadedUrl}
          </a>
        </p>
      )}
    </div>
  );
}
