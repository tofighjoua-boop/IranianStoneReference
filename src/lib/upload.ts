"use client";

import { upload } from "@vercel/blob/client";

const ALLOWED = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export async function uploadImage(file: File): Promise<string> {
  if (!ALLOWED.includes(file.type)) {
    throw new Error("Only JPG, PNG, WebP files are allowed");
  }

  try {
    // Production: upload directly from browser to Vercel Blob (no 4.5MB limit)
    const blob = await upload(file.name, file, {
      access: "public",
      handleUploadUrl: "/api/admin/upload",
    });
    return blob.url;
  } catch {
    // Local dev fallback: send via FormData to server
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (!res.ok) {
      const text = await res.text();
      try {
        const data = JSON.parse(text) as { error?: string };
        throw new Error(data.error ?? "Upload failed");
      } catch {
        throw new Error("Upload failed");
      }
    }
    const data = await res.json() as { url?: string; error?: string };
    if (!data.url) throw new Error(data.error ?? "Upload failed");
    return data.url;
  }
}
