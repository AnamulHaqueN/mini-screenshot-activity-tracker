import { Screenshot } from "@/types/screenshot"
import Image from "next/image";
import { format } from "date-fns";

function ScreenshotCard(screenshot: Screenshot, openModal: (screenshot: Screenshot) => void) {
  return (
        <div
          key={screenshot.id}
          className="group relative bg-gray-200 rounded-lg overflow-hidden border border-gray-300 hover:border-blue-500 transition cursor-pointer aspect-video"
          onClick={() => openModal(screenshot)}
        >
          <Image
            src={screenshot.filePath}
            alt={`Screenshot at ${format(new Date(screenshot.captureTime), "HH:mm:ss")}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
  
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-center justify-center">
            <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition">
              {format(new Date(screenshot.captureTime), "HH:mm:ss")}
            </p>
          </div>
        </div>
      );
}

export default ScreenshotCard