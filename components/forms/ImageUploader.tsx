"use client";

import { useRef, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, ImageIcon } from "lucide-react";

interface UploadedImage {
  id: string;
  url: string;
  uploading: boolean;
  error?: boolean;
}

export default function ImageUploader({
  name = "image",
  initialUrls = [],
  maxImages = 10,
}: {
  name?: string;
  initialUrls?: string[];
  maxImages?: number;
}) {
  const [images, setImages] = useState<UploadedImage[]>(
    initialUrls.map((url) => ({
      id: crypto.randomUUID(),
      url,
      uploading: false,
    }))
  );
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

  async function uploadFile(file: File) {
    const tempId = crypto.randomUUID();
    setImages((prev) => [...prev, { id: tempId, url: "", uploading: true }]);

    try {
      if (!apiKey) throw new Error("Missing NEXT_PUBLIC_IMGBB_API_KEY");

      const body = new FormData();
      body.append("image", file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body,
      });

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

      toast.success("Image uploaded!");
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Upload failed");
      setImages((prev) =>
        prev.map((img) =>
          img.id === tempId ? { ...img, uploading: false, error: true } : img
        )
      );
    }
  }

  function handleFilesSelected(fileList: FileList | null) {
    if (!fileList) return;
    const files = Array.from(fileList);
    const remaining = maxImages - images.filter((i) => !i.error).length;
    if (files.length > remaining) {
      toast.error(`Max ${maxImages} images allowed`);
    }
    files.slice(0, remaining).forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image`);
        return;
      }
      uploadFile(file);
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      handleFilesSelected(e.dataTransfer.files);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [images.length]
  );

  function removeImage(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  const validUrls = images.filter((img) => !img.uploading && !img.error).map((img) => img.url);
  const isUploading = images.some((img) => img.uploading);

  return (
    <div className="flex flex-col gap-4">
      {/* Hidden form value */}
      <input type="hidden" name={name} value={validUrls.join(",")} />

      {/* Thumbnail grid */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          <AnimatePresence>
            {images.map((img) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="relative w-24 h-24 rounded-xl overflow-hidden border border-border bg-surface2 shrink-0"
              >
                {img.uploading ? (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-1.5">
                    <span className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                    <span className="text-[9px] font-mono text-text3">Uploading</span>
                  </div>
                ) : img.error ? (
                  <div className="w-full h-full flex items-center justify-center bg-surface2 border border-border">
                    <span className="text-[10px] font-mono text-text2">Failed</span>
                  </div>
                ) : (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    <motion.button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[rgb(var(--bg))]/70 text-[rgb(var(--text))] text-xs flex items-center justify-center hover:bg-accent hover:text-[rgb(var(--accent-text))] transition-colors"
                      aria-label="Remove image"
                    >
                      <X size={10} />
                    </motion.button>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-2.5 rounded-xl border-2 border-dashed py-8 px-6 cursor-pointer transition-all duration-200 ${
          dragging
            ? "border-accent bg-accent/10 scale-[1.01]"
            : "border-border/60 hover:border-accent/60 hover:bg-surface2/30"
        }`}
      >
        <div className={`p-2.5 rounded-full border ${dragging ? "border-accent/60 bg-accent/20" : "border-border bg-surface2"} transition-colors`}>
          <Upload size={18} className={dragging ? "text-accent" : "text-text3"} />
        </div>
        <div className="text-center">
          <p className="text-sm text-text2 font-sans">
            {dragging ? "Drop to upload" : "Drop images here or click to browse"}
          </p>
          <p className="text-[11px] font-mono text-text3 mt-0.5">
            Uploads to ImgBB · PNG, JPG, WEBP
          </p>
        </div>
        {isUploading && (
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-accent">
            <span className="w-3 h-3 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            Uploading…
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={(e) => handleFilesSelected(e.target.files)}
        className="hidden"
      />

      <p className="text-[11px] text-text3 font-mono">
        <ImageIcon size={10} className="inline mr-1" />
        {validUrls.length} image{validUrls.length === 1 ? "" : "s"} attached
        {maxImages && ` · max ${maxImages}`}
      </p>
    </div>
  );
}