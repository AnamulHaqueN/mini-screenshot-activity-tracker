"use client"
import { screenshotService } from "@/services/screenshots";
import { useState } from "react";

export const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a screenshot");
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      await screenshotService.upload(file);

      setMessage("Screenshot uploaded successfully!");
      setFile(null);

      const input = document.getElementById("file-input") as HTMLInputElement;
      if (input) input.value = "";
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Upload Screenshot
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Upload your work screenshot (PNG / JPG, max 10MB)
        </p>

        {message && (
          <div
            className={`mb-5 rounded-md px-4 py-3 text-sm font-medium ${
              message.includes("success")
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Area */}
          <label
            htmlFor="file-input"
            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition"
          >
            <svg
              className="w-10 h-10 text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 16v-8m0 0L8 12m4-4l4 4" />
              <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
            </svg>
            <span className="text-sm text-gray-600">
              Click to select screenshot
            </span>
            <span className="text-xs text-gray-400 mt-1">PNG, JPG or JPEG</span>

            <input
              id="file-input"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          {/* Preview */}
          {file && (
            <div className="border rounded-lg p-3 bg-gray-50">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview</p>
              <img
                src={URL.createObjectURL(file)}
                alt="Screenshot preview"
                className="max-h-64 w-full object-contain rounded"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={uploading || !file}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {uploading && (
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {uploading ? "Uploading..." : "Upload Screenshot"}
          </button>
        </form>
      </div>
    </div>
  );
};