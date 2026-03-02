"use client"

import {Screenshot} from "@/types/screenshot"
import Image from "next/image"
import {format} from "date-fns"

type TScreenshotCardProps = {
   screenshot: Screenshot
   openModal: (screenshot: Screenshot) => void
}

function ScreenshotCard({screenshot, openModal}: TScreenshotCardProps) {
   const date = screenshot.capturedAt ? new Date(screenshot.capturedAt) : null
   const formattedTime =
      date && !isNaN(date.getTime()) ? format(date, "HH:mm:ss") : "Invalid"
   return (
      <div
         className="group relative bg-gray-200 rounded-lg overflow-hidden border border-gray-300 hover:border-blue-500 transition cursor-pointer aspect-video"
         onClick={() => openModal(screenshot)}>
         <Image
            src={screenshot.fileUrl}
            alt={`Screenshot at ${formattedTime}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            onClick={e => {
               e.stopPropagation()
               window.open(screenshot.fileUrl, "_blank")
            }}
         />
      </div>
   )
}

export default ScreenshotCard
