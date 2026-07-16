"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";

interface UploadedImage {
  id: string;
  url: string;
  uploading: boolean;
}

export default function ImageUploader({
  name = "image",
  initialUrls = [],
}: {
  name?: string;
  initialUrls?: string[];
}) {
  const [images, setImages] = useState<UploadedImage[]>(
    initialUrls.map((url) => ({
      id: crypto.randomUUID(),
      url,
      uploading: false,
    }))
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  async function uploadFile(file: File) {
    const tempId = crypto.randomUUID();

    setImages((prev) => [...prev, { id: tempId, url: "", uploading: true }]);

    try {
      if (!apiKey) {
        throw new Error("Missing NEXT_PUBLIC_IMGBB_API_KEY");
      }

      const body = new FormData();
      body.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body,
        }
      );

      const data = await res.json();

      if (!res.ok || !data?.data?.url) {
        throw new Error(data?.error?.message || "Upload failed");
      }

      setImages((prev) =>
        prev.map((img) =>
          img.id === tempId
            ? { ...img, url: data.data.url, uploading: false }
            : img
        )
      );
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Failed to upload image"
      );
      setImages((prev) => prev.filter((img) => img.id !== tempId));
    }
  }

  function handleFilesSelected(fileList: FileList | null) {
    if (!fileList) return;
    Array.from(fileList).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`);
        return;
      }
      uploadFile(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeImage(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  const urls = images.filter((img) => !img.uploading).map((img) => img.url);
  const isUploading = images.some((img) => img.uploading);

  return (
    <div className="flex flex-col gap-3">
      {/* hidden field carrying comma-separated URLs for the server action */}
      <input type="hidden" name={name} value={urls.join(",")} />

      <div className="flex flex-wrap gap-3">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative w-24 h-24 rounded-lg overflow-hidden border border-border bg-surface2 shrink-0"
          >
            {img.uploading ? (
              <div className="w-full h-full flex items-center justify-center">
                <span className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(img.id)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white text-xs flex items-center justify-center hover:bg-red-500 transition-colors"
                  aria-label="Remove image"
                >
                  ×
                </button>
              </>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-24 h-24 rounded-lg border border-dashed border-border text-text3 hover:border-accent hover:text-accent transition-colors flex flex-col items-center justify-center gap-1 shrink-0"
        >
          <span className="text-xl leading-none">+</span>
          <span className="text-[10px] font-mono">Add</span>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFilesSelected(e.target.files)}
        className="hidden"
      />

      <p className="text-[11px] text-text3">
        {isUploading
          ? "Uploading..."
          : `${urls.length} image${urls.length === 1 ? "" : "s"} attached`}
      </p>
    </div>
  );
}